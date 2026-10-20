"use server";

import { cache } from "react";
import { POPULAR_STOCK_SYMBOLS } from "../constants";
import { auth } from "../better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getWatchlistSymbolsByEmail } from "./watchlist.actions";

const FINNHUB_BASE_URL = process.env.FINNHUB_BASE_URL;
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

function formatPrice(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatChangePercent(value: number): string {
  if (!value) return "";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function formatMarketCapValue(marketCapInMillionsUsd: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(marketCapInMillionsUsd * 1_000_000);
}

async function fetchJSON<T>(
  url: string,
  revalidateSeconds?: number,
): Promise<T> {
  const options: RequestInit & { next?: { revaildate?: number } } =
    revalidateSeconds
      ? { cache: "force-cache", next: { revaildate: revalidateSeconds } }
      : { cache: "no-store" };

  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text().catch(() => "");

    throw new Error(`Fetch failed ${res.status}: ${text}`);
  }

  return (await res.json()) as T;
}

export { fetchJSON };

export const searchStocks = cache(
  async (query?: string): Promise<StockWithWatchlistStatus[]> => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) redirect("/sign-in");

      const userWatchlistSymbols = await getWatchlistSymbolsByEmail(
        session.user.email,
      );

      const token = process.env.FINNHUB_API_KEY ?? FINNHUB_API_KEY;

      if (!token) {
        console.error(
          `Error in stock search: ${new Error("FINNHUB API Key is not configured.")}`,
        );

        return [];
      }

      const trimmed = typeof query === "string" ? query.trim() : "";

      let results: FinnhubSearchResult[] = [];

      if (!trimmed) {
        const top = POPULAR_STOCK_SYMBOLS.slice(0, 10);
        const profiles = await Promise.all(
          top.map(async (sym) => {
            try {
              const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(sym)}&token=${token}`;

              const profile = await fetchJSON<any>(url, 3600);

              return { sym, profile } as { sym: string; profile: any };
            } catch (e) {
              console.error(`Error fetching profile2 for: ${sym} ${e}`);

              return { sym, profile: null } as { sym: string; profile: any };
            }
          }),
        );

        results = profiles
          .map(({ sym, profile }) => {
            const symbol = sym.toUpperCase();
            const name: string | undefined =
              profile?.name || profile?.ticker || undefined;
            const exchange: string | undefined = profile?.exchange || undefined;

            if (!name) return undefined;

            const r: FinnhubSearchResult = {
              symbol,
              description: name,
              displaySymbol: symbol,
              type: "Common Stock",
            };
            (r as any).__exchange = exchange;

            return r;
          })
          .filter((x): x is FinnhubSearchResult => Boolean(x));
      } else {
        const url = `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(trimmed)}&token=${token}`;
        const data = await fetchJSON<FinnhubSearchResponse>(url, 1800);
        results = Array.isArray(data?.result) ? data.result : [];
      }

      const mapped: StockWithWatchlistStatus[] = results
        .map((r) => {
          const upper = (r.symbol || "").toUpperCase();
          const name = r.description || upper;
          const exchangeFromDisplay =
            (r.displaySymbol as string | undefined) || undefined;
          const exchangeFromProfile = (r as any).__exchange as
            | string
            | undefined;
          const exchange = exchangeFromDisplay || exchangeFromProfile || "ID";
          const type = r.type || "Stock";
          const item: StockWithWatchlistStatus = {
            symbol: upper,
            name,
            exchange,
            type,
            isInWatchlist: userWatchlistSymbols.includes(
              r.symbol.toUpperCase(),
            ),
          };
          return item;
        })
        .slice(0, 15);

      return mapped;
    } catch (e) {
      console.error(`Error in stock search: ${e}`);
      return [];
    }
  },
);

export const getStocksDetails = cache(async (symbol: string) => {
  const cleanSymbol = symbol.trim().toUpperCase();

  try {
    const [quote, profile, financials] = await Promise.all([
      fetchJSON(
        `${FINNHUB_BASE_URL}/quote?symbol=${cleanSymbol}&token=${FINNHUB_API_KEY}`,
      ),
      fetchJSON(
        `${FINNHUB_BASE_URL}/stock/profile2?symbol=${cleanSymbol}&token=${FINNHUB_API_KEY}`,
        3600,
      ),
      fetchJSON(
        `${FINNHUB_BASE_URL}/stock/metric?symbol=${cleanSymbol}&metric=all&token=${FINNHUB_API_KEY}`,
        1800,
      ),
    ]);

    const quoteData = quote as QuoteData;
    const profileData = profile as ProfileData;
    const financialData = financials as FinancialsData;

    if (!quoteData?.c || !profileData?.name)
      throw new Error("Invalid stock data received from api");

    const changePercent = quoteData.dp || 0;
    const peRatio = financialData?.metric?.peNormalizedAnnual || null;

    return {
      symbol: cleanSymbol,
      company: profileData?.name,
      currentPrice: quoteData.c,
      changePercent,
      priceFormatted: formatPrice(quoteData.c),
      changeFormatted: formatChangePercent(changePercent),
      peRatio: peRatio?.toFixed(1) || "-",
      marketCapFormatted: formatMarketCapValue(
        profileData?.marketCapitalization || 0,
      ),
    };
  } catch (e) {
    console.error(`Error fetching details for ${cleanSymbol}: ${e}`);
    throw new Error("Failed to fetch stock details");
  }
});

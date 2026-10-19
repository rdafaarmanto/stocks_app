"use server";

import { cache } from "react";
import { POPULAR_STOCK_SYMBOLS } from "../constants";

const FINNHUB_BASE_URL = process.env.FINNHUB_BASE_URL;
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

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
            isInWatchlist: false,
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

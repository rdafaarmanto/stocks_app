"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";
import WatchlistButton from "./WatchlistButton";

const SearchCommand = ({
  renderAs = "button",
  label = "Add stock",
  initialStocks,
}: SearchCommandProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [stocks, setStocks] =
    useState<StockWithWatchlistStatus[]>(initialStocks);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSearch = useCallback(async () => {
    setLoading(true);

    try {
      const results = await searchStocks(
        isSearchMode ? searchTerm.trim() : undefined,
      );

      setStocks(results);
    } catch (error) {
      console.error("Error searching stocks:", error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  }, [isSearchMode, searchTerm]);

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [debouncedSearch, searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  };

  const handleWatchlistChange = async (symbol: string, isAdded: boolean) => {
    setStocks(
      initialStocks?.map((stock) =>
        stock.symbol === symbol ? { ...stock, isInWatchlist: isAdded } : stock,
      ) || [],
    );
  };

  return (
    <>
      {renderAs === "text" ? (
        <span onClick={() => setOpen(true)} className="search-text">
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)} className="search-btn">
          {label}
        </Button>
      )}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="search-dialog rounded-md!"
      >
        <Command className="bg-gray-800">
          <div className="search-field pb-2">
            <CommandInput
              value={searchTerm}
              onValueChange={setSearchTerm}
              placeholder="Search stocks..."
              className=""
            />

            {loading && <Loader2 className="search-loader" />}
          </div>
          <CommandList className="search-list">
            {loading ? (
              <CommandEmpty className="search-list-empty">
                Loading stocks...
              </CommandEmpty>
            ) : displayStocks?.length === 0 ? (
              <div className="search-list-indicator">
                {isSearchMode ? "No results found" : "No stocks available"}
              </div>
            ) : (
              <ul>
                <div className="search-count">
                  {isSearchMode ? "Search results" : "Popular stocks"}
                  {`  `}({displayStocks?.length || 0})
                </div>
                {displayStocks?.map((stock, i) => (
                  <li key={i} className="search-item">
                    <Link
                      href={`/stocks/${stock.symbol}`}
                      onClick={handleSelectStock}
                      className="search-item-link"
                    >
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <div className="search-item-name">{stock.name}</div>
                        <div className="text-sm text-gray-500">
                          {stock.symbol} | {stock.exchange} | {stock.type}
                        </div>
                      </div>
                      <WatchlistButton
                        symbol={stock.symbol}
                        company={stock.name}
                        isInWatchlist={stock.isInWatchlist}
                        onWatchlistChange={handleWatchlistChange}
                        type="icon"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
export default SearchCommand;

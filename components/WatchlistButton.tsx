"use client";

import { useDebounce } from "@/hooks/useDebounce";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/lib/actions/watchlist.actions";
import { Star, Trash2 } from "lucide-react";
import { MouseEvent, useMemo, useState } from "react";
import { toast } from "sonner";

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = "button",
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist);

  const label = useMemo(() => {
    if (type === "icon") return added ? "" : "";
    return added ? "Remove from watchlist" : "Add to watchlist";
  }, [added, type]);

  const toggleWatchlist = async () => {
    const result = added
      ? await removeFromWatchlist(symbol)
      : await addToWatchlist(symbol, company);

    if (result.success) {
      toast.success(added ? "Removed from watchlist" : "Added to watchlist", {
        description: `${company} ${added ? "Removed Item" : "Added to"} your wishlist`,
      });

      onWatchlistChange?.(symbol, !added);
    }
  };

  const debouncedToggle = useDebounce(toggleWatchlist, 300);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setAdded(!added);
    debouncedToggle();
  };

  if (type === "icon") {
    return (
      <button
        title={
          added
            ? `Remove ${symbol} from watchlist`
            : `Add ${symbol} to watchlist`
        }
        aria-label={
          added
            ? `Remove ${symbol} from watchlist`
            : `Add ${symbol} to watchlist`
        }
        className={`watchlist-icon-btn ${added ? "watchlist-icon-added" : ""}`}
        onClick={handleClick}
      >
        <Star fill={added ? "currentColor" : "none"} />
      </button>
    );
  }

  return (
    <button
      className={`watchlist-btn ${added ? "watchlist-remove" : ""}`}
      onClick={handleClick}
    >
      {showTrashIcon && added ? <Trash2 /> : null}
      <span>{label}</span>
    </button>
  );
};
export default WatchlistButton;

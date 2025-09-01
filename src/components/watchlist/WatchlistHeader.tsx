import React from "react";
import { Star } from "lucide-react";
import AddTokenModal from "@/components/modals/AddTokenModal";

import RefreshButton from "./RefreshButton";

const WatchlistHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mx-4 sm:mx-6">
      <div className="flex items-center space-x-2">
        <Star
          className="h-5 w-5 text-plena-lime"
          fill="var(--color-plena-lime)"
        />
        <h2 className="text-lg font-medium text-plena-text">Watchlist</h2>
      </div>

      <div className="flex items-center flex-wrap gap-3 ml-auto">
        <RefreshButton />
        <AddTokenModal />
      </div>
    </div>
  );
};

export default WatchlistHeader;

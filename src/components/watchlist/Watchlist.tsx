import React from "react";

import WatchlistHeader from "./WatchlistHeader";
import WatchlistTableContent from "./WatchlistTableContent";

const Watchlist: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mb-4 sm:mb-6">
      {/* Header Component */}
      <WatchlistHeader />

      {/* Table Content Component */}
      <WatchlistTableContent />
    </div>
  );
};

export default Watchlist;

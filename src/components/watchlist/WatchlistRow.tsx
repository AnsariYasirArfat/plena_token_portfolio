import React, { useState } from "react";
import {
  formatPrice,
  formatHoldings,
  formatTokenName,
} from "@/utils/formatters";
import { formatPercentage } from "@/utils/helpers";
import SparklineChart from "./SparklineChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface WatchlistRowProps {
  token: TokenWithHoldings;
  onUpdateHoldings: (tokenId: string, holdings: number) => void;
  onRemoveToken: (tokenId: string) => void;
}

const WatchlistRow: React.FC<WatchlistRowProps> = ({
  token,
  onUpdateHoldings,
  onRemoveToken,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    token.holdings ? token.holdings.toString() : ""
  );
  const [hasError, setHasError] = useState(false);

  const handleSave = () => {
    const newHoldings = parseFloat(editValue);

    // Allow zero holdings, only validate for negative values
    if (isNaN(newHoldings) || newHoldings < 0) {
      setHasError(true);
      return;
    }

    setHasError(false);
    onUpdateHoldings(token.id, newHoldings);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const isPositive = token.price_change_percentage_24h >= 0;

  return (
    <TableRow className="hover:bg-plena-component/50 transition-colors">
      {/* Token */}
      <TableCell
        className="min-w-56"
        title={formatTokenName(token.name, token.symbol)}
      >
        <div className="w-full flex items-center space-x-3 ">
          <img
            src={token.image}
            alt={token.name}
            className="w-8 h-8 rounded-full"
          />
          <p className="font-medium text-plena-text truncate">
            {token.name}
            <span className="ml-1 text-sm text-plena-muted">
              {`(${token.symbol.toUpperCase()})`}
            </span>
          </p>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell className="min-w-48">
        <div className="text-plena-text font-medium">
          {formatPrice(token.current_price)}
        </div>
      </TableCell>

      {/* 24h Change */}
      <TableCell className="min-w-48">
        <span
          className={`font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {formatPercentage(token.price_change_percentage_24h)}
        </span>
      </TableCell>

      {/* Sparkline */}
      <TableCell className="min-w-48">
        <SparklineChart token={token} />
      </TableCell>

      {/* Holdings */}
      <TableCell className="min-w-48">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              id={"holding-input" + token.id}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
                setHasError(false);
              }}
              onKeyUp={handleKeyPress}
              placeholder="Select"
              className={cn(
                "w-24 h-8 text-sm bg-transparent border text-plena-text rounded",
                hasError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "!border-plena-lime focus:!border-plena-lime focus:!ring-plena-lime/20"
              )}
              step="0.0001"
              min="0"
            />
            <Button
              size="sm"
              variant={"plena"}
              onClick={handleSave}
              className={cn(
                "h-8 px-3",
                hasError && "bg-red-500 hover:bg-red-600 text-white"
              )}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="text-plena-text font-medium">
            {formatHoldings(token.holdings)}
          </div>
        )}
      </TableCell>

      {/* Value */}
      <TableCell className="min-w-48">
        <div className="text-plena-text font-medium">
          {formatPrice(token.value)}
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-plena-text hover:text-plena-text hover:bg-plena-component"
            >
              <MoreHorizontal className="h-4 w-4 text-plena-text" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-plena-component !border-none min-w-[144px]"
          >
            <DropdownMenuItem
              onClick={() => setIsEditing(true)}
              className="text-plena-muted hover:!text-plena-text hover:!bg-white/5"
            >
              <Edit className="h-4 w-4" />
              Edit Holdings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRemoveToken(token.id)}
              className="text-red-300 hover:!text-red-300 hover:!bg-white/8"
            >
              <Trash2 className="h-4 w-4 text-red-400" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default WatchlistRow;

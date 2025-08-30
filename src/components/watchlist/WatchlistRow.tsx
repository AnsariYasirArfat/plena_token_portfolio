import React, { useState } from "react";
import { formatPrice, formatHoldings } from "@/utils/formatters";
import { formatPercentage } from "@/utils/helpers";
import SparklineChart from "./SparklineChart";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

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
  const [editValue, setEditValue] = useState(token.holdings.toString());

  const handleSave = () => {
    const newHoldings = parseFloat(editValue);
    if (!isNaN(newHoldings) && newHoldings >= 0) {
      onUpdateHoldings(token.id, newHoldings);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(token.holdings.toString());
    setIsEditing(false);
  };

  const isPositive = token.price_change_percentage_24h >= 0;

  return (
    <TableRow className="border-b border-border hover:bg-plena-component/50 transition-colors">
      {/* Token */}
      <TableCell className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img
            src={token.image}
            alt={token.name}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23666'/%3E%3C/svg%3E";
            }}
          />
          <div>
            <div className="font-medium text-white">{token.name}</div>
            <div className="text-sm text-muted-foreground">{token.symbol.toUpperCase()}</div>
          </div>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell className="py-4 px-4 text-right">
        <div className="text-white font-medium">{formatPrice(token.current_price)}</div>
      </TableCell>

      {/* 24h Change */}
      <TableCell className="py-4 px-4 text-right">
        <span
          className={`font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {formatPercentage(token.price_change_percentage_24h)}
        </span>
      </TableCell>

      {/* Sparkline */}
      <TableCell className="py-4 px-4">
        <SparklineChart token={token} />
      </TableCell>

      {/* Holdings */}
      <TableCell className="py-4 px-4 text-right">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-20 px-2 py-1 text-sm bg-background border border-border rounded text-white"
              step="0.0001"
              min="0"
            />
            <Button size="sm" onClick={handleSave} className="bg-plena-lime text-plena-base">
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="text-white font-medium">{formatHoldings(token.holdings)}</div>
        )}
      </TableCell>

      {/* Value */}
      <TableCell className="py-4 px-4 text-right">
        <div className="text-white font-medium">{formatPrice(token.value)}</div>
      </TableCell>

      {/* Actions */}
      <TableCell className="py-4 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-plena-component border-border">
            <DropdownMenuItem
              onClick={() => setIsEditing(true)}
              className="text-white hover:bg-plena-base"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Holdings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRemoveToken(token.id)}
              className="text-red-500 hover:bg-plena-base"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default WatchlistRow;
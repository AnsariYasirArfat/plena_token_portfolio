import React from "react";
import { Button } from "@/components/ui/button";
import { TableFooter, TableRow, TableCell } from "@/components/ui/table";

interface PaginationProps {
  pagination: PaginationParams;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { page, perPage, total } = pagination;
  const totalPages = Math.ceil(total / perPage);
  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, total);

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <TableFooter className="bg-transparent !border-white/8">
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={7} className="px-4 py-3 border-t border-white/8">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-plena-muted">
              {startItem} - {endItem} of {total} results
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-plena-muted">
                {page} of {totalPages} pages
              </span>

              <Button
                size="sm"
                variant="ghost"
                onClick={handlePrevious}
                disabled={page <= 1}
                className="text-plena-muted hover:text-plena-muted hover:bg-plena-component"
              >
                Prev
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={page >= totalPages}
                className="text-plena-muted hover:text-plena-muted hover:bg-plena-component"
              >
                Next
              </Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default Pagination;

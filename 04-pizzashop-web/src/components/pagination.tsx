import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} items
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div>
          Page {pageIndex + 1} of {pages}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Button
              disabled={pageIndex === 0}
              onClick={() => onPageChange(0)}
              variant={'outline'}
              className="h-8 w-8 p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">First Page</span>
            </Button>
            <Button
              disabled={pageIndex === 0}
              onClick={() => onPageChange(pageIndex - 1)}
              variant={'outline'}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Page</span>
            </Button>
            <Button
              disabled={pages <= pageIndex + 1}
              onClick={() => onPageChange(pageIndex + 1)}
              variant={'outline'}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Page</span>
            </Button>
            <Button
              disabled={pages <= pageIndex + 1}
              onClick={() => onPageChange(pages - 1)}
              variant={'outline'}
              className="h-8 w-8 p-0"
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last Page</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

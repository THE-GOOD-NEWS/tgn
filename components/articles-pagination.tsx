import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ArticlesPaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string | null;
  locale: string;
  isRTL: boolean;
  prevLabel: string;
  nextLabel: string;
}

export function ArticlesPagination({
  currentPage,
  totalPages,
  category,
  locale,
  isRTL,
  prevLabel,
  nextLabel,
}: ArticlesPaginationProps) {
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    params.set("page", pageNumber.toString());
    return `/articles?${params.toString()}`;
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <Pagination
      className={`my-8 text-black ${isRTL ? "flex-row-reverse" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
      lang={locale}
    >
      <PaginationContent>
        <PaginationItem>
          {isFirstPage ? (
            <span
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 pl-2.5 opacity-50 cursor-not-allowed"
              )}
            >
              <span>{prevLabel}</span>
            </span>
          ) : (
            <Link
              href={createPageURL(currentPage - 1)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 pl-2.5"
              )}
            >
              <span>{prevLabel}</span>
            </Link>
          )}
        </PaginationItem>

        {/* Generate page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first, last, current, and neighbors
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={page}>
                <Link
                  href={createPageURL(page)}
                  className={cn(
                    buttonVariants({
                      variant: page === currentPage ? "outline" : "ghost",
                      size: "icon",
                    })
                  )}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              </PaginationItem>
            );
          }

          // Show ellipsis
          if (
            (page === currentPage - 2 && currentPage > 3) ||
            (page === currentPage + 2 && currentPage < totalPages - 2)
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        <PaginationItem>
          {isLastPage ? (
            <span
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 pr-2.5 opacity-50 cursor-not-allowed"
              )}
            >
              <span>{nextLabel}</span>
            </span>
          ) : (
            <Link
              href={createPageURL(currentPage + 1)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 pr-2.5"
              )}
            >
              <span>{nextLabel}</span>
            </Link>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

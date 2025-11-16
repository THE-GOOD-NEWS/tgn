"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Article } from "@/lib/articles-data";
import { Loader2 } from "lucide-react";

interface ArticlesGridProps {
  articles?: Article[];
}

export function ArticlesGrid({ articles: inputArticles }: ArticlesGridProps) {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Use provided articles or fall back to sample
  const articles = inputArticles || [];

  // Reset pagination when filtered articles change
  useEffect(() => {
    setCurrentPage(1);
  }, [inputArticles]);

  const articlesPerPage = 6;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayedArticles = articles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-12">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
        {displayedArticles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* Load More / Pagination */}
      {currentPage < totalPages && (
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            size="lg"
            className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow hover:shadow-lg text-black font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Articles"
            )}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {/* {articles.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-hot-pink/20 to-bright-yellow/20 rounded-full flex items-center justify-center">
            <span className="text-3xl">📰</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Articles Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )} */}
    </div>
  );
}

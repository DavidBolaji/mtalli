"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}

export const useTable = <T extends { id: string }>({
  initialItems,
  onLoadMore,
  onSearch,
  onFilter,
  onDeleteMany,
}: {
  initialItems: T[];
  onLoadMore?: (page: number) => Promise<{ items: T[]; hasMore: boolean }>;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  onSearch?: (form: FormData, params: URLSearchParams) => void;
  onFilter?: (form: FormData, params: URLSearchParams, path?: string) => void;
  onDeleteMany?: (data: Set<string>) => void;

}) => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<T[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);


  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { ref, inView } = useInView({ threshold: 0.8 });

  const loadMore = useCallback(async () => {
    if (!onLoadMore || !hasMore || loading) return;
    setLoading(true);
    try {
      const { items: newItems, hasMore: moreItems } = await onLoadMore(currentPage);
      console.log(currentPage)
       // Avoid duplicates by filtering out products that are already in the current list
    setItems((prev) => {
      new Set(newItems.map((item) => item.id));
      const filteredNewItems = newItems.filter((item) => !prev.some((p) => p.id === item.id));
      return [...prev, ...filteredNewItems];
    });

    setCurrentPage((prevPage) => prevPage + 1);
    sethasMore(moreItems);
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMore();
    }
  }, [inView, loading, hasMore]);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleSort = (column: keyof T, path?: string) => {
    const direction = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);

    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );

    params.set("sort", column as string);
    params.set("sortOrder", direction);

    if (onFilter) {
      if (path) {
        onFilter(new FormData(), params, path);
      } else {
        onFilter(new FormData(), params);
      }
    }
  };

  const handleSearchDebounced = debounce((value: string) => {
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );
    const formData = new FormData();
    params.set("searchQuery", value);

    if (onSearch) {
      onSearch(formData, params);
    }
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchDebounced(e.target.value);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((item) => item.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const deleteMultiple = () => {
    if (onDeleteMany) {
      onDeleteMany(selectedItems);
    }
  };

  const allChecked = selectedItems.size === items.length;

  return {
    items,
    toggleSelectItem,
    toggleSelectAll,
    handleSearch,
    handleSort,
    isMobile,
    ref,
    showFilters,
    setShowFilters,
    selectedItems,
    sortDirection,
    allChecked,
    sortColumn,
    loading,
    deleteMultiple,
    hasMore
  };
};

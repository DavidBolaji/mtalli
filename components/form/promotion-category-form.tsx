/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react";
import { useCategory } from "@/hooks/use-category";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getCategoryByQuery } from "@/actions/get-categories";
import { Category } from "@prisma/client";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

export const PromotionCategoryForm = () => {
  let { category: initialCategory } = useCategory();
  initialCategory = initialCategory?.filter((cat) => cat.key !== "1");
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState(
    initialCategory?.map((cat) => ({
      key: cat.key,
      value: cat.value,
      label: cat.label,
    }))
  );
  

  const queryClient = useQueryClient();

  // Get the initial selected categories from cache
  const cachedSelectedCategories = queryClient.getQueryData<{key: string; label: string; value: string}[]>([
    "SELECT_CATEGORY",
  ]);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cachedSelectedCategories?.map((cat) => cat.value) || []
  );

  // Debounced category query
  const debouncedQueryCategory = useCallback(
    debounce(async (query: string) => {
      try {
        if (query) {
          const cate = await getCategoryByQuery(query);
          const category = cate?.map((cat) => ({
            key: cat.id,
            value: cat.id,
            label: cat.name,
          }));
          setCat(category);
        }
      } catch (error) {
        console.error((error as Error).message);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (search) {
      debouncedQueryCategory(search);
    } else {
      setCat(
        initialCategory?.map((cat) => ({
          key: cat.key,
          value: cat.value,
          label: cat.label,
        }))
      );
    }

    return () => {
      debouncedQueryCategory.cancel();
    };
  }, [search, debouncedQueryCategory]);

  // Update cache and selected state when a checkbox is toggled
  const handleData = (id: string) => {
    const included = selectedIds.includes(id);
    if (included) {
      queryClient.setQueryData(["SELECT_CATEGORY"], (old: Category & {value: string}[]) =>
        old ? old.filter((prev) => prev.value !== id) : []
      );
    } else {
      const cat = initialCategory?.find((category) => category.value === id);
      if (cat) {
        queryClient.setQueryData(["SELECT_CATEGORY"], (old: Category[]) =>
          old ? [...old, cat] : [cat]
        );
      }
    }
  };

  const handleCheckboxChange = (id: string) => {
    handleData(id);
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((itemId) => itemId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories"
          className="pl-8 rounded-md"
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
          }}
        />
      </div>
      <div className="space-y-2 mt-6 ml-1">
        {cat?.map((cate) => (
          <div key={cate.value} className="flex items-center space-x-2">
            <Checkbox
              id={cate.value}
              onClick={() => handleCheckboxChange(cate.value)}
              checked={selectedIds.includes(cate.value)}
              onChange={() => handleCheckboxChange(cate.value)}
            />
            <label
              htmlFor={cate.value}
              className="text-sm leading-5 font-medium"
            >
              {cate.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useLanguage = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["LANGUAGE"])) {
    queryClient.setQueryData(["LANGUAGE"], 'en');
  }

  const toggleLanguage = (lang: 'en' | 'fr') => {
    queryClient.setQueryData(["LANGUAGE"], () => lang);
  };

  const { data: language } = useQuery({
    queryKey: ["LANGUAGE"],
    queryFn: () => queryClient.getQueryData(["LANGUAGE"]) as 'en' | 'fr',
    staleTime: Infinity,
  });
  return { toggleLanguage, language };
};

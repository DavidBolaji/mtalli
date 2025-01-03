"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IEvent } from "@/components/table/event-table/types";

export const useBookmark = () => {
  const queryClient = useQueryClient();
  
  const addEvent = (event: {id: string}) => {
    queryClient.setQueryData(["BOOKMARK_DATA"], (prev: {id: string}[]) => {
      const exists = prev.length;
      const exists2 = prev?.filter((el) => el.id === event.id);
      const all = exists && exists2.length;

      if (all) {
        return prev?.map((el) => {
          if (el.id === event.id) {
            return {
              ...event
            };
          } else {
            return el;
          }
        });
      }

      if (!exists) {
        const productData = {
          ...event,
        
        };
        return [productData];
      }
      return [
        ...prev,
        { ...event },
      ];
    });
  };


  const deleteEvent = (eventId: string) => {
    queryClient.setQueryData(["BOOKMARK_DATA"], (prev:{id: string}[]) => {
      const newCart = prev.filter((event) => event.id !== eventId);
      return newCart;
    });
  };

  const { data: eventData } = useQuery({
    queryKey: ["BOOKMARK_DATA"],
    queryFn: () =>
      (queryClient.getQueryData(["BOOKMARK_DATA"]) as (IEvent & {
        weight: number;
      })[]) || [],
    staleTime: Infinity,
  });

  const isBookmarked = (id: string): boolean => {
    return eventData?.map(el => el.id).includes(id) || false
  }

  return { addEvent, eventData, deleteEvent, isBookmarked };
};

import { Form } from "formik";
import { useCallback, useEffect } from "react";
import { debounce } from "lodash"; // Import lodash
import { useState } from "react";
import { Search } from "lucide-react";

import { Formik } from "formik";
import { Input } from "../ui/input";

import { Empty } from "antd";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Typography } from "../typography/typography";
import { useQueryClient } from "@tanstack/react-query";
import { IEvent } from "../table/event-table/types";
import { getEventsByQuery } from "@/actions/get-events";
// import { EmptyCart } from "../empty/empty-cart";
export const PromotionItemForm = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setProducts] = useState<IEvent[] | null>(null);
  const queryClient = useQueryClient()
  
  const cachedSelectedCategories = queryClient.getQueryData<{key: string; label: string; value: string}[]>([
    "SELECT_ITEM",
  ]);
  
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cachedSelectedCategories?.map((cat) => cat.value) || []
  );

  // Move debounce outside of the effect or component scope
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedQueryProducts = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        if (query) {
          const events = await getEventsByQuery(query);
          setProducts(events);
        }
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        setLoading(false);
      }
    }, 300),
    [] // Ensure debounce itself doesn't depend on anything
  );

  // Query events when the search state changes
  useEffect(() => {
    if (search) {
      debouncedQueryProducts(search);
    }

    // Cleanup to cancel any pending debounce if the component unmounts
    return () => {
      debouncedQueryProducts.cancel();
    };
  }, [search, debouncedQueryProducts]);

  useEffect(() => {
    const fetch = async  () => {
      const events = await getEventsByQuery("");
      setProducts(events);
    }
    fetch()
  }, []);

 const handleData = (id: string) => {
  const included = selectedIds.includes(id)
  if(included) {
    queryClient.setQueryData(['SELECT_ITEM'], (old:IEvent[]) => {
      return old.filter(prev => prev.id !== id)
    })
  } else {
    const event = events?.find((prod) => prod.id === id);
    queryClient.setQueryData(['SELECT_ITEM'], (old:IEvent[]) => {
      return old ? [...old, event]: [event]
    })
  }
 }

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
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={() => {}}
        validateOnBlur
        validateOnChange
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4 px-10 pt-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-6 w-6 text-muted-foreground" />
              <Input
                placeholder="Search by event name"
                className="pl-10 rounded-2xl h-12 placeholder:pl-4 black-300"
                onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue("search", value);
                  setSearch(value);
                }}
              />
            </div>
          </Form>
        )}
      </Formik>

      <div className="space-y-4 mt-6 ml-1 px-10">
        {events &&
          !loading &&
          events?.map((event) => (
            <div key={event.id} className="flex items-center space-x-2 h-14">
              <Checkbox
                id={event.id}
                onClick={() => handleCheckboxChange(event.id)}
                checked={selectedIds.includes(event.id)}
                onChange={() => handleCheckboxChange(event.id)}
              />
              <label
                htmlFor={event.title}
                className="text-sm leading-5 font-medium"
              >
                <Image
                  src={event.images[0].url}
                  alt={event.title}
                  width={60}
                  height={60}
                  priority
                  className="p-1 mr-2 inline-block"
                />
                <span>
                  <Typography
                    size="s1"
                    as="p"
                    align="left"
                    className="black-300 font-onest font-bold text-[16px] leading-6 inline-block"
                  >
                    {event.title}
                  </Typography>
                </span>
              </label>
            </div>
          ))}
        {!loading && !events?.length && <Empty />}
      </div>
    </>
  );
};

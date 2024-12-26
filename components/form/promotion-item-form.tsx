import { Form } from "formik";
import { getProductsByQuery, IProduct } from "@/actions/get-products";
import { ChangeEvent, useCallback, useEffect } from "react";
import { useCategory } from "@/hooks/use-category";
import { debounce } from "lodash"; // Import lodash
import { useState } from "react";

import { Field } from "formik";
import { Search } from "lucide-react";
import { getProducts } from "@/actions/get-products";
import { Formik } from "formik";
import FormikSelectInput from "../input/formik-select-input";
import { Input } from "../ui/input";

import { Empty } from "antd";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Typography } from "../typography/typography";
import { useQueryClient } from "@tanstack/react-query";
// import { EmptyCart } from "../empty/empty-cart";
export const PromotionItemForm = () => {
  const { category } = useCategory();
  const [selected, setSelected] = useState("1");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const queryClient = useQueryClient()
  
  const cachedSelectedCategories = queryClient.getQueryData<{key: string; label: string; value: string}[]>([
    "SELECT_ITEM",
  ]);
  
  const [selectedIds, setSelectedIds] = useState<string[]>(
    cachedSelectedCategories?.map((cat) => cat.value) || []
  );
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      if (selected) {
        const products = await getProducts(selected);
        setProducts(products);
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [selected]);

  // Move debounce outside of the effect or component scope
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedQueryProducts = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        if (query) {
          const products = await getProductsByQuery(query);
          setProducts(products);
        }
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        setLoading(false);
      }
    }, 300),
    [] // Ensure debounce itself doesn't depend on anything
  );

  // Query products when the search state changes
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
    if (selected) {
      fetchProducts();
    }
  }, [selected, fetchProducts]);

 const handleData = (id: string) => {
  const included = selectedIds.includes(id)
  if(included) {
    queryClient.setQueryData(['SELECT_ITEM'], (old:IProduct[]) => {
      return old.filter(prev => prev.id !== id)
    })
  } else {
    const product = products?.find((prod) => prod.id === id);
    queryClient.setQueryData(['SELECT_ITEM'], (old:IProduct[]) => {
      return old ? [...old, product]: [product]
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
          categoryId: "All categories",
          search: "",
        }}
        onSubmit={() => {}}
        validateOnBlur
        validateOnChange
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4 px-10 pt-6">
            <Field
              as={FormikSelectInput}
              name="categoryId"
              options={category || []}
              placeholder="Select category"
              align={-13}
              defaultValue={values.categoryId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setSelected(e.target.value);
                setFieldValue(
                  "categoryId",
                  category?.find((el) => el.value === e.target.value)?.label
                );
              }}
              // value={values.categoryId}
            />
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-6 w-6 text-muted-foreground" />
              <Input
                placeholder="Search by product name"
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
        {products &&
          !loading &&
          products?.map((product) => (
            <div key={product.id} className="flex items-center space-x-2 h-14">
              <Checkbox
                id={product.id}
                onClick={() => handleCheckboxChange(product.id)}
                checked={selectedIds.includes(product.id)}
                onChange={() => handleCheckboxChange(product.id)}
              />
              <label
                htmlFor={product.name}
                className="text-sm leading-5 font-medium"
              >
                <Image
                  src={product.images[0].url}
                  alt={product.name}
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
                    className="black-300 font-satoshi font-bold text-[16px] leading-6 inline-block"
                  >
                    {product.name}
                  </Typography>
                </span>
              </label>
            </div>
          ))}
        {!loading && !products?.length && <Empty />}
      </div>
    </>
  );
};

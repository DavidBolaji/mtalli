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
import { CartProductDashboardCard } from "../card/cart-product-dashboard-card";
import { Empty } from "antd";
// import { EmptyCart } from "../empty/empty-cart";
export const ProductDashboardForm = () => {
  const { category } = useCategory();
  const [selected, setSelected] = useState("1");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 5000))
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
        if (query.trim().length === 0) {
          // Refetch all products when search input is empty
          await fetchProducts();
        } else {
          const products = await getProductsByQuery(query);
          setProducts(products);
        }
      } catch (error) {
        console.log((error as Error).message);
      } finally {
        setLoading(false);
      }
    }, 300),
    [fetchProducts] // Add fetchProducts as a dependency
  );

  // Query products when the search state changes
  useEffect(() => {
    if (search || search.trim().length === 0) {
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

  return (
    <>
      <Formik
        initialValues={{
          categoryId: "1",
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
              y={10}
              defaultValue={values.categoryId}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setSelected(e.target.value);
                setFieldValue(
                  "categoryId",
                  category?.find((el) => el.value === e.target.value)?.value
                );
              }}
              // value={values.categoryId}
            />
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name"
                className="pl-8 rounded-full"
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
      <div className="px-6 mt-6">
        {products &&
          !loading &&
          products.map((product) => (
            <CartProductDashboardCard
              key={product.id}
              product={product as IProduct & { weight: number }}
            />
          ))}
          {!loading && !products?.length && <Empty />}
          {loading && Array.from({ length: 3 }).map((_, idx) => (
            <CartProductDashboardCard key={idx} loading />
          ))}
      </div>

    </>
  );
};

"use client";

import { Card } from "@/components/ui/card";

import { DashboardTitleHeader } from "@/components/dashboard-header/dashboard-header";

import { Typography } from "@/components/typography/typography";

import { Button } from "@/components/button/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { allProductSchema } from "@/components/form/add-product/product-validation";
import { errorMessage } from "@/utils/helper";
import { useNotification } from "@/hooks/use-notification";
import { useAxios } from "@/hooks/use-axios";
import { EditCustomerForm } from "@/components/form/edit-customer-form";
import { useCartData } from "@/hooks/use-cart-data";

import { EmptyCart } from "@/components/empty/empty-cart";
import { IProduct } from "@/actions/get-products";
import { CartOrderCard } from "@/components/card/cart-order-card";
import { useCartDashboardDrawer } from "@/hooks/use-cart-dashboard-drawer";

export default function AddOrders() {
  const { toggleNotification } = useNotification();
  const { toggleDrawer, cartDrawer } = useCartDashboardDrawer();
  const { cartData } = useCartData();
  const queryClient = useQueryClient();
  const Axios = useAxios();

  // const router = useRouter()
  const { mutate } = useMutation({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async () => {
      const product = queryClient.getQueryData(["CREATE_PRODUCT"]);
      allProductSchema
        .validate(product)
        .then(async () => {
          await Axios.post("/product", product);
          toggleNotification({
            show: true,
            title: "Product Created",
            type: "success",
            message: "Product has been created succesfully",
          });
        })
        .catch((reason) => {
          console.log(reason?.message);
          const errorList = String(reason)?.split(":");
          toggleNotification({
            show: true,
            title: errorList[1],
            type: "error",
            message:
              errorMessage[errorList[1].trim() as keyof typeof errorMessage],
          });
        });
    },
    onSuccess: () => {
      alert("Product ");
    },
  });
  return (
    <div className="container mx-auto mt-6 overflow-hidden">
      {/* Header */}
      <DashboardTitleHeader
        title={"Create New Order"}
        discardKey="CREATE_DASHBOARD_ORDER"
        addItem={mutate}
        btnText="Create Order"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <EditCustomerForm user={null} address={null} />

        {/* Inventory */}
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <Typography size="s1" as="p" align="left" className="mb-4">
              Cart
            </Typography>
            <Button
              size="lg"
              color="light"
              className="border-0 h-9 bg-black-600 text-white"
              onClick={() => toggleDrawer(!cartDrawer)}
            >
              Add item to cart
            </Button>
          </div>
          {cartData && cartData?.length < 1 ? (
            <EmptyCart close={() => toggleDrawer(true)} dashboard />
          ) : (
            cartData?.map((product: IProduct & { weight: number }) => (
              <div key={product.id} className="px-5 space-y-2">
                <CartOrderCard product={product} />
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}

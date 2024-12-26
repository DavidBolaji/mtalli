import { RenderDashboardcards } from "@/app/dashboard/components/render-dashboard-cards";
import db from "@/db/db";
import { renderCustomerCard } from "@/utils/data";
import React from "react";
import { CustomerDetailDisplay } from "./customer-detail-display";
import { CustomerDeliveryDetail } from "./customer-delivery-detail";
import { Typography } from "@/components/typography/typography";

import { CartCheckoutCard } from "@/components/card/cart-checkout-card";
import { IProduct } from "@/actions/get-products";
import { Empty } from "antd";


export const DetailComponent = async ({
  customerId,
}: {
  customerId: string;
}) => {
  const customer = await db.user.findUnique({
    where: {
      id: customerId,
    },
    select: {
      email: true,
      phone: true,
      fname: true,
      lname: true,
      orders: {
        select: {
          id: true,
          price: true,
          products: {
            select: {
              id: true,
              images: true,
              name: true,
              price: true,
              ProductOrder: {
                select: {
                  orderId: true,
                  weight: true,
                },
              },
            },
          },
          address: true,
          createdAt: true,
          paymentType: true,
          status: true,
          orderId: true,
        },
      },
      orderAddress: true,
    },
  });

  const totalOrders = customer?.orders.length ?? 0;
  const totalProcessing = customer?.orders.filter(
    (orders) => orders.status === "PENDING"
  );
  const totalAmount =
    customer?.orders.reduce((acc, cur) => (acc += cur.price), 0) ?? 0;

  const data = renderCustomerCard({
    totalAmount,
    totalProcessing: totalProcessing?.length ?? 0,
    totalOrders,
  });

  const orderAddress = customer?.orderAddress.filter((add) => add.active)[0];

  return (
    <div className="mt-6">
      <RenderDashboardcards data={data} />
      <div className="grid grid-cols-10 gap-x-6">
        <div className="lg:col-span-6 col-span-10">
          <CustomerDetailDisplay
            user={{
              fname: customer?.fname as string,
              lname: customer?.lname as string,
              email: customer?.email as string,
              phone: customer?.phone as string,
            }}
          />
          <CustomerDeliveryDetail
            user={{
              country: orderAddress?.country as string,
              state: orderAddress?.state as string,
              city: orderAddress?.city as string,
              address: orderAddress?.address as string,
              info: orderAddress?.info as string,
            }}
          />
        </div>
        <div className="lg:col-span-4 col-span-10 p-6 mt-6 bg-white rounded-2xl max-h-[552px]">
          <Typography
            as="p"
            size="s1"
            align="left"
            className="mb-[14px] black-100"
          >
            Order History
          </Typography>
          <div className="space-y-3 mb-8">
            {customer?.orders?.map((order) =>
              order.products.map((product) => {
                // Find the corresponding weight from the ProductOrder relation
                const productOrder = product.ProductOrder.find(
                  (po) => order.id === po.orderId
                );
                return (
                  <CartCheckoutCard
                    key={product.id}
                    product={
                      product as unknown as IProduct & { weight: number }
                    }
                    weight={productOrder?.weight ?? 0} // Pass the weight to the component
                    black
                  />
                );
              })
            )}

            {!customer?.orders.length && <Empty />}
          </div>
        </div>
      </div>
    </div>
  );
};

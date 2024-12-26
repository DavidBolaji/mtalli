
import React from "react";

import { Order } from "@/components/table/orders-table/types";
import { CustomerDetailDisplay } from "../../../customers/components/detail-section/customer-detail-display";
import { CustomerDeliveryDetail } from "../../../customers/components/detail-section/customer-delivery-detail";
import { CustomerPaymentDisplay } from "../../../customers/components/detail-section/custom-payment-display";
import { RenderOrderCheckoutSummary } from "./render-order-checkout-summary";


export const OrderComponent = async ({
  order,
}: {
  order: Order | null;
}) => {


  return (
    <div className="">
      <div className="grid grid-cols-10 gap-x-6">
        <div className="lg:col-span-6 col-span-10 p-4">
        <CustomerPaymentDisplay
            order={{
             paymentType: order?.paymentType ?? "",
              phone: order?.User?.phone as string,
            }}
          />
          <CustomerDetailDisplay
            user={{
              fname: order?.User?.fname as string,
              lname: order?.User?.lname as string,
              email: order?.User?.email as string,
              phone: order?.User?.phone as string,
            }}
          />
          <CustomerDeliveryDetail
            user={{
              country: order?.address?.country as string,
              state: order?.address?.state as string,
              city: order?.address?.city as string,
              address: order?.address?.address as string,
              info: order?.address?.info as string,
            }}
          />
        </div>
        <div className="lg:col-span-4 lg:mr-4 col-span-10 mt-6 bg-black-100 lg:mb-10 pb-6 lg:rounded-2xl">
         <RenderOrderCheckoutSummary order={order} />
        </div>
      </div>
    </div>
  );
};

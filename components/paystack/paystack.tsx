import { usePaystack } from "@/hooks/use-paystack";
import { useEffect, useRef } from "react";

import { PaystackConsumer } from "react-paystack";

const PaymentComponent = ({onSuccess}: {onSuccess: () => void}) => {
  const { paystackModal, onClose } = usePaystack();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (paystackModal?.shown && btnRef.current) {
      btnRef.current.click();
    }
  }, [paystackModal?.shown]);

  return (
    <PaystackConsumer
      amount={paystackModal?.amount || 0}
      email={paystackModal?.email || ""}
      publicKey={paystackModal?.publicKey || ""}
      reference={paystackModal?.reference || ""}
      onSuccess={() => {
        console.log("Payment successful");
        onSuccess();
      }}
      onClose={() => {
        console.log("Payment modal closed");
        onClose();
      }}
    >
      {({ initializePayment }) => (
        <button
          className="hidden"
          ref={btnRef}
          onClick={() => initializePayment(onSuccess, onClose)}
        />
      )}
    </PaystackConsumer>
  );
};

export default PaymentComponent;

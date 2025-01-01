import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "./use-notification";

export const paystackKey =
process.env.NEXT_PUBLIC_ENV === "dev"
  ? process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC!
  : process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_PROD!



export interface IPaystack {
  shown: boolean;
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
}

export const usePaystack = () => {
  const queryClient = useQueryClient();
  const {toggleNotification} = useNotification()

  if (!queryClient.getQueryData(["PAYSTACK_MODAL"])) {
    queryClient.setQueryData(["PAYSTACK_MODAL"], {
      shown: false,
      reference: Date.now().toString(),
      email: "",
      amount: 0 * 100,
      publicKey: paystackKey
    });
  }

  const onClose = () => {
    // Reset `shown` state to false when Paystack modal closes
    queryClient.setQueryData(["PAYSTACK_MODAL"], (old: IPaystack) => ({
      ...old,
      shown: false,
    }));

    toggleNotification({
      show: true,
      title: "Payment Failed",
      message: "Something went wrong",
      type: "error"
    })
  };


  const { data: paystackModal } = useQuery({
    queryKey: ["PAYSTACK_MODAL"],
    queryFn: () =>
      queryClient.getQueryData(["PAYSTACK_MODAL"]) as unknown as IPaystack,
    staleTime: Infinity,
  });

  return { paystackModal, onClose };
};

"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import { useAxios } from "./use-axios";
// import { useNotification } from "./use-notification";
// import { useSignIn, useSignUp, useSession } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import { Image, User, Event } from "@prisma/client";
import { useNotification } from "./use-notification";


export type UserType = Omit<
  User,
  "password" | "createdAt" | "updatedAt" | "status"
> & {
  bookings: ({ events: Pick<Event, "title" | "price"> } & {
    images: Image[];
  })[];
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const Axios = useAxios();
  const { toggleNotification } = useNotification();

  const router = usePathname();
  const route = useRouter();

  // Fetch user data
  const {
    data: user,
    error,
    refetch,
  } = useQuery<UserType | null>({
    queryKey: ["USER"],
    queryFn: async () => {
      const response = await Axios.get("/user");
      return response.data?.user ?? null;
    },
    staleTime: 2000,
    retry: false
  });

  // Debounce refetch to avoid excessive calls
  const debouncedRefetch = useMemo(
    () => debounce(() => refetch(), 1000),
    [refetch]
  );

  useEffect(() => {
    if (user && user?.role === "ADMIN" && router === "/dashboard") {
      route.push("/dashboard/home");
    }
  }, [user, router, route]);

  // Logout functionality
  const logout = useCallback(
    async (showNotification = true) => {
      try {
        // if (isSignedIn) await session.end();
        await Axios.post("/user/logout");
        queryClient.setQueryData(["USER"], null);
        debouncedRefetch(); // Use debounced version

        if (showNotification) {
          toggleNotification({
            show: true,
            type: "success",
            title: "Logout Success",
            message: "Logout process is successful",
          });
        }
      } catch (error) {
        console.error("Logout Error:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient, debouncedRefetch, toggleNotification]
  );


  const deleteUser = useCallback(
    async (showNotification = true) => {
      try {
        // if (isSignedIn) await session.end();
        await Axios.delete("/user");
        await Axios.post("/user/logout");
        queryClient.setQueryData(["USER"], null);
        debouncedRefetch(); // Use debounced version

        if (showNotification) {
          toggleNotification({
            show: true,
            type: "success",
            title: "Account Deletion Success",
            message: "Your account has been deleted successfully",
          });
        }
      } catch (error) {
        console.error("Logout Error:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryClient, debouncedRefetch, toggleNotification]
  );

  // Handle login with email/password
  const login = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: async ({ data, redirect }: { data: {email: string, password: string}; redirect?: boolean }) => {
      const response = await Axios.post("/user/login", {email: data.email, password: data.password});
      return response.data.user;
    },
    onSuccess: (_, variables) => {
      debouncedRefetch(); // Use debounced version
      const goTo = variables?.redirect ? variables?.redirect : false;
      debouncedRefetch()
      if (goTo) {
        route.push('/')
      }
      toggleNotification({
        show: true,
        type: "success",
        title: "Login Successful",
        message: "User has successfully logged in",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Login Error",
        message: error.response?.data?.message || "Something went wrong",
      });
    },
    onSettled: () => { },
  });


  // Handle login with email/password
  const adminLogin = useMutation({
    mutationKey: ["ADMIN_LOGIN"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await Axios.post("/user/login/admin", data);
      return response.data.user;
    },
    onSuccess: async () => {

      toggleNotification({
        show: true,
        type: "success",
        title: "Login Successful",
        message: "User has successfully logged in",
      });
      // await new Promise(resolve => setTimeout(resolve, 1000))
      await debouncedRefetch(); // Use debounced version

    },
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Login Error",
        message: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  // Handle registration
  const register = useMutation({
    mutationKey: ["REGISTER"],
    mutationFn: async ({ data, redirect }: { data: unknown; redirect?: boolean }) => {
      const response = await Axios.post("/user", data);
      return response.data.user;
    },
    onSuccess: (_, variables) => {
      const goTo = variables?.redirect ? variables?.redirect : false;
      debouncedRefetch()
      if (goTo) {
        route.push('/')
      }
      toggleNotification({
        show: true,
        type: "success",
        title: "Registration Succesfull",
        message: "User registered successfully",
      });
    }, // Use debounced version
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Registration Error",
        message: error?.response?.data?.message || "Something went wrong",
      });
    },
    onSettled: () => { },
  });


  // Handle update
  const update = useMutation({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (data: Partial<UserType>) => {
      const response = await Axios.patch("/user", data);
      return response.data;
    },
    onSuccess: () => {
      debouncedRefetch(); // Use debounced version
      toggleNotification({
        show: true,
        type: "success",
        title: "Update Successful",
        message: "User has been successfully updated",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toggleNotification({
        show: true,
        type: "error",
        title: "Update Error",
        message: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  const loading =
    login.isPending ||
    register.isPending ||
    update.isPending ||
    adminLogin.isPending;


  // Refetch user data on route change with debounce
  useEffect(() => {
    debouncedRefetch();
    return () => {
      debouncedRefetch.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Auto logout on 401 error
  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      // logout(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const isLoggedIn = useCallback(
    () => queryClient.getQueryData(["USER"]) !== null,
    [queryClient]
  );

  return {
    user,
    logout,
    login: login.mutate,
    register: register.mutate,
    adminLogin: adminLogin.mutate,
    update: update.mutate,
    isLoggedIn,
    deleteUser: deleteUser,
    loading
  };
};

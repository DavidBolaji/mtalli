"use client";

import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";


export const IsAuthAdmin: React.FC<{ admin?: boolean }> = ({ admin = false }) => {
  const { user, loading } = useUser();

  if (admin) {
    if(!loading){
      if(!user?.id) return redirect("/");
      if (user?.role === "USER") return redirect("/dashboard");
    } 
  }
  
  if(loading) return null;
  return null;
};

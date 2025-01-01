import { DashboardAuthForm } from "@/components/form/dashboard-auth-form";


export default async function DashboardAuthPage({}) {
  return <div className="bg-black-200 flex items-center justify-center w-full md:px-0 px-6  h-screen">
    <DashboardAuthForm />
  </div>;
}

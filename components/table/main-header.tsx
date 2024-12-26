"use client";

import { Button } from "@/components/button/button";
import { Badge } from "@/components/ui/badge";
import { Button as ShadButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Filter, Plus, Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useRef } from "react";

import { useOverlay } from "@/hooks/use-overlay";
import { useRouter, useSearchParams } from "next/navigation";
import { Grid } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FilterDialog from "./filter-dialog";

const { useBreakpoint } = Grid;

interface MainHeaderProps {
  search?: boolean;
  filter?: boolean;
  more?: boolean;
  payment?: boolean;
  status?: boolean;
  pType?: boolean;
  pStatus?: boolean;
  post?: boolean;
  showFilters?: boolean;
  calender?: boolean;

  url?: string;
  name?: string;
  title: string;
  placeholder?: string
  calenderTxt?: string

  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: (form: FormData, params: URLSearchParams, path?: string) => void;
  action?: () => void;

  setShowFilters?: Dispatch<SetStateAction<boolean>>;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  search = false,
  filter = false,
  more = false,
  payment = false,
  status = false,
  pType = false,
  pStatus = false,
  post = false,
  calender = false,

  url,
  name,
  title,
  placeholder,
  calenderTxt,

  handleSearch,
  onFilter,
  action
}) => {
  const divRef = useRef<null | HTMLButtonElement>(null);
  const { toggleOverlay } = useOverlay();
  const router = useRouter();
  const searchParams = useSearchParams();
  const screen = useBreakpoint();
  const queryClient = useQueryClient();

  const { data: showFilters } = useQuery({
    queryKey: ['FILTER_OPEN'],
    queryFn: () => queryClient.getQueryData(['FILTER_OPEN']) ?? false as boolean
  })

  const openFilter = () => {
    toggleOverlay(true);
    queryClient.setQueryData(['FILTER_OPEN'], true)
    // setShowFilters!(true);
  };

  const closeFilter = () => {
    toggleOverlay(false);
    queryClient.setQueryData(['FILTER_OPEN'], false)
    // setShowFilters!(false);
  };

  const handleDelete = () => {
    if (action) {
      queryClient.setQueryData(["OVERLAY"], () => true);
      action()
    }
  }

  return (
    <div className="lg:pb-6 pt-2 bg-white border-b rounded-t-2xl">
      <div className="flex lg:flex-row flex-col  items-center lg:justify-between pt-5 mb-6">
        <h1
          className={`text-2xl  px-6 font-semibold  lg:w-auto w-full lg:mb-0 mb-4 text-nowrap ${screen.lg ? "" : "border-b pb-4"
            }`}
        >
          {title}
        </h1>
        <div className="flex  px-6  lg:w-auto w-full items-center justify-start lg:justify-between gap-4">
          {search && (
            <div className="relative lg:min-w-[354px] md:block hidden">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={placeholder ?? "Search for product"}
                className="pl-8 rounded-full"
                onChange={handleSearch}
              />
            </div>
          )}
          {filter && (
            <div className="relative">
              <ShadButton
                variant="outline"
                onClick={openFilter}
                className="gap-2 border-0 bg-black-400 rounded-full relative z-20"
              >
                <Filter className="h-4 w-2" />
                {screen.lg ? "Filter" : null}
                <Badge
                  variant="secondary"
                  className="ml-1 text-white bg-black-100 hover:bg-lemon rounded-full"
                >
                  {(searchParams.getAll("category")?.length || 0) +
                    (searchParams.getAll("status")?.length || 0) +
                    (searchParams.getAll("pStat")?.length || 0) +
                    (searchParams.getAll("promoT")?.length || 0) +
                    (searchParams.getAll("payment")?.length || 0)}
                </Badge>
              </ShadButton>
              <div
                className={`absolute top-0 ${screen.lg ? "-right-1/4 -translate-x-8" : ""
                  } z-10`}
              >
                <FilterDialog
                  open={showFilters as boolean}
                  onClose={closeFilter}
                  calender={calender}
                  onFilter={onFilter}
                  payment={payment}
                  status={status}
                  pStatus={pStatus}
                  pType={pType}
                  post={post}
                  calenderTxt={calenderTxt}
                />
              </div>
            </div>
          )}
          {more && (
            <Select >
              <SelectTrigger ref={divRef} className="w-32 rounded-full">
                More Action
                {/* <SelectValue placeholder="More Actions" /> */}
                {/* <SelectValue placeholder="More Actions" defaultValue={"More Actions"} /> */}
              </SelectTrigger>
              <SelectContent>
                <span className="p-2 hover:bg-green-500/10 cursor-pointer text-sm font-satoshi inline-block" onClick={handleDelete}>Delete Selected</span>
              </SelectContent>
            </Select>
          )}

          {name && (
            <Button
              className="h-9 flex items-center justify-center"
              size="lg"
              color="dark"
              type="button"
            >
              <div
                onClick={() => router.push(url ?? "#")}
                className="text-white hover:text-white flex gap-2 items-center text-sm"
              >
                {screen.lg ? name : null}
                <span className="border border-white rounded-full h-5 w-5 flex items-center justify-center">
                  <Plus className="h-4 w-4" color="white" />
                </span>
              </div>
            </Button>
          )}
        </div>
        {search && (
          <div className="relative px-6 lg:min-w-[154px] md:hidden block mt-5 w-full">
            <Search className="absolute left-9 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              // placeholder={placeholder ?? "Search for product"}
              className="pl-8 rounded-full"
              onChange={handleSearch}
            />
          </div>
        )}
      </div>
    </div >
  );
};

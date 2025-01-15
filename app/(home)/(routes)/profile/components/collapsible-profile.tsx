'use client'

import * as React from "react"
import { ChevronDown } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { redirectProfile } from "@/actions/get-events"
import { FormattedMessage } from "react-intl"

interface NavItem {
  id: string
  label: string
  section: "personal" | "account"
  danger?: boolean
}

const navItems: NavItem[] = [
  {
    id: "details",
    label: "Personal Details",
    section: "personal",
  },
  {
    id: "history",
    label: "Booking History",
    section: "personal",
  },
  {
    id: "delete",
    label: "Delete your account",
    section: "account",
    danger: true,
  },
]

export function CollapsibleProfileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const searchParams = useSearchParams();
  const active = searchParams.get("active") || "details";

  React.useEffect(() => {
    setIsOpen(false)
  }, [active])


  return (
    <div className="w-full  md:hidden block">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between bg-black-400 px-6 py-4">
          <span className="text-base font-medium"><FormattedMessage id={navItems.find(el => el.id === active)?.label} /></span>
          <ChevronDown
            className={cn("h-5 w-5 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className=" w-full rounded-b-3xl bg-white shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground uppercase">
                <FormattedMessage id="Personal Details" />
              </h3>
              <nav className="space-y-1">
                {navItems
                  .filter((item) => item.section === "personal")
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete("active");
                        redirectProfile(item?.id as string)
                      }}
                      className={cn(
                        "w-full rounded-sm px-2 py-1.5 text-left text-base transition-colors hover:bg-accent",
                        active === item.id && "bg-accent"
                      )}
                    >
                      <FormattedMessage id={item.label} />
                    </button>
                  ))}
              </nav>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground uppercase">
                <FormattedMessage id={"Account management"} />
              </h3>
              <nav className="space-y-1">
                {navItems
                  .filter((item) => item.section === "account")
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete("active");
                        redirectProfile(item?.id as string)
                      }}
                      className={cn(
                        "w-full rounded-sm px-2 py-1.5 text-left text-base transition-colors hover:bg-accent",
                        active === item.id && "bg-accent",
                        item.danger && "text-red-500 hover:text-red-600"
                      )}
                    >
                       <FormattedMessage id={item.label} />
                    </button>
                  ))}
              </nav>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}


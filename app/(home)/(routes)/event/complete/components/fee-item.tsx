import { InfoIcon as InfoCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatToNaira } from '@/utils/helper'

interface FeeItemProps {
  label: string
  amount: number
  tooltip?: string
  className?: string
}

export function FeeItem({ label, amount, tooltip, className }: FeeItemProps) {


  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className={`flex items-center black-100 gap-2 font-onest ${label === "Total" ? "font-bold text-2xl": "underline font-medium text-base"}`}>
        {label}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-4 h-4 p-0">
                  <InfoCircle className="w-4 h-4"  />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='black-200'>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <span className={`font-bold black-100 font-onest pr-6 ${label === "Total" ? "text-2xl font-bold": "text-base font-medium"}`}>{formatToNaira(amount)}</span>
    </div>
  )
}


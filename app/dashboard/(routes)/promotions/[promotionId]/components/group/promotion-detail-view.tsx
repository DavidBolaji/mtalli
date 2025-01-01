import { Typography } from "@/components/typography/typography"
import { format } from "date-fns"
import React from "react"
import { IPromotion } from "../types"

const PromotionDetailView: React.FC<{ promotion: IPromotion }> = ({ promotion }) => {
    return <div className="bg-white px-4 py-6 rounded-2xl border-[#DDEEE5]">
        <Typography as="p" size="s1" align="left" className="mb-[14px] black-100 font-onest text-2xl">
            Promotion Details
        </Typography>

        <div className="grid lg:grid-cols-12 mb-2 grid-cols-6 lg:space-y-0 space-y-4">
            <div className="col-span-6">
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-300 text-sm font-bold"
                >
                    Promotion name
                </Typography>
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-100 capitalize font-onest text-sm font-medium"
                >
                    {promotion?.name ?? "-"}
                </Typography>
            </div>
            <div className="col-span-6 ">
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-300 text-sm font-bold"
                >
                    Promotion code
                </Typography>
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-100 capitalize font-onest text-sm font-medium"
                >
                    {promotion?.code ?? "-"}
                </Typography>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 grid-cols-6 lg:space-y-0 mb-2 space-y-4">
            <div className="col-span-6">
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-300 text-sm font-bold"
                >
                    Start date
                </Typography>
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-100 capitalize font-onest text-sm font-medium"
                >
                    {format(promotion?.startDate ?? "", "dd MMM yyyy") ?? "-"}
                </Typography>
            </div>
            <div className="col-span-6 lg:mb-5">
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-300 text-sm font-bold"
                >
                    End date
                </Typography>
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                   className="black-100 capitalize font-onest text-sm font-medium"
                >
                    {format(promotion?.endDate ?? "", "dd MMM yyyy") ?? "-"}
                </Typography>
            </div>
        </div>
        <div className="grid grid-cols-12">
            <div className="col-span-6">
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-300 text-sm font-bold"
                >
                    Start time
                </Typography>
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-100 capitalize font-onest text-sm font-medium"
                >
                    {format(promotion?.startDate ?? "", "hh:mma") ?? "-"}
                </Typography>
            </div>
            <div className="col-span-6">
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                    className="black-300 text-sm font-bold"
                >
                    End time
                </Typography>
                <Typography
                    as="p"
                    size="s2"
                    align="left"
                   className="black-100 capitalize font-onest text-sm font-medium"
                >
                    {format(promotion?.endDate ?? "", "hh:mma") ?? "-"}
                </Typography>
            </div>
           
        </div>
        <div className="grid grid-cols-12 mt-2 space-y-4">
                <div className="col-span-6">
                    <Typography
                        as="p"
                        size="s2"
                        align="left"
                        className="black-300 text-sm font-bold text-nowrap"
                    >
                        Percentage discount
                    </Typography>
                    <Typography
                        as="p"
                        size="s2"
                        align="left"
                        className="black-100 capitalize font-onest text-sm font-medium"
                    >
                        {String(promotion?.discount) + `%`}
                    </Typography>
                </div>
            </div>
    </div>
}

export default PromotionDetailView
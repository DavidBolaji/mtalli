import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "antd"

export function SkeletonCard() {
  return (
    <Card  className={"w-full overflow-hidden h-[376px] border-0 shadow-none"}>
      <CardHeader className="p-0 relative h-[226px] w-full mb-2">
        <Skeleton.Image active style={{width: "100%", height: "226px", borderRadius: "20px"}}  />
      </CardHeader>
      <CardContent className="p-0">
        <Skeleton style={{width: "400px"}} paragraph={{ rows: 0 }}   />
        <Skeleton style={{width: "200px"}} className="-mt-3" paragraph={{ rows: 0 }}   />
        <Skeleton style={{width: "400px"}} className="-mt-3" paragraph={{ rows: 0 }}   />
        <Skeleton style={{width: "500px"}} className="-mt-2" paragraph={{ rows: 0 }}   />
      </CardContent>
    </Card>
  )
}


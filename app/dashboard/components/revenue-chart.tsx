"use client";

import { useState, useRef, useEffect } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChevronDown } from "lucide-react";
import { formatToNaira } from "@/utils/helper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomizedDot = (props: any) => {
  const { cx, cy, chartHeight } = props;

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={chartHeight}
        stroke="#E5E7EB"
        strokeDasharray="3 3"
      />
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#011D2E"
        stroke="#011D2E"
        strokeWidth={2}
      />
    </g>
  );
};

export default function RevenueChart({monthlyRevenue}:{monthlyRevenue: {month: string, revenue: number}[]}) {
  const [filter, setFilter] = useState("This Year");
  const chartRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    if (chartRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const height = chartRef.current.offsetHeight;
      setChartHeight(height);
    }
  }, []);

  return (
    <div className="col-span-12">
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold leading-6">
            Monthly revenue
          </CardTitle>
          <Button
            variant="outline"
            className="bg-black-400 rounded-full black-100"
          >
            {filter}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[400px]" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyRevenue}
              margin={{ top: 15, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis width={0} axisLine={false} tickLine={false} tick={false} />
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (
                    active &&
                    payload &&
                    payload.length > 0 &&
                    payload[0].value !== undefined
                  ) {
                    return (
                      <div className="rounded-full bg-black-100 py-1 px-4 font-semibold shadow-sm">
                        <span className="text-white">
                          {formatToNaira(+payload[0].value)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={1.5}
                stroke="#000000"
                dot={<CustomizedDot chartHeight={chartHeight} />}
                activeDot={{
                  r: 5,
                  fill: "#011D2E",
                  stroke: "#011D2E",
                  strokeWidth: 2,
                }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

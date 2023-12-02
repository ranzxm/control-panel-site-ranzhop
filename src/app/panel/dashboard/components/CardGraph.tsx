"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CardGraph = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const data = [
    {
      name: "Jan",
      Income: 500000,
    },
    {
      name: "Feb",
      Income: 350000,
    },
    {
      name: "Mar",
      Income: 430000,
    },
    {
      name: "Apr",
      Income: 330000,
    },
    {
      name: "May",
      Income: 760000,
    },
    {
      name: "Jun",
      Income: 270000,
    },
    {
      name: "Jul",
      Income: 680000,
    },
    {
      name: "Aug",
      Income: 430000,
    },
    {
      name: "Sep",
      Income: 850000,
    },
    {
      name: "Oct",
      Income: 340000,
    },
    {
      name: "Nov",
      Income: 440000,
    },
    {
      name: "Dec",
      Income: 870000,
    },
  ];

  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 1,
    }).format(number);
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={150} height={40} data={data}>
            <Tooltip
              separator="=>"
              offset={4}
              labelStyle={{ color: "black" }}
              cursor={{ fill: "#A1A1AA" }}
            />
            <YAxis width={105} tickFormatter={(value) => `${rupiah(value)}`} />
            <XAxis dataKey="name" />
            <Bar dataKey="Income" fill="#8884d8" activeBar={{ fill: "rgb(9 9 11 / 1)" }} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CardGraph;

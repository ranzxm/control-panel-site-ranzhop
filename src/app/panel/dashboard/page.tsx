import CardBasic from "./components/Card";
import CardGraph from "./components/CardGraph";
import CardRecentTransaction from "./components/CardRecentTransaction";
import Content from "@/components/organisms/content/Content";
import Layout from "@/components/shell/Layout";
import React from "react";
import { Metadata } from "next";
import { DatePickerWithRange } from "@/components/datepicker-range";
import { FiDollarSign } from "react-icons/fi";
import { LoopIcon } from "@radix-ui/react-icons";
import TitlePage from "@/components/atoms/TitlePage";
import { Separator } from "@radix-ui/react-dropdown-menu";
import SeparatorHorizontal from "@/components/atoms/SeparatorHorizontal";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  const cardBasicItems = [
    {
      cardTitle: "Total Revenue",
      cardContent: "Rp. 87.450.000",
      cardContent2: "+14.4% daripada 1 bulan terakhir",
      icon: <FiDollarSign />,
    },
    {
      cardTitle: "Total Transaction",
      cardContent: "+103",
      cardContent2: "+67% daripada 1 bulan terakhir",
      icon: <LoopIcon />,
    },
  ];

  return (
    <div className="container mx-auto">
      <Layout>
        <Content>
          <div className="flex justify-between">
            <TitlePage text="Dashboard" />
            <div className="datePicker">
              <DatePickerWithRange />
            </div>
          </div>
          <SeparatorHorizontal className="mt-3" />
          <CardBasic items={cardBasicItems} className="cardListTop grid grid-cols-4 mt-4 gap-3" />
          <div className="flex space-x-3">
            <CardGraph className="mt-3 w-[60%]" />
            <CardRecentTransaction className="mt-3 w-[40%]" />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default DashboardPage;

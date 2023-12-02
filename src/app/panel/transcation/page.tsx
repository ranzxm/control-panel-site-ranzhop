import Content from "@/components/organisms/content/Content";
import Layout from "@/components/shell/Layout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Transactions",
};

const TransactionPage = () => {
  return (
    <div className="container mx-auto">
      <Layout>
        <Content>
          <div className="w-full h-full">Transaction</div>
        </Content>
      </Layout>
    </div>
  );
};

export default TransactionPage;

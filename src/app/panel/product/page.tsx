import TitlePage from "@/components/atoms/TitlePage";
import Content from "@/components/organisms/content/Content";
import Layout from "@/components/shell/Layout";
import { Metadata } from "next";
import DataTable from "./data-table";
import { columns } from "./columns";
import getProductData from "./data/Products";

export const metadata: Metadata = {
  title: "Product Managements",
};

const ProductPage = async () => {
  const data = await getProductData();
  return (
    <div className="container mx-auto">
      <Layout>
        <Content>
          <TitlePage text="Product Managements" useSeperator />
          <div className="mt-4">
            <DataTable columns={columns} data={data} />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ProductPage;

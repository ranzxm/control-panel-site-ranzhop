import TitlePage from "@/components/atoms/TitlePage";
import Content from "@/components/organisms/content/Content";
import Layout from "@/components/shell/Layout";
import { Metadata } from "next";
import { columns as columnsProduct } from "./components/products/columns";
import { columns as columnsType } from "./components/typesproduct/columns";
import getProductData from "./data/Products";
import { TabsAction } from "./components/tabs-action";
import { getTypesProductData } from "./data/Types";

export const metadata: Metadata = {
  title: "Product Managements",
};

const ProductPage = async () => {
  const dataProduct = await getProductData();
  const dataTypes = await getTypesProductData();

  return (
    <div className="container mx-auto">
      <Layout>
        <Content>
          <TitlePage text="Product Managements" useSeperator />
          <div className="mt-4">
            <TabsAction
              columnsProduct={columnsProduct}
              dataProduct={dataProduct}
              columnsType={columnsType}
              dataType={dataTypes}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ProductPage;

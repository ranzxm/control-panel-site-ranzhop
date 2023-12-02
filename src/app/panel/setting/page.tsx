import Content from "@/components/organisms/content/Content";
import Layout from "@/components/shell/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingPage = () => {
  return (
    <div className="container mx-auto">
      <Layout>
        <Content>
          <div className="w-full h-full">User</div>
        </Content>
      </Layout>
    </div>
  );
};

export default SettingPage;

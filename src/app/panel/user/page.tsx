import Content from "@/components/organisms/content/Content";
import Layout from "@/components/shell/Layout";
import { columns, users } from "./column";
import { DataTable } from "./data-table";
import TitlePage from "@/components/atoms/TitlePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Managements",
};

const UserPage = () => {
  return (
    <div className="container mx-auto">
      <Layout>
        <Content>
          <TitlePage text="User Managements" useSeperator />
          <div className="mt-4">
            <DataTable columns={columns} data={users} />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default UserPage;

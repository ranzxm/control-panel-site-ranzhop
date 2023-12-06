import Content from "@/components/organisms/content/Content";
import Layout from "@/components/shell/Layout";
import { User, columns } from "./column";
import { DataTable } from "./data-table";
import TitlePage from "@/components/atoms/TitlePage";
import { Metadata } from "next";
import axios from "axios";

export const metadata: Metadata = {
  title: "User Managements",
};
async function getDataUser(): Promise<User[]> {
  const res = await axios.get("http://localhost:3000/api/user");
  return res.data.users;
}

const UserPage = async () => {
  const data = await getDataUser();
  return (
    <div className="container mx-auto">
      <Layout>
        <Content>
          <TitlePage text="User Managements" useSeperator />
          <div className="mt-4">
            <DataTable columns={columns} data={data} />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default UserPage;

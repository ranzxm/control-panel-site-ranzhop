"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableProduct from "./products/table-product";
import { TableTypes } from "./typesproduct/table-type";

interface TabsActionProps {
  columnsProduct: any;
  columnsType: any;
  dataProduct: any;
  dataType: any;
}

export function TabsAction({
  columnsProduct,
  columnsType,
  dataProduct,
  dataType,
}: TabsActionProps) {
  return (
    <Tabs defaultValue="products">
      <TabsList>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="types">Types</TabsTrigger>
        <TabsTrigger value="providers">Providers</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <TableProduct columns={columnsProduct} data={dataProduct} />
      </TabsContent>
      <TabsContent value="types">
        <TableTypes columns={columnsType} data={dataType} />
      </TabsContent>
      <TabsContent value="providers"></TabsContent>
    </Tabs>
  );
}

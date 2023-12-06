import axios from "axios";
import { TypesProduct } from "../components/typesproduct/columns";

export async function getTypesProductData(): Promise<TypesProduct[]> {
  const res = await axios.get("http://localhost:3000/api/product/type");
  return res.data.data;
}

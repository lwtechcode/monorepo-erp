import { FilterProduct } from "./types";

// Estado inicial
export const initialFilterState: FilterProduct = {
  textFilterByNameAndBarCode: "",
  status: "",
  ordered: "",
  categoryId: "",
  discount: false,
};

import * as Yup from "yup";

export const supplierSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
});

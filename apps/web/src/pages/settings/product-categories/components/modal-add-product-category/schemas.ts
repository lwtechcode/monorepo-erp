import * as Yup from "yup";

export const clientSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
});

import * as Yup from "yup";

export const unitOfMeasurementSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  abbreviation: Yup.string().required("Campo obrigatório"),
});

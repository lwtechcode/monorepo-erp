import * as Yup from "yup";

export const productsSchema = Yup.object().shape({
  // id: Yup.string().required(MESSAGE_REQUIRED),
  // gender: Yup.string().min(1).max(1).optional().nullable(),
  // birthDate: Yup.date().optional().nullable(),
  // cpf: Yup.string().min(14).max(14).optional().nullable(),
  // rg: Yup.string().max(15).optional().nullable(),
  // email: Yup.string().email().optional().nullable(),
  // phone: Yup.string().min(11).max(11).optional().nullable(),
  // cep: Yup.string()
  //   .matches(/^\d{8}$/)
  //   .optional()
  //   .nullable(),
  // address: Yup.string().optional().nullable(),
  // number: Yup.string().max(5).optional().nullable(),
  // neighborhood: Yup.string().max(100).optional().nullable(),
  // city: Yup.string().max(100).optional().nullable(),
  // state: Yup.string().max(2).optional().nullable(),
  // complement: Yup.string().max(255).optional().nullable(),
  // observation: Yup.string().optional().nullable(),
  // active: Yup.boolean().optional().nullable(),
});

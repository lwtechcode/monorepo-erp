import { addMinutes, getDate, getMonth, getYear } from "date-fns";

export function removeNonNumerics(str: string) {
  if (!str) return "";

  return str.replace(/\D/g, "");
}

export function formatDate(data: Date) {
  if (isNaN(data.getTime())) {
    return "--";
  }

  // Ajustar para o fuso horário local
  const localDate = addMinutes(data, data.getTimezoneOffset());

  const dia = getDate(localDate).toString().padStart(2, "0");
  const mes = (getMonth(localDate) + 1).toString().padStart(2, "0");
  const ano = getYear(localDate);

  return `${dia}/${mes}/${ano}`;
}

export function formatPhone(telefone: string): string {
  const numeros = telefone.replace(/\D/g, "");

  if (numeros.length === 11) {
    return `(${numeros.substring(0, 2)}) ${numeros.substring(
      2,
      7
    )}-${numeros.substring(7)}`;
  }

  return telefone;
}

export function formatCPF(cpf: string) {
  const numeros = cpf.replace(/\D/g, "");

  if (numeros.length === 11) {
    return `${numeros.substring(0, 3)}.${numeros.substring(
      3,
      6
    )}.${numeros.substring(6, 9)}-${numeros.substring(9)}`;
  }

  return cpf;
}

export function formatMoney(valor: number) {
  if (!valor) return "R$ 0,00";

  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

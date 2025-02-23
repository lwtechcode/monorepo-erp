export function unformatCurrency(value: string) {
  // Remove "R$", espaços e substitui vírgula por ponto
  const cleanedValue = value.replace(/[R$\s]/g, '').replace(',', '.');
  // Converte a string para número
  const numberValue = parseFloat(cleanedValue);
  // Verifica se a conversão foi bem-sucedida
  if (isNaN(numberValue)) {
    return;
    // throw new Error("Valor inválido");
  }
  // Retorna o número formatado com duas casas decimais
  return numberValue.toFixed(2);
}

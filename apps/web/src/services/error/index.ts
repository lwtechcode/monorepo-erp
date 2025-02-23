export type ErrorResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

export async function exctractErrorMessage(error: ErrorResponse) {
  // Verifica se a resposta do erro é um blob
  if (error?.response?.data instanceof Blob) {
    const errorText = await error.response.data.text(); // Converte o blob para texto
    const errorJson = JSON.parse(errorText); // Converte o texto para JSON
    return errorJson?.response?.data?.message || 'Erro desconhecido';
  }
  // Caso não seja blob, retorna a mensagem padrão
  return error?.response?.data?.message ?? '';
}

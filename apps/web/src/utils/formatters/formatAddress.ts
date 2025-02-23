type ClientAddressData = {
  address?: string;
  number?: string | number;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  cep?: string;
};

export function formatCEP(cep: string | undefined): string {
  if (!cep) return '-';

  const cleanedCep = cep.replace(/\D/g, ''); // Remove qualquer caractere não numérico

  // Verifica se o CEP tem exatamente 8 dígitos
  if (cleanedCep.length !== 8) return '-';

  return cleanedCep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function formatAddress(data: ClientAddressData | undefined): string {
  if (!data) return '-';

  const { address, number, complement, neighborhood, city, state, cep } = data;

  return (
    [
      address,
      number ? `Nº ${number}` : null,
      complement,
      neighborhood,
      city && state ? `${city} / ${state}` : null,
      cep ? formatCEP(cep) : null,
    ]
      .filter(Boolean)
      .join(', ') || '-'
  );
}

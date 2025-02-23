export function removeNonNumericCharacters(str: string) {
  if (!str) return null;

  return str.replace(/\D/g, '');
}

export function formatDate(dataString: string): string {
  if (!dataString) {
    return '-';
  }

  const DATA = new Date(dataString);

  if (isNaN(DATA.getTime())) {
    return '***';
  }

  const YEAR = DATA.getUTCFullYear();
  const MONTH = ('0' + (DATA.getUTCMonth() + 1)).slice(-2);
  const DAY = ('0' + DATA.getUTCDate()).slice(-2);

  return `${DAY}/${MONTH}/${YEAR}`;
}

export function formatDateForInput(dateString: string): string | null {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateWithHours(dataString: string): string {
  if (!dataString) {
    return 'Não informado';
  }

  const data = new Date(dataString);

  if (isNaN(data.getTime())) {
    return '***';
  }

  const options = { timeZone: 'America/Sao_Paulo' };
  const dataBRL = data.toLocaleString('pt-BR', options);

  return dataBRL.replace(',', ' - ');
}

export function formatDateCustom(date: Date, format: string) {
  if (!date) {
    return 'Data não informada';
  }

  if (!format) {
    return 'Formato desejado não informado';
  }

  const DATA = new Date(date);

  const map: Record<string, string> = {
    dd: DATA.getDate().toString().padStart(2, '0'),
    mm: (DATA.getMonth() + 1).toString().padStart(2, '0'),
    aa: DATA.getFullYear().toString().slice(-2),
  };

  return format.replace(/dd|mm|aa/gi, (matched: string) => map[matched]);
}

export function formatDateDOMString(date: string) {
  if (!date) {
    return 'Data não informada';
  }

  const DATA = new Date(date);

  if (isNaN(DATA.getTime())) {
    return '***';
  }

  const YEAR = DATA.getUTCFullYear();
  const MONTH = ('0' + (DATA.getUTCMonth() + 1)).slice(-2);
  const DAY = ('0' + DATA.getUTCDate()).slice(-2);

  return `${YEAR}-${MONTH}-${DAY}`;
}

export function formatRG(rg: string) {
  if (!rg) return;

  // Remove qualquer caractere que não seja número
  rg = rg.replace(/\D/g, '');

  // Verifica se o RG tem pelo menos 7 dígitos para formatar corretamente
  if (rg.length < 7 || rg.length > 9) {
    return rg; // Retorna o RG sem formatação caso o tamanho seja inválido
  }

  // Formata o RG com pontos e traço
  if (rg.length === 7) {
    return rg.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3');
  }

  if (rg.length === 8) {
    return rg.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  }

  // Para RG com 9 dígitos
  return rg.replace(/(\d{2})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
}

export function formatCPF(cpf: string) {
  if (!cpf) return;

  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return cpf;
  }

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCNPJ(cnpj: string) {
  if (cnpj?.length !== 14) {
    return cnpj;
  }

  return cnpj?.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  );
}

export function formatCEP(cep: string) {
  if (!cep) return;
  // Remove qualquer caractere que não seja número
  cep = cep.replace(/\D/g, '');

  // Formata o CEP com traço
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function formatPhone(telefone: string) {
  if (!telefone) return;

  telefone = telefone?.replace(/\D/g, '');

  if (telefone.length !== 10 && telefone.length !== 11) {
    return telefone;
  }

  if (telefone.length === 11) {
    return telefone?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    return telefone?.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
}

export function formatMoney(valor: number | string) {
  if (!valor) return '';

  valor = Number(valor);

  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export * from './formatAddress';

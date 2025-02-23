type QueryParamsFiltersTypes = {
  [key: string]: string | number | undefined | null;
};

export function buildQueryFilters(params: QueryParamsFiltersTypes) {
  const query = Object.keys(params)
    .filter((key) => {
      const value = params[key];
      return value !== undefined && value !== null && value !== '';
    }) // Filtra valores indefinidos, nulos ou strings vazias
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`,
    ) // Codifica os parâmetros
    .join('&'); // Junta tudo com "&"

  return query ? `?${query}` : '';
}

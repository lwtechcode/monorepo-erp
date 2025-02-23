export function calculateTableIndex(
  pageNumber: number,
  itemIndex: number,
  itemsPerPage: number,
) {
  return (pageNumber - 1) * itemsPerPage + itemIndex + 1;
}

export function calculateRoundNumberFloat(value: number) {
  return Math.round(value * 100) / 100;
}

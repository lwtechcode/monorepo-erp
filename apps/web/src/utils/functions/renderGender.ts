export type renderGenderType = 'M' | 'F';

const gender = {
  M: 'Masculino',
  F: 'Feminino',
};

export function renderGender(key: renderGenderType) {
  return gender[key];
}

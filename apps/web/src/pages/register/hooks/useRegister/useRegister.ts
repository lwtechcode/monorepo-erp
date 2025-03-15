import { useMutation } from '@tanstack/react-query';
import { handleRegister } from '../../services';

const MUTATION_KEY_CHARTS_DASHBOARD = 'registrar-usuario';

export function useRegister() {
  const {
    data: register,
    isPending,
    mutate,
  } = useMutation({
    mutationKey: [MUTATION_KEY_CHARTS_DASHBOARD],
    mutationFn: handleRegister,
  });

  return {
    register,
    mutateRegister: mutate,
    isFetchingRegister: isPending,
  };
}

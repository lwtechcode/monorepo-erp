import tsup from '@lib/tsup';

export default tsup({
  entry: ['temp/index.ts'],
  clean: false,
});

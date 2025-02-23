import { assign, createMachine } from "xstate";
import { initialFilterState } from "./constants";

// Máquina de estados
export const filterProductsMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWAbALmATgWgAccB7CAVwGNNYA6AQytQDcwBiAZQFEAVAfW84ANPgDEAkgBkBAJQDaABgC6iUAWKxUmVMQB2KkAA9EAdgDMNAEwAWAGwAOAJz35AVhsBGU3dMAaEAE9EPGN3GmM7K1MLRyt5Bxc7MwBfJL80LFxCEnIqWgYtFg4eXnZuAEFuAFV2BWUkEDUNLV19IwR3KzCI0zMo+XC7OIs-QIQ8d2NO0zcLC0nEm2solLSMbHwiUkpqekZCrj4AeWkAEU5pThPa-UbNbT16tvcbcxcXdwTo43kLF3i7EaIKwuGheSIOKz-Z7hFYgdLrLJbXK7ApsA68ADCFU4AHFjgBNXhiK5KG7qO4tR5BdwfGgRCzuQYOZlWSIWByAsa-Yyg+QfUwQqKM0w2WHwzKbHI7fLMNHFE5idgYw6VABy3Gu9VuzQeoDaeEhIKcblMXncDgidgBASCswcNHk8lM-USzrsLmsYrWEuy2zyezYF3R4ik501qnJOtaQR6PIcHxeFhsrNZLk5BvMxhc4XcScWxni5pSqRAOlIcH04o2vtyZKa92jYxckRoxpeZotVit6dMrNbxhszcZLlN1l+Xoy1aR0oDdYpusM1LsNks2YLVmi-QsUU5uc6E3NIt+kKsvWLSSAA */
  id: "filter-products",
  initial: "active",
  context: initialFilterState,
  states: {
    active: {
      on: {
        SET_TEXT_FILTER: {
          actions: assign({
            textFilterByNameAndBarCode: (_, event) =>
              event as unknown as string,
          }),
        },
        SET_STATUS: {
          actions: assign({
            status: (_, event) => event as unknown as string,
          }),
        },
        SET_ORDERED: {
          actions: assign({
            ordered: (_, event) => event as unknown as string,
          }),
        },
        SET_CATEGORY_ID: {
          actions: assign({
            categoryId: (_, event) => event as unknown as string,
          }),
        },
        SET_DISCOUNT: {
          actions: assign({
            discount: (_, event) => event as unknown as boolean,
          }),
        },
        RESET_FILTER: {
          actions: assign(() => initialFilterState),
        },
      },
    },
  },
});

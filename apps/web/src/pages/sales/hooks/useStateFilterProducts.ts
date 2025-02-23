import { useMachine } from "@xstate/react";
import { filterProductsMachine } from "../machine/products";

export function useStateFilterProducts() {
  const [filterState, send] = useMachine(filterProductsMachine);

  function handleTextFilterChange(e: string) {
    send({ type: "SET_TEXT_FILTER", value: e });
  }

  function handleStatusChange(e: string) {
    send({ type: "SET_STATUS", value: e });
  }

  function handleOrderedChange(e: string) {
    send({ type: "SET_ORDERED", value: e });
  }

  function handleCategoryIdChange(e: string) {
    send({ type: "SET_CATEGORY_ID", value: e });
  }

  function handleDiscountChange(e: string) {
    send({ type: "SET_DISCOUNT", value: e });
  }

  function handleReset() {
    send({ type: "RESET_FILTER" });
  }

  return {
    filterState,
    handleTextFilterChange,
    handleStatusChange,
    handleOrderedChange,
    handleCategoryIdChange,
    handleDiscountChange,
    handleReset,
  };
}

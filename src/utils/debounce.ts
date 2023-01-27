export const debounce = (fn: unknown, ms = 0) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function");
  }
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

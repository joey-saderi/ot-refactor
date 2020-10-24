

export const FindByAttr = (wrapper, value) => {
  return wrapper.find(`[data-test-id="${value}"]`);
};

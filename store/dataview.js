export const state = () => ({
  currentPage: 1,
  totalPages: 0,
});

export const mutations = {
  fillTotalPages(state, value) {
    state.totalPages = value;
  },
  changePage(state, value) {
    state.currentPage = Number(value);
  },

};

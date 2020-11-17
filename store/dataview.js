export const state = () => ({
  currentPage: 1,
  totalPages: 0,
  isMobile: true,
});

export const mutations = {
  fillTotalPages(state, value) {
    state.totalPages = value;
  },
  changePage(state, value) {
    state.currentPage = value;
  },

  changeIsMobile(state, value) {
    state.isMobile = value;
  },
};

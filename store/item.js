export const state = () => ({
  data: [],
});

export const getters = {

};

export const mutations = {
  fillData(state, payload) {
    state.data = payload;
  },
};

export const actions = {
  async getItemInfo({ commit }, payload) {
    const options = {
      params: {
        apikey: '592a2829-b138-41ed-a9c0-84a7feffd16b',
      },
    };
    await this.$axios.get(`/object/${payload.id}?`, options)
      .then((res) => {
        if (res.status === 200) {
          commit('fillData', res.data);
        }
      });
    // .catch((e) => {
    //   console.log(e);
    // });
  },
};

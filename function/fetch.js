export default async (fetchType, url, store, route, error, totalPages) => {
  let data = await fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        error({ statusCode: res.status, message: res.message });
        return {};
      }
      return res.json();
    })
    .catch((e) => {
      error({ statusCode: e.status, message: e.message });
    });

  // если API вернул ответ с ключом error
  if (data.error) {
    data = {};
    error({ statusCode: 404, message: 'Page Not Found' });
  }

  if (fetchType === 'index') {
    if (Object.keys(data).length !== 0) {
      store.commit('dataview/fillTotalPages', data.info.pages);
    }
  }

  if (fetchType === 'page') {
    // если перешли на страницу вручную заполним totalPage
    if (totalPages === 0) {
      store.commit('dataview/fillTotalPages', data.info.pages);
      store.commit('dataview/changePage', route.params.id);
    }

    // если в url передали страницу больше/меньше чем есть
    if (data.info.page > data.info.pages || route.params.id < 1) {
      store.commit('dataview/fillTotalPages', 0);
      store.commit('dataview/changePage', 1);
      error({ statusCode: 404 });
    }
  }

  return data;
};

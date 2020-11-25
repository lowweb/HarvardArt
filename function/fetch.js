export default async (store, route, error, totalPages) => {
  let data = await fetch('https://api.harvardartmuseums.org/object?q=totalpageviews:50&size=15&apikey=592a2829-b138-41ed-a9c0-84a7feffd16b')
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

  // eslint-disable-next-line no-console
  console.log(data);
  // если API вернул ответ с ключом error
  if (data.error) {
    data = {};
    error({ statusCode: 404, message: 'Page Not Found' });
  }

  if (Object.keys(data).length !== 0
  && (totalPages === 0 || totalPages === undefined)) {
    store.commit('dataview/fillTotalPages', data.info.pages);
  }

  // если ввели в url вручную номер страницы
  if (route.params.id > 0) {
    store.commit('dataview/changePage', route.params.id);
  }

  // если в url передали страницу больше/меньше чем есть
  if (data.info.page > data.info.pages || route.params.id < 1) {
    store.commit('dataview/fillTotalPages', 0);
    store.commit('dataview/changePage', 1);
    error({ statusCode: 404 });
  }
  return {
    data,
  };
};

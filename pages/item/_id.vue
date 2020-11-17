<template>
  <div class="wrap">
    <button class="btn btn--fit" name="toIndex" @click="toPrevPage">
      Назад
    </button>
    <ItemInfo :data="itemData" :fetch-state="$fetchState" />
  </div>
</template>

<script>
import ItemInfo from '~/components/itemInfo.vue';

export default {
  components: {
    ItemInfo,
  },

  data() {
    return {
      itemData: {},
    };
  },

  async fetch() {
    const { route, error } = this.$nuxt.context;
    const data = await fetch(`https://api.harvardartmuseums.org/object/${route.params.id}?apikey=592a2829-b138-41ed-a9c0-84a7feffd16b`)
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

    this.itemData = data;

    // если API вернул ответ с ключом error
    if (this.itemData.error) {
      this.itemData = {};
      error({ statusCode: 404, message: 'Page Not Found' });
    }
  },

  fetchOnServer: false,

  methods: {
    toPrevPage() {
      if (this.$store.state.dataview.currentPage === 1) {
        this.$router.push('/');
      } else {
        this.$router.push({ name: 'page-id', params: { id: this.$store.state.dataview.currentPage } });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin-bottom: 50px;
}
</style>

<template>
  <div class="wrap">
    <button class="btn btn--fit" name="toIndex" @click="goToPrevPage">
      Назад
    </button>
    <ItemInfo :data="itemData" :fetch-state="$fetchState" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import getFetch from '@/function/fetch';
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
    const url = `https://api.harvardartmuseums.org/object/${route.params.id}?apikey=592a2829-b138-41ed-a9c0-84a7feffd16b`;
    const data = await getFetch('item', url, undefined, route, error, undefined);
    this.itemData = data;
  },

  computed: {
    ...mapState(
      'dataview', ['currentPage'],
    ),
  },

  methods: {
    goToPrevPage() {
      if (this.currentPage === 1) {
        this.$router.push('/');
      } else {
        this.$router.push({ name: 'page-id', params: { id: this.currentPage } });
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

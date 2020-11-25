<template>
  <div>
    <div v-if="!Object.keys(data).length && !fetchState.pending">
      Нет данных для отображения
    </div>
    <template v-if="fetchState.pending">
      <div class="listView placeholder">
        <content-placeholders
          v-for="p in 10"
          :key="p"
        >
          <content-placeholders-img />
        </content-placeholders>
      </div>
    </template>
    <template v-if="Object.keys(data).length && !fetchState.pending">
      <ul class="listView">
        <li
          v-for="(item, index) in data"
          :key="index"
          class="listView__item"
          @click="openItem(item.id)"
        >
          <img
            v-if="(item.primaryimageurl) != null"
            v-lazy="item.primaryimageurl + '?width=' + imgWeight"
            alt="exhibit img"
            class="listView__item-img"
          >
          <div v-if="(item.primaryimageurl) == null" class="listView__item--noimg" />
          <div class="listView__item-cap">
            {{ item.title }}
          </div>
          <div class="listView__item-meta">
            {{ item.totaluniquepageviews }}
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    fetchState: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    imgWeight: 150,
  }),
  methods: {
    openItem(id) {
      this.$router.push({ name: 'item-id', params: { id } });
    },
  },
};

</script>

<style lang="scss">
.listView {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
   @media only screen and (max-width: 780px) {
     grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 570px) {
     grid-template-columns: 1fr;
  }

  &__item {
    display: flex;
    flex-direction: column;
    min-height: 150px;
    overflow: hidden;
    list-style: none;
    background-color: #ffe66e;
    border-radius: 1rem;
    box-shadow: -9px -9px 16px #f8fafe, 9px 9px 16px #ced2db;
    cursor: pointer;
    // transition: transform .2s ease-in-out;

    &:nth-child(2n) {
      background-color: #caafe8;
    }
    &:nth-child(5n) {
      background-color: #7be5ea;
    }

    &:hover {
      box-shadow: -4px -4px 8px #f8fafe, 4px 4px 8px #ced2db;
      // transform: scale(1.03);
      // transition: transform .2s ease-in-out;
    }

    &-cap {
      flex: 1;
      padding: 20px;
      font-size: 25px;
    }

    &-meta {
      display: flex;
      align-items: center;
      height: 25px;
      padding: 20px;

      &::before {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        content: url('../assets/view.svg');
      }
    }

    &:hover &-cap {
      color: #3d15b3;
    }

    &--noimg {
      width: 100%;
      height: 200px;
      background-color: #e2e2e2;
      background-image: url('../assets/noimg.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 50%;
    }

    &-img {
      width: 100%;
      height: 200px;
      // max-height: 150px;
      object-fit: cover;
      background-color: #e2e2e2;
    }
  }

}

.vue-content-placeholders-img {
  width: 100%;
  height: 330px;
  border-radius: 1rem;
}
</style>

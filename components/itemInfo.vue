<template>
  <div class="iteminfo placeholder">
    <template v-if="fetchState.pending">
      <content-placeholders class="itm-placeholder">
        <content-placeholders-text :lines="6" />
        <content-placeholders-img style="height:300px" />
      </content-placeholders>
    </template>
    <template v-if="!fetchState.pending && Object.keys(data).length">
      <div class="remark">
        <div class="remark__caption">
          Title:
        </div>
        <h1 class="remark__text">
          {{ data.title }}
        </h1>
      </div>
      <div class="remark">
        <div class="remark__caption">
          People:
        </div>
        <h2 class="remark__text">
          {{ (data.peoplecount > 0) ? data.people[0].displayname : 'unknown' }}
        </h2>
      </div>
      <div class="remark">
        <div class="remark__caption">
          Culture:
        </div>
        <div class="remark__text">
          {{ data.culture }}
        </div>
      </div>
      <img
        v-lazy="(data.primaryimageurl) != null ? data.primaryimageurl : noImgSrc"
        alt="exhibit img"
        class="iteminfo__img"
      >
    </template>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
    fetchState: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    // eslint-disable-next-line global-require
    noImgSrc: require('../assets/noimg.png'),
  }),
};
</script>

<style lang="scss">
.iteminfo {
  &__img {
    width: 100%;
    height: auto;
    min-height: 300px;
    background-color: #f3f3f3;
  }
}

.remark {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0px;
  }

  &__caption {
    color: #999999;
  }
}
</style>

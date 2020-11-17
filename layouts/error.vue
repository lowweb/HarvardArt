<template>
  <div class="wrap error">
    <h1 class="error__code">
      {{ error.statusCode }}
    </h1>
    <h1 class="error__message">
      {{ errorMessage }}
    </h1>
    <nuxt-link to="/">
      На главную
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },

  computed: {
    errorMessage() {
      switch (this.error.statusCode) {
        case 400:
          return 'Bad Request';
        case 401:
          return 'Unauthorized';
        case 403:
          return 'Forbidden';
        case 404:
          return 'Page Not Found';
        case 500:
          return 'Internal Server Error';
        default:
          return 'Нет такой страницы';
      }
    },
  },
};
</script>

<style lang="scss">
.error {
  &__code {
    font-size: 50px;
  }
}
</style>

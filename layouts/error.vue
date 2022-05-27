<template>
  <div>
    <PageNotFound />
  </div>
</template>
<script>
import PageNotFound from '@/components/PageNotFound.vue'
export default {
  components: { PageNotFound },
  name: 'error',

  setup() {
    if (process.server) {
      const nuxtApp = useNuxtApp();
      const error = new Error();
      error.statusCode = 404;
      nuxtApp.ssrContext.error = error;
      nuxtApp.ssrContext.nuxt.error = error;
    }
  }
}
</script>
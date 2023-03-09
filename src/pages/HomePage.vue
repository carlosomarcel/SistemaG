<template>
  <div>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
  <footerPage></footerPage>
</div>
</template>

<script>

import { defineComponent, defineAsyncComponent } from 'vue'

const footerPage = defineAsyncComponent(() =>
  import('src/components/footerPage')
)

export default defineComponent({
  name: 'pageIndex',
  components: {
    footerPage
  }

})
</script>

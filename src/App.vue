<template>
  <router-view/>
  <chartPage></chartPage>
  <footerPage></footerPage>
</template>
<script>

import { defineComponent, defineAsyncComponent } from 'vue'
import { api } from 'boot/axios'

const chartPage = defineAsyncComponent(() =>
  import('src/components/charts/chartDemo.vue')
)

const footerPage = defineAsyncComponent(() =>
  import('src/components/footerPage.vue')
)

export default defineComponent({
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    chartPage,
    // eslint-disable-next-line vue/no-unused-components
    footerPage
  },
  beforeCreate () {
    this.$store.dispatch('auth/init')
    const token = this.$store.getters.getToken
    if (token) {
      api.defaults.headers.common.Authorization = ' Bearer ' + token.access
    } else {
      api.defaults.headers.common.Authorization = ''
    }
  },
  created () {
    this.$q.dark.set(false)
  }
})
</script>

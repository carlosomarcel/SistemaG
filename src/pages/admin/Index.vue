<template>
  <h3> Protected route - Admin </h3>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexHome',
  computed: {
    ...mapGetters('auth', ['getMe'])
  }
}
</script>

<style scoped>

</style>

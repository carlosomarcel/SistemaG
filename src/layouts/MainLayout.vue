<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Gestão de Sistemas - SYN
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menus
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator />
        <q-expansion-item
        expand-separator
        icon="person"
        label="Usuários"
        caption=""
        default-closed
      >
        <q-expansion-item to="/users"
          :header-inset-level="1"
          expand-separator
          icon="people"
          label="Todos"
          default-opened
        >
        </q-expansion-item>
        </q-expansion-item>
        <q-expansion-item
        expand-separator
        icon="dns"
        label="Sistemas"
        caption=""
        default-closed
      >
        <q-expansion-item to="/systems"
          :header-inset-level="1"
          expand-separator
          icon="receipt"
          label="ERPs"
          default-closed>
          </q-expansion-item>

          </q-expansion-item>

        <q-expansion-item to="/access"
        expand-separator
        icon="badge"
        label="Acessos"
        caption=""
        default-closed
      >
        </q-expansion-item>

        <q-expansion-item to="/chart"
        expand-separator
        icon="ssid_chart"
        label="Graficos"
        caption=""
        default-closed
        color="primary"
      >
        <q-expansion-item
          :header-inset-level="1"
          expand-separator
          icon="summarize"
          label="Todos"
          default-opened
        >
        </q-expansion-item>
        </q-expansion-item>
        <q-expansion-item
        expand-separator
        icon="summarize"
        label="Analytics"
        caption=""
        default-closed
      >
        <q-expansion-item
          :header-inset-level="1"
          expand-separator
          icon="summarize"
          label="Relatórios de Usuários"
          default-opened
        >
        </q-expansion-item>
        </q-expansion-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    icon: 'home',
    route: { name: 'home' }
  }

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

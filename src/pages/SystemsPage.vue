<template>

  <q-page padding>
      <q-table :rows="getMe.systems" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Sistemas</span>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{name: 'formSystem'}"/>
      </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)" />
            <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)" />
          </q-td>
        </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'SystemsPage',
  computed: {
    ...mapGetters('auth', ['getMe'])
  },
  setup () {
    const posts = ref([])
    const systems = ref([])
    const { list, remove } = postsService()
    const columns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
      { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
      { name: 'description', label: 'Descrição', field: 'description', sortable: true, align: 'left' },
      { name: 'actions', label: 'Ações', align: 'rigth' }
    ]
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Apagar',
          message: 'Deseja apagar este usúario?',
          ok: {
            push: true
          },
          cancel: {
            push: true,
            color: 'negative'
          },
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com Sucesso', icon: 'check', color: 'positive' })
          this.$router.go()
          await getPosts()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar usuário', icon: 'times', color: 'negative' })
      }
    }

    const handleEditPost = (id) => {
      router.push({ name: 'FormSystem', params: { id } })
    }

    return {
      posts,
      systems,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>

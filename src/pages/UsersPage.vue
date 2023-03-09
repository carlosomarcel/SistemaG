<template>
  <q-page padding class="q-pa-md">
      <q-table class="my-sticky-header-table" flat bordered title="Usuários" ref="tableRef" :rows="posts" :columns="columns" row-key="id" :filter="filter">
      <template v-slot:top>
        <span class="text-h5">Usuários</span>
        <q-space/>
        <span justify-content text-center>
        <q-input border dense debounce="300" v-model="filter" placeholder="Buscar" >
          <template  v-slot:append>
            <q-icon name="search" />
            <q-space/>
          </template>
        </q-input>
      </span>
      <q-space />
        <q-btn color="primary" label="Criar" :to="{name:'formUser'}"/>
        <q-space/>
        <span >
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </span>
      </template>
             <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)" />
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)" />
          </q-td>
        </template>
          <template v-slot:top-right>
      </template>
    </q-table>
  </q-page>
  <footerPage></footerPage>
</template>
<script>
import { defineComponent, ref, onMounted, defineAsyncComponent } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { mapGetters } from 'vuex'

const footerPage = defineAsyncComponent(() =>
  import('src/components/footerPage.vue')
)

export default defineComponent({
  name: 'UsersPage',
  components: { footerPage },
  computed: {
    ...mapGetters('auth', ['getMeuser'])
  },
  // Exporta csv
  methods: {
    exportTable () {
      const columns = [
        { name: 'id', label: 'ID' },
        { name: 'name', label: 'Nome' },
        { name: 'email', label: 'Email' }
      ]

      const rows = this.$refs.tableRef.body.rows.map((row) => {
        return {
          id: row.id,
          name: row.name,
          email: row.email
        }
      })

      this.$q.exportFile('usuarios.csv', columns, rows)
    }
  },
  setup () {
    const posts = ref([])
    const tableRef = ref(null)
    const selected = ref([])
    const { list, remove } = postsService()
    const columns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
      { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
      { name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' },
      { name: 'role', label: 'Perfil', field: 'role', sortable: true, align: 'left' },
      { name: 'office', label: 'Escritorio', field: 'office', sortable: true, align: 'left' },
      { name: 'department', label: 'Departamento', field: 'department', sortable: true, align: 'left' },
      { name: 'is_active"', label: 'Status', field: 'is_active', sortable: true, align: 'left' },
      { name: 'resignation_date', label: 'Data do Desligamento', field: 'resignation_date', sortable: true, align: 'left' },
      { name: 'last_update', label: 'Ultimo Logon', field: 'last_update', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
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
          await getPosts()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar usuário', icon: 'times', color: 'negative' })
      }
    }
    const handleEditPost = (id) => {
      router.push({ name: 'formUser', params: { id } })
    }
    return {
      posts,
      columns,
      handleDeletePost,
      handleEditPost,
      tableRef,
      filter: ref(''),
      selected
    }
  }
})
</script>

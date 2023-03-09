<template>
  <div class="q-page padding">
    <table>
      <thead>
        <tr>
          <th>ID - Sistema</th>
          <th>Sistema</th>
          <th>Nome do Sistema</th>
          <th>Descrição</th>
          <th>Perfil</th>
          <th>Data da Criação</th>
          <th>Data do bloqueio</th>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Cargo</th>
          <th>Escritorio</th>
          <th>Departamento</th>
          <th>Status</th>
          <th>Data do Desligamento</th>
          <th>Ultimo Logon</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in access" :key="index">
          <td>{{ row.id.system }}</td>
          <td>{{ row.system.id }}</td>
          <td>{{ row.system.name }}</td>
          <td>{{ row.system.description }}</td>
          <td>{{ row.profile }}</td>
          <td>{{ row.create_date }}</td>
          <td>{{ row.block_date }}</td>
          <td>{{ row.user.id }}</td>
          <td>{{ row.user.name }}</td>
          <td>{{ row.user.email }}</td>
          <td>{{ row.user.role }}</td>
          <td>{{ row.user.office }}</td>
          <td>{{ row.user.departament }}</td>
          <td>{{ isActiveFormatter(row.is_active) }}</td>
          <td>{{ row.resignation_date }}</td>
          <td>{{ row.last_update }}</td>
          <td>
            <button @click="handleEditPost(row.user.id)">Editar</button>
            <button @click="handleDeletePost(row.user.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="router.push({ name: 'formAccess' })">Novo</button>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'AccessPage',

  setup () {
    const access = ref([])
    const { list, remove } = postsService()
    const columns = [
      { name: 'id', label: 'ID/Acesso', field: 'id', sortable: true, align: 'left' },
      { name: 'system', label: 'ID/Sistema', field: 'system.id', sortable: true, align: 'left' },
      { name: 'name', label: 'Nome do Sistema', field: 'system.name', sortable: true, align: 'left' },
      { name: 'description', label: 'Descrição', field: 'system.description', sortable: true, align: 'left' },
      { name: 'profile', label: 'Perfil', field: 'profile', sortable: true, align: 'left' },
      { name: 'create_date', label: 'Data da Criação', field: 'create_date', sortable: true, align: 'left' },
      { name: 'block_date', label: 'Data do bloqueio', field: 'block_date', sortable: true, align: 'left' },
      { name: 'id', label: 'ID/User', field: 'user.id', sortable: true, align: 'left' },
      { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
      { name: 'email', label: 'Email', field: 'user.email', sortable: true, align: 'left' },
      { name: 'role', label: 'Cargo', field: 'role', sortable: true, align: 'left' },
      { name: 'office', label: 'Escritorio', field: 'office', sortable: true, align: 'left' },
      { name: 'departament', label: 'Departamento', field: 'departament', sortable: true, align: 'left' },
      { name: 'is_active', label: 'Status', field: 'is_active', sortable: true, align: 'left', format: isActiveFormatter },
      { name: 'resignation_date', label: 'Data do Desligamento', field: 'resignation_date', sortable: true, align: 'left' },
      { name: 'last_update', label: 'Ultimo Logon', field: 'last_update', sortable: true, align: 'left' },
      { name: 'actions', label: 'Ações', align: 'rigth' }
    ]
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getUsers()
    })

    const getUsers = async () => {
      try {
        const data = await list()
        access.value = data.access
        console.log(data.profile)
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
          await getUsers()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao apagar usuário', icon: 'times', color: 'negative' })
      }
    }

    const handleEditPost = (id) => {
      router.push({ name: 'formAccess', params: { id } })
    }
    function isActiveFormatter (value) {
      return value ? 'Ativo' : 'Inativo'
    }

    return {
      access,
      columns,
      handleDeletePost,
      handleEditPost,
      isActiveFormatter
    }
  },
  // eslint-disable-next-line no-dupe-keys
  computed: {
    ...mapGetters('auth', ['getMe'])
  }
})
</script>

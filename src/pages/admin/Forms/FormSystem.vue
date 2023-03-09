<template>
  <q-page padding>
    <q-toolbar>
      <h1 class="q-toolbar__title" color="primary" content-center>Dados do Sistema</h1>
    </q-toolbar>
    <q-form
      @submit="onSubmit"

      class="row q-col-gutter-sm q-col fit row inline  justify-center items-center"
    >
       <q-input
        outlined
        v-model="formsystem.system.profile"
        label="Perfil"
        lazy-rules
        class="col-lg-2 col-xs-6  fit row inline  justify-center items-center"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="formsystem.system"
        label="Sistema"
        lazy-rules
        class="col-lg-2 col-xs-12 fit row inline  justify-center items-center"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="formsystem.users"
        label="Usuário"
        lazy-rules
        class="col-lg-2 col-xs-12 fit row inline  justify-center items-center"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <div>
        <q-btn label="Salvar" type="submit" color="primary" icon="save" />
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" :to = "{name: 'SystemsPage' }" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'

export default defineComponent({
  name: 'FormSystem',
  setup () {
    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()

    const formsystem = ref({
      id: '',
      name: '',
      description: ''

    })

    onMounted(async () => {
      if (route.params.id) {
        getUsers(route.params.id)
      }
    })
    const getUsers = async (id) => {
      try {
        const response = await getById(id)
        formsystem.value = response
      } catch (error) {
        console.error(error)
      }
    }
    const onSubmit = async () => {
      try {
        if (formsystem.value.id) {
          await update(formsystem.value)
        } else {
          await post(formsystem.value)
        }
        $q.notify({ message: 'Post salvo com sucesso!', icon: 'check', color: 'positive' })
        router.push({ name: 'formsystemSystem' })
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'dados invalidos!', icon: 'check', color: 'negative' })
      }
    }
    return {
      formsystem,
      onSubmit
    }
  }
})
</script>

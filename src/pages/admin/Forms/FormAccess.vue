<template>
  <q-page padding>
    <q-toolbar>
      <div class="q-toolbar__title" primary content-center text-align: center>Dados do Acesso</div>
    </q-toolbar>
    <q-form
      @submit="onSubmit"

      class="row q-col-gutter-sm q-col fit row inline  justify-center items-center"
    >
    <q-input
        outlined
        v-model="form.profile"
        label="Perfil"
        lazy-rules
        class="col-lg-6 col-xs-6  fit row inline  justify-center items-center"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.system"
        label="Sistema"
        lazy-rules
        class="col-lg-2 col-xs-6  fit row inline  justify-center items-center"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.user"
        label="Usuário"
        lazy-rules
        class="col-lg-2 col-xs-12 fit row inline  justify-center items-center"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <div>
        <q-btn label="Salvar" type="submit" color="primary" icon="save" />
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" :to = "{name: 'AccessPage' }" />
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
  name: 'formAccess',
  setup () {
    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      id: '',
      profile: '',
      system: '',
      user: ''

    })

    onMounted(async () => {
      if (route.params.id) {
        getUsers(route.params.id)
      }
    })
    const getUsers = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.error(error)
      }
    }
    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)
        } else {
          await post(form.value)
        }
        $q.notify({ message: 'Post salvo com sucesso!', icon: 'check', color: 'positive' })
        router.push({ name: 'AccessPage' })
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'dados invalidos!', icon: 'check', color: 'negative' })
      }
    }
    return {
      form,
      onSubmit
    }
  }
})
</script>

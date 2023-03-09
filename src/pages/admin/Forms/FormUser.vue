<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-sm my-form" dense style="max-width: 400px; margin-top: -40px; margin-bottom: 10px">
      <q-toolbar class="q-gutter-sm my-form" dense style="max-width: 400px; margin-top: -40px; margin-bottom: 10px">
  <h1 class="q-toolbar__title" style="margin-bottom: -30px;">Dados do Usuário</h1>
</q-toolbar>
      <q-input
        outlined
        v-model="form.name"
        label="Nome"
        lazy-rules
        class="col-6 col-sm-2"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.email"
        label="Email"
        lazy-rules
        class="col-4 col-sm-6"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.role"
        label="Cargo"
        lazy-rules
        class="col-4 col-sm-4"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.office"
        label="Escritório"
        lazy-rules
        class="col-4 col-sm-4"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.department"
        label="Departamento"
        lazy-rules
        class="col-4 col-sm-4"
      />
      <q-toggle
        :false-value="true"
        :label="`Ativo: ${redModel ? 'Sim' : 'Não'}`"
        :true-value="false"
        color="red"
        v-model="redModel"
      />
      <q-input
        outlined
        v-model="form.resignation_date"
        label="Data de Desligamento"
        lazy-rules
        class="col-4 col-sm-6"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <q-input
        outlined
        v-model="form.last_update"
        label="Último Login"
        lazy-rules
        class="col-4 col-sm-6"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      />
      <div class="col-4 text-center q-mt-md">
        <q-btn label="Salvar" type="submit" color="primary" icon="save" :to="{ name: 'usersPage' }" />
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" :to="{ name: 'usersPage' }" />
      </div>
    </q-form>
  </q-page>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'formUser',
  setup () {
    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      name: '',
      email: '',
      role: '',
      office: '',
      department: '',
      is_active: null,
      resignation_date: '',
      last_update: ''
    })

    onMounted(async () => {
      if (route.params.id) {
        const response = await getById(route.params.id)
        form.value = response
      }
    })

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)
        } else {
          await post(form.value)
        }
        $q.notify({ message: 'Post salvo com sucesso!', icon: 'check', color: 'positive' })
        router.push({ name: 'UsersPage' })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      form,
      onSubmit,
      redModel: ref(true)
    }
  }
})
</script>
<style scoped>
.my-form {
  font-size: 14px;
  line-height: 1;
}
</style>

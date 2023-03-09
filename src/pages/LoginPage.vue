// eslint-disable-next-line vue/multi-word-component-names
<!-- eslint-disable no-tabs -->
<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template >
	<q-card class="q-ma-xl ">
		<div class="row flex justify-center">
			<div class="col-4 col-sm-4 bg-primary rounded-left-borders-flex xs-hide">
				<div class="row full-width q-px-xl q-pb-x1 full-height flex flex-center">
					<div class="">
						<div class="text-h4 text-uppercase text-white fredoka" style="min-width: 220px">BEM-VINDO!</div>
						<div class="text-white q-my-sm text-subtitle1">Por favor, faça login na sua conta para começar!
						</div>
					</div>
				</div>
			</div>
			<div class="col-4 col-sm-4 ">
				<div class="row q-ml-sm q-mt-sm sm-and-up-hide ">
					<div class="col-12 fredoka text-subtitle1">
						<router-link class="text-primary flex justify-center" style="text-decoration: none" to="/">
							Sistema de Gestão de acessos - SYN
						</router-link>
					</div>
				</div>
				<div class="row q-pa-sm-sm q-pa-md">
					<div class="col-12">
						<q-card-section>
							<div class="q-mb-xl">
								<div class="flex justify-center">
									<div class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka">
										Login</div>
								</div>
							</div>

							<q-form ref="form" class="q-gutter-md" @submit.prevent="submitForm">
								<q-input v-model="login.username" label="Email" name="Email" />

								<q-input v-model="login.password" label="Senha" name="password" type="password" />

								<div>
									<q-btn class="full-width fredoka" color="primary" label="Login" rounded
										type="submit"></q-btn>

									<div class="q-mt-lg">
									</div>
								</div>
							</q-form>
						</q-card-section>
					</div>
				</div>
			</div>
		</div>
	</q-card>
</template>
<script>
import { useQuasar } from 'quasar'
import { mapActions } from 'vuex'

let $q
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data () {
    return {
      login: {
        username: 'sistemas.syn',
        password: '@Syn2023'
      }
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async submitForm () {
      if (!this.login.username || !this.login.password) {
        $q.notify({
          type: 'negative',
          message: 'Os dados informados são inválidos.'
        })
      } else if (this.login.password.length < 6) {
        $q.notify({
          type: 'negative',
          message: 'A senha deve ter 6 ou mais caracteres.'
        })
      } else {
        try {
          await this.doLogin(this.login)
          const toPath = this.$route.query.to || '/home'
          this.$router.push(toPath)
        } catch (err) {
          if (err.response.data.detail) {
            $q.notify({
              type: 'negative',
              message: err.response.data.detail
            })
          }
        }
      }
    }
  },
  mounted () {
    $q = useQuasar()
  }
}
</script>

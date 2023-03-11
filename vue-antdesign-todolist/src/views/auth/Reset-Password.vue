<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
				<h1 class="mb-15">Reset password</h1>
				<h5 class="font-regular text-muted">Enter your email and password to reset password</h5>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit.prevent="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Email" :colon="false">
						<a-input 
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]"
            placeholder="Email"
            type="email"
            v-model="email" />
					</a-form-item>
					<a-form-item class="mb-5" label="Password" :colon="false">
						<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]"
            type="password"
            placeholder="Password"
            v-model="password"/>
					</a-form-item>
          <a-form-item class="mb-5" label="Password" :colon="false">
            <a-input
                v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]"
                type="password"
                placeholder="Password"
                v-model="password_re_enter"/>
          </a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							RESET PASSWORD
						</a-button>
					</a-form-item>
				</a-form>

			</a-col>

		</a-row>
		
	</div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default ({
		data() {
			return {
        email: '',
        password: '',
        password_re_enter: '',
        submitted: false,
				rememberMe: true,
			}
		},
    computed: {
      ...mapState('auth', ['status'])
    },
    created () {
      this.logout();
    },
		methods: {
      ...mapActions('auth', ['resetPassword', 'logout']),
      ...mapActions('alert', ['error']),
			handleSubmit() {
        this.submitted = true;
        const { email, password, password_re_enter } = this;
        if (email && password && password === password_re_enter) {
          this.resetPassword({ email, password })
        }else if(password !== password_re_enter){
          this.error('Passwords dont match')
        }
			},
		},
	})

</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>
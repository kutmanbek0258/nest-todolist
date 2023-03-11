<!--
	This is the sign in page, it uses the dashboard layout in:
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">

		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
				<h1 class="mb-15">{{ $t('sign_in.title') }}</h1>
				<h5 class="font-regular text-muted">{{ $t('sign_in.text_message') }}</h5>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit.prevent="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" :label="$t('sign_in.email_placeholder')" :colon="false">
						<a-input
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]"
            :placeholder="$t('sign_in.email_placeholder')"
            type="email"
            v-model="email" />
					</a-form-item>
					<a-form-item class="mb-5" :label="$t('sign_in.password_placeholder')" :colon="false">
						<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]"
            type="password"
            :placeholder="$t('sign_in.password_placeholder')"
            v-model="password"/>
					</a-form-item>
					<a-form-item class="mb-10">
    					<a-switch v-model="rememberMe" />
            {{ $t('sign_in.remember_me_switch') }}
					</a-form-item>
          <a-form-item>
            <router-link to="/forgot-password" class="font-bold text-dark">{{ $t('sign_in.forgot_password') }}</router-link>
          </a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
              {{ $t('sign_in.sign_in_button') }}
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign In Form -->

				<p class="font-semibold text-muted">{{ $t('sign_in.have_not_account') }}<router-link to="/sign-up" class="font-bold text-dark">
          {{ $t('sign_in.sign_up') }}</router-link></p>
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
<!--			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">-->
<!--				<img src="images/img-signin.jpg" alt="">-->
<!--			</a-col>-->
			<!-- Sign In Image Column -->

		</a-row>

	</div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default ({
		data() {
			return {
				// Binded model property for "Sign In Form" switch button for "Remember Me" .
        email: '',
        password: '',
        submitted: false,
				rememberMe: true,
			}
		},
    computed: {
      ...mapState('auth', ['status'])
    },
		// beforeCreate() {
		// 	// Creates the form and adds to it component's "form" property.
		// 	this.form = this.$form.createForm(this, { name: 'normal_login' });
		// },
    created () {
      // reset login status
      this.logout();
    },
		methods: {
			// Handles input validation after submission.
      ...mapActions('auth', ['login', 'logout']),
			handleSubmit() {
        this.submitted = true;
        const { email, password } = this;
        // console.log("Submitted " + email)
        if (email && password) {
          this.login({ email, password })
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
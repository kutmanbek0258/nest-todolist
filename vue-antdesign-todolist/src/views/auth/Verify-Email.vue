<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Sign In</h1>
				<h5 class="font-regular text-muted">Enter verification code</h5>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit.prevent="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-5" label="Verification code" :colon="false">
						<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input verification code' }] },
						]"
            type="number"
            placeholder="Code"
            v-model="verification"/>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							Verify email
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign In Form -->

				<p class="font-semibold text-muted">Don't have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign Up</router-link></p>
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
        verification: '',
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
      ...mapActions('auth', ['verifyEmail', 'logout']),
			handleSubmit() {
        this.submitted = true;
        const { verification } = this;
        if (verification) {
          this.verifyEmail({ verification })
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
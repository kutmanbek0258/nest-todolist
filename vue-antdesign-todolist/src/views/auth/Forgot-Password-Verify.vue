<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
				<h1 class="mb-15">Verification</h1>
				<h5 class="font-regular text-muted">Enter verification code to reset password</h5>

				<!-- Forgot Password Verification Form -->
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
						'verification',
						{ rules: [{ required: true, message: 'Please input verification code' }] },
						]"
            type="number"
            placeholder="Code"
            v-model="verification"/>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							VERIFY
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
        verification: '',
        submitted: false,
			}
		},
    computed: {
      ...mapState('auth', ['status'])
    },

    created () {
      this.logout();
    },
		methods: {
      ...mapActions('auth', ['forgotPasswordVerify', 'logout']),
			handleSubmit() {
        this.submitted = true;
        const { verification } = this;
        if (verification) {
          this.forgotPasswordVerify({ verification })
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
<!--
	This is the sign up page, it uses the dashboard layout in:
	"./layouts/Default.vue" .
 -->

<template>
	<div>

		<!-- Sign Up Image And Headings -->
		<div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">
			<div class="content">
				<h1 class="mb-5">{{$t('sing_up.title')}}</h1>
				<p class="text-lg">{{$t('sing_up.text_message')}}</p>
			</div>
		</div>
		<!-- / Sign Up Image And Headings -->

		<!-- Sign Up Form -->
		<a-card :bordered="false" class="card-signup header-solid h-full" :bodyStyle="{paddingTop: 0}">
			<template #title>
				<h5 class="font-semibold text-center">{{$t('sing_up.register_with')}}</h5>
			</template>
			<div class="sign-up-gateways">
    			<a-button>
					<img src="images/logos/logos-facebook.svg" alt="">
				</a-button>
    			<a-button>
					<img src="images/logos/logo-apple.svg" alt="">
				</a-button>
    			<a-button>
					<img src="images/logos/Google__G__Logo.svg.png" alt="">
				</a-button>
			</div>
			<p class="text-center my-25 font-semibold text-muted">Or</p>
			<a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit.prevent="handleSubmit"
			>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input your name!' }] },
						]"
						:placeholder="$t('sing_up.name_placeholder')"
            type="text"
            v-model="fullName"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]"
						:placeholder="$t('sing_up.email_placeholder')"
            type="email"
            v-model="email"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-5">
					<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your Password!' }] },
						]"
						type="password"
						:placeholder="$t('sing_up.password_placeholder')"
            v-model="password"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-checkbox
						v-decorator="[
						'remember',
						{
							valuePropName: 'checked',
							initialValue: true,
						},
						]"
					>
            {{ $t('sing_up.agreement_terms') }} <a href="#" class="font-bold text-dark">{{ $t('sing_up.terms') }}</a>
					</a-checkbox>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
            {{ $t('sing_up.sing_up_button') }}
					</a-button>
				</a-form-item>
			</a-form>
			<p class="font-semibold text-muted text-center">{{ $t('sing_up.have_account')}}<router-link to="/sign-in" class="font-bold text-dark">
        {{ $t('sing_up.sign_in') }}</router-link></p>
		</a-card>
		<!-- / Sign Up Form -->

	</div>
</template>

<script>

  import {mapActions, mapState} from 'vuex'

	export default ({
		data() {
			return {
			  fullName: '',
        email: '',
        password: '',
        submitted: false,
			}
		},
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},

    computed: {
		  ...mapState('auth', ['status'])
    },

    created () {
      // reset login status
      this.logout();
    },

		methods: {

		  ...mapActions('auth', ['register', 'logout']),
			// Handles input validation after submission.
			handleSubmit() {
				const { fullName, email, password } = this;
				if(fullName && email && password){
				  this.register({fullName, email, password});
        }
			},
		},
	})

</script>

<style lang="scss">
</style>
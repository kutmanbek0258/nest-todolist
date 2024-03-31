<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create person</h1>
        <h5 class="font-regular text-muted">create person</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-5" label="full name" :colon="false">
            <a-input
                v-decorator="[
						'fullName',
						{ rules: [{ required: true, message: 'Please input posting note' }] },
						]"
                type="text"
                placeholder="full name"
                v-model="fullName"/>
          </a-form-item>

          <a-form-item class="mb-5" label="phone" :colon="false">
            <a-input
                v-decorator="[
						'phone',
						{ rules: [{ required: true, message: 'Please input posting note' }] },
						]"
                type="text"
                placeholder="phone"
                v-model="phone"/>
          </a-form-item>

          <a-form-item class="mb-5" label="email" :colon="false">
            <a-input
                v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input posting note' }] },
						]"
                type="text"
                placeholder="email"
                v-model="email"/>
          </a-form-item>

          <a-form-item class="mb-5" label="address" :colon="false">
            <a-input
                v-decorator="[
						'address',
						{ rules: [{ required: true, message: 'Please input posting note' }] },
						]"
                type="text"
                placeholder="address"
                v-model="address"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              Create person
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to persons <router-link to="/references/person" class="font-bold text-dark">
          back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('auth', ['user']),
      ...mapState('person', ['person']),
    },

		data() {
      return {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        visible: false,
      }
		},

    methods: {
      ...mapActions('person', ['createPerson']),
      handleSubmit() {
        const {
            fullName,
            phone,
            email,
            address,
        } = this;
        if (fullName && phone && email && address) {
          this.createPerson({ fullName, phone, email, address, });
        }
      },

    },
	})

</script>

<style lang="scss">
</style>
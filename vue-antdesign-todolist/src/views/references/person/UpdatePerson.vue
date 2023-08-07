<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Update product</h1>
        <h5 class="font-regular text-muted">Update product</h5>

        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Name" :colon="false">
            <a-input
                v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input product name!' }] },
						]"
                placeholder="Name"
                type="text"
                v-model="person.full_name"
            />
          </a-form-item>

          <a-form-item>
            <a-form-item class="mb-5" label="email" :colon="false">
              <a-input
                  v-decorator="[
						'system_code',
						{ rules: [{ required: true, message: 'Please input product system code' }] },
						]"
                  type="email"
                  placeholder="email"
                  v-model="person.email"
              />
            </a-form-item>

            <a-form-item class="mb-5" label="phone" :colon="false">
              <a-input
                  v-decorator="[
						'manufacturer',
						{ rules: [{ required: true, message: 'Please input product manufacturer' }] },
						]"
                  type="phone"
                  placeholder="phone"
                  v-model="person.phone"
              />
            </a-form-item>

            <a-form-item class="mb-5" label="address" :colon="false">
              <a-input
                  v-decorator="[
						'barcode',
						{ rules: [{ required: true, message: 'Please input product Description' }] },
						]"
                  type="text"
                  placeholder="address"
                  v-model="person.address"/>
            </a-form-item>

            <a-button type="primary" block html-type="submit" class="login-form-button">
              EDIT PRODUCT
            </a-button>
          </a-form-item>
        </a-form>

        <p class="font-semibold text-muted">Back to products <router-link to="/references/company" class="font-bold text-dark">back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('person', ['person'])
    },

		data() {
      return {
        id: '',
      }
		},

    created(){
      this.id = this.$route.params.id;
      this.getPersonById({"id":this.id});
    },

    methods: {
      ...mapActions('person', ['getPersonById','updatePerson']),

      handleSubmit() {
        const id = this.id;
        const {
            full_name,
            address,
            phone,
            email
        } = this.person;
        if (id && full_name && address && phone && email) {
          this.updatePerson({ id, fullName: full_name, phone, email, address});
        }
      },
    },
	})

</script>

<style lang="scss">
</style>
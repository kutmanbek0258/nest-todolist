<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create product-group</h1>
        <h5 class="font-regular text-muted">create product-group</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-5" label="name" :colon="false">
            <a-input
                v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input name' }] },
						]"
                type="text"
                placeholder="name"
                v-model="name"/>
          </a-form-item>

          <a-form-item class="mb-5" label="description" :colon="false">
            <a-input
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input description' }] },
						]"
                type="text"
                placeholder="description"
                v-model="description"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              Create product-group
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to groups <router-link to="/references/product-group" class="font-bold text-dark">
          back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('productGroup', ['productGroup']),
    },

		data() {
      return {
        name: '',
        description: '',
      }
		},

    methods: {
      ...mapActions('productGroup', ['createProductGroup']),
      handleSubmit() {
        const {
            name,
            description,
        } = this;
        if (name && description) {
          this.createProductGroup({ name, description });
        }
      },

    },
	})

</script>

<style lang="scss">
</style>
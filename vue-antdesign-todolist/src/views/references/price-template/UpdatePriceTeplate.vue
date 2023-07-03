<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Update product group</h1>
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
                v-model="productGroup.name"
            />
          </a-form-item>

          <a-form-item>


            <a-form-item class="mb-5" label="description" :colon="false">
              <a-input
                  v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input product Description' }] },
						]"
                  type="text"
                  placeholder="description"
                  v-model="productGroup.description"/>
            </a-form-item>

            <a-button type="primary" block html-type="submit" class="login-form-button">
              EDIT PRODUCT GROUP
            </a-button>
          </a-form-item>
        </a-form>

        <p class="font-semibold text-muted">Back to groups <router-link to="/references/product-group" class="font-bold text-dark">back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('productGroup', ['productGroup'])
    },

		data() {
      return {
        id: '',
      }
		},

    created(){
      this.id = this.$route.params.id;
      this.getProductGroupById({"id":this.id});
    },

    methods: {
      ...mapActions('productGroup', ['getProductGroupById','updateProductGroup']),

      handleSubmit() {
        const id = this.id;
        const {
            name,
            description,
        } = this.productGroup;
        if (id && name && description) {
          this.updateProductGroup({ id, name, description});
        }
      },
    },
	})

</script>

<style lang="scss">
</style>
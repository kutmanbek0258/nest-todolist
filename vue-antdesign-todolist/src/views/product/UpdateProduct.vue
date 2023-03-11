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
                v-model="product.name"
            />
          </a-form-item>
          <a-form-item class="mb-5" label="Description" :colon="false">
            <a-textarea
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input product Description' }] },
						]"
                type="text"
                placeholder="Description"
                v-model="product.description"/>
          </a-form-item>
          <a-form-item class="mb-5" label="Barcode" :colon="false">
            <a-input
                v-decorator="[
						'barcode',
						{ rules: [{ required: true, message: 'Please input product Description' }] },
						]"
                type="text"
                placeholder="Barcode"
                v-model="product.barcode"/>
          </a-form-item>
          <a-form-item>
            <a-form-item class="mb-5" label="System code" :colon="false">
              <a-input
                  v-decorator="[
						'system_code',
						{ rules: [{ required: true, message: 'Please input product system code' }] },
						]"
                  type="text"
                  placeholder="System code"
                  v-model="product.system_code"
              />
            </a-form-item>
            <a-form-item class="mb-5" label="Manufacturer" :colon="false">
              <a-input
                  v-decorator="[
						'manufacturer',
						{ rules: [{ required: true, message: 'Please input product manufacturer' }] },
						]"
                  type="text"
                  placeholder="Manufacturer"
                  v-model="product.manufacturer"
              />
            </a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              EDIT PRODUCT
            </a-button>
          </a-form-item>
        </a-form>

        <p class="font-semibold text-muted">Back to products <router-link to="/products" class="font-bold text-dark">back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('product', ['product'])
    },

		data() {
      return {
        id: '',
      }
		},

    created(){
      this.id = this.$route.params.id;
      this.getProductById({"id":this.id});
    },

    methods: {
      ...mapActions('product', ['getProductById','updateProduct']),

      handleSubmit() {
        const id = this.id;
        const {
            name,
            description,
            barcode,
            system_code,
            manufacturer
        } = this.product;
        if (id && name && description && barcode && system_code && manufacturer) {
          this.updateProduct({ id, name, description, barcode, system_code, manufacturer});
        }
      },
    },
	})

</script>

<style lang="scss">
</style>
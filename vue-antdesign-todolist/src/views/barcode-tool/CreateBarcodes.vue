<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Generate barcodes</h1>
        <h5 class="font-regular text-muted">Barcode generation tool</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-5" label="Prefix" :colon="false">
            <a-input
                v-decorator="[
						'prefix',
						{ rules: [{ required: true, message: 'Please input product quantity' }] },
						]"
                type="text"
                placeholder="Prefix"
                v-model="prefix"/>
          </a-form-item>
          <a-form-item class="mb-5" label="Start number" :colon="false">
            <a-input
                v-decorator="[
						'startNumber',
						{ rules: [{ required: true, message: 'Please input product cell number' }] },
						]"
                type="number"
                placeholder="Start number"
                v-model="startNumber"/>
          </a-form-item>
          <a-form-item class="mb-5" label="End number" :colon="false">
            <a-input
                v-decorator="[
						'endNumber',
						{ rules: [{ required: true, message: 'Please input product cell number' }] },
						]"
                type="number"
                placeholder="End number"
                v-model="endNumber"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              GENERATE BARCODES
            </a-button>
          </a-form-item>
        </a-form>

        <li v-for="item in barcodes" :key="item.text">
          <img :title="`${item.text}`" :src="`${item.barcode}`" />
        </li>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to products <router-link to="/postings" class="font-bold text-dark">back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

 import jsBarcode from 'jsbarcode';

	export default ({

    computed: {
    },

		data() {
      return {
        // Binded model property for "Sign In Form" switch button for "Remember Me" .
        productName: 'SELECT PRODUCT',
        prefix: 'A',
        startNumber: 1,
        endNumber: 10,
        barcodes: [],
        barcodesPng: [],
      }
		},

    created(){

    },

    components: {
    },

    methods: {

      textToBase64Barcode(text){
        const canvas = document.createElement("canvas");
        jsBarcode(canvas, text, {format: "CODE39"});
        return canvas.toDataURL("image/png");
      },

      handleSubmit() {
        const {
            prefix,
            startNumber,
            endNumber,
        } = this;
        if (prefix && startNumber && endNumber) {
          for (let i = startNumber; i <= endNumber; i++) {
            const text = prefix + i;
            const barcode = this.textToBase64Barcode(text);
            this.barcodes.push({text, barcode});
          }
        }
      },

    },
	})

</script>

<style lang="scss">
</style>
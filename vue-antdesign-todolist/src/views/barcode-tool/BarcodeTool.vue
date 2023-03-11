<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">


      <a-col>

        <img title="`${}`" :src="`${barcode}`" />

        <li v-for="item in barcodesPng" :key="item">
          <img title="`${}`" :src="`${item}`" />
<!--          <barcode v-bind:value="item" v-bind:line-color="'#040'">-->
<!--            Show this if the rendering fails.-->
<!--          </barcode>-->
        </li>

        <p class="font-semibold text-muted">Back to products <router-link to="/receipts" class="font-bold text-dark">back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import jsBarcode from 'jsbarcode';
  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {

    },

		data() {
      return {
        // Binded model property for "Sign In Form" switch button for "Remember Me" .
        productName: 'SELECT PRODUCT',
        quantity: '',
        cell_number: '',
        visible: false,
        barcodeValue: 'test',
        barcodesPng: [],
      }
		},

    created(){
      for (let i = 1; i <= 100; i++) {
        const barcodeItem = textToBase64Barcode('A' + i);
        this.barcodesPng.push(barcodeItem);
      }

      this.barcode = textToBase64Barcode("A21")

      function textToBase64Barcode(text){
        const canvas = document.createElement("canvas");
        jsBarcode(canvas, text, {format: "CODE39"});
        return canvas.toDataURL("image/png");
      }
    },

    components: {
    },

    methods: {
      ...mapActions('receipt', ['createReceipt']),
      ...mapActions('product', ['getAllProducts']),
    },
	})

</script>

<style lang="scss">
</style>
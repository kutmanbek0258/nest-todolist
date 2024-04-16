<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div class="container">
    <h4 class="mb-15">update receipt</h4>

    <!-- Sign In Form -->
    <div class="box1">

      <div class="box1-rows">
        <div class="row1">
          <h6>SUPPLIER</h6>
        </div>
        <div class="row2">
          <a-button type="primary" @click="showModalShop">SELECT SHOP</a-button>
          <div>
            <div>
              old:
              {{ this.price.shopname }}
            </div>
            <div>
              new:
              {{ this.selectedShop.name }}
            </div>
          </div>
        </div>
      </div>

    </div>

    <CardPriceItemTable
        :priceID="id"
    >
    </CardPriceItemTable>

    <a-button type="primary" @click="handleSubmit" class="submit">
      UPDATE PRICE
    </a-button>
    <!-- / Sign In Form -->

    <p class="font-semibold text-muted">Back to groups <router-link to="/references/product-group" class="font-bold text-dark">
      back</router-link></p>

    <a-modal v-model:visible="dialogVisibleShop"
             title="Select shop"
             @ok="handleOkShop"
             @cancel="handleOkShop"
             @close="handleOkShop">
      <CardShopTableDialog/>
    </a-modal>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardShopTableDialog from "../../../components/Cards/CardShopTableDialog";
  import CardPriceItemTable from "../../../components/Cards/CardPriceItemTable";

	export default ({

    computed: {
      ...mapState('price', ['price']),
      ...mapState('shop', ['shop', 'selectedShop', 'dialogVisibleShop']),
      ...mapState('product', ['product', 'selectedProduct', 'dialogVisibleProduct'])
    },

    components: {
      CardShopTableDialog,
      CardPriceItemTable
    },

		data() {
      return {
        name: '',
        description: '',
        barcode: '',
      }
		},

    created() {
      this.id = this.$route.params.id;
      this.getPriceById({priceID: this.id});
    },

    methods: {
      ...mapActions('price', ['getPriceById', 'updatePrice']),
      ...mapActions('shop', ['setDialogVisibilityShop', 'handleSelectShop']),

      handleSubmit() {
        const shopID = (this.selectedShop.id) ? this.selectedShop.id : this.price.shopid;
        if (shopID) {
          this.updatePrice({priceID: this.id, shopID});
        }
      },

      showModalShop(){
        const visibility = true;
        this.setDialogVisibilityShop({visibility});
      },

      handleOkShop(){
        const visibility = false;
        this.setDialogVisibilityShop({visibility});
      },

    },
	})

</script>

<style lang="scss">

  .container {
    display: grid;
    grid-row-gap: 1em;
    grid-column-gap: 1em;
  }

  .box1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .box1-rows {
    border: 1px solid black;
    border-radius: 1em;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    margin: 3px;
    padding: 1em;
    grid-row-gap: 1em;
    grid-column-gap: 1em;
  }

  .row1 {
    grid-row-start: 1;
    grid-row-end: 2;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    place-items: center;
    grid-row-gap: 1em;
    grid-column-gap: 1em;
  }

  .row2 {
    grid-row-start: 2;
    grid-row-end: 3;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
  }
</style>
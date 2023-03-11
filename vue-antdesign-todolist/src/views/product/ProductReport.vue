<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row :gutter="24" type="flex">

      <a-col :span="24" class="mb-24">
        <h1 class="mb-15">{{ $t('product_report.title') }}</h1>

        <div>
          <div>
            <h3>{{ product.name }}</h3>
          </div>
        </div>

        <div>
          <div>
            <div>{{ product.description }}</div>
          </div>
        </div>

        <div>
          <div>
            <div>{{ product.barcode }}</div>
          </div>
        </div>

        <div>
          <div>
            <div>{{ product.system_code }}</div>
          </div>
        </div>

        <div>
          <div>
            <div>{{ product.created_at }}</div>
          </div>
        </div>

        <div>
          <div>
            <div>{{ $t('product_report.receipts_total_amount') }}: {{ productReport.allReceiptsQuantity }}</div>
          </div>
          <div>
            <div>{{ $t('product_report.postings_total_amount') }}: {{ productReport.allPostingsQuantity }}</div>
          </div>
          <div>
            <div>{{ $t('product_report.final_quantity') }}: {{ productReport.finalQuantity }}</div>
          </div>
          <table>
            <tr>
              <td>
                <h5>{{ $t('product_report.quantity_in_cell') }}</h5>
                <li v-for="item in productReport.cellQuantity" :key="item.cell_number">
                  <div>Cell number: {{ item.cell_number }}</div>
                  <div>Quantity: {{ item.quantity }}</div>
                </li>
              </td>
              <td>
                <h5>{{ $t('product_report.receipts_history') }}</h5>
                <li v-for="item in productReport.allReceiptsQuantityResult" :key="item._id">
                  <div>Cell number: {{ item._id }}</div>
                  <div>Quantity: {{ item.quantity }}</div>
                </li>
              </td>
              <td>
                <h5>{{ $t('product_report.postings_history') }}</h5>
                <li v-for="item in productReport.allPostingsQuantityResult" :key="item._id">
                  <div>Cell number: {{ item._id }}</div>
                  <div>Quantity: {{ item.quantity }}</div>
                </li>
              </td>
            </tr>
          </table>
        </div>
      </a-col>

    </a-row>

    <p class="font-semibold text-muted">{{ $t('product_report.back_to_products')}} <router-link to="/products" class="font-bold text-dark">
      {{ $t('product_report.back') }}</router-link></p>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('product', ['product']),
      ...mapState('report', ['productReport']),
    },

		data() {
      return {
        id: '',
      }
		},

    created(){
      this.id = this.$route.params.id;
      this.getProductById({"id":this.id});
      this.productFullReport({'id':this.id});
    },

    methods: {
      ...mapActions('product', ['getProductById']),
      ...mapActions('report', ['productFullReport']),
    },
	})

</script>

<style lang="scss">

th, td {
  padding: 15px;
}

</style>
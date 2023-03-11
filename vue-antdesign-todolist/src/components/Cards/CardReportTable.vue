<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Products Table</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/create-product')">
              CREATE NEW PRODUCT
            </a-button>
          </a-radio-group>
        </a-col>
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="false">

			<template slot="product" slot-scope="product">
				<div class="table-avatar-info">
					<div class="avatar-info">
						<h6>{{ product.name }}</h6>
					</div>
				</div>
			</template>

			<template slot="totalAmount" slot-scope="totalAmount">
				<div class="author-info">
					<h6 class="m-0">{{ totalAmount }}</h6>
				</div>
			</template>

      <template slot="items" slot-scope="items">
        <div v-for="item in items">
          <div>Cell number: {{ item.cell_number }}</div>
          <div>Total amount: {{ item.totalAmount }}</div>
          <div>/</div>
        </div>
      </template>

      <template slot="prdtcVwBtn" slot-scope="row">
        <a-button v-on:click="openLink('/product-report/' + row._id)" :data-id="row._id"  class="btn-edit">
          Report
        </a-button>
      </template>

		</a-table>
	</a-card>
	<!-- / Authors Table Card -->

</template>

<script>

  import router from '../../router';

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			columns: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				authorsHeaderBtns: 'all',
      }
		},

    methods: {

      openLink(link){
        router.push(link);
      },
    },
	})

</script>
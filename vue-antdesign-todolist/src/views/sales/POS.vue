<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div class="container">
    <div class="box1">
      <div class="search-box">Search</div>
      <div class="product-list">
        <CardProductTableDialog/>
      </div>
    </div>
    <div class="box2">
      <div class="cart">
        cart
      </div>
      <div class="total-price">total price</div>
      <div class="hold-over">
        <a-button type="primary" block html-type="submit">
          HOLD OVER
        </a-button>
      </div>
      <div class="continue">
        <a-button type="primary" block html-type="submit">
          CONTINUE
        </a-button>
      </div>
      <div class="cancel">
        <a-button type="primary" block html-type="submit">
          CANCEL
        </a-button>
      </div>
      <div class="cash">
        <a-button type="primary" block html-type="submit">
          CASH
        </a-button>
      </div>
      <div class="non-cash">
        <a-button type="primary" block html-type="submit">
          NON CASH
        </a-button>
      </div>
    </div>

  </div>
</template>

<script>

import CardProductTableDialog from "../../components/Cards/CardProductTableDialog";

export default ({
  components: {
    CardProductTableDialog
  },
  data() {
    return {
      // Salary cards data
      // salaries,
    }
  },
})

</script>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: 200px;
    grid-column-gap: 1em;
  }
  .box1 {
    grid-column-start: 1;
    grid-column-end: 7;
    grid-row-start: 1;
    grid-row-end: 5;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(20, 1fr);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
  }

  .box2 {
    grid-column-start: 7;
    grid-column-end: 11;
    grid-row-start: 1;
    grid-row-end: 5;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(20, 1fr);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
  }

  .search-box {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 1;
  }

  .product-list {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 2;
    grid-row-end: 21;
  }

  .cart {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 14;
  }

  .total-price {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 14;
    grid-row-end: 16;
  }

  .hold-over {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 16;
    grid-row-end: 18;
  }

  .continue {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 16;
    grid-row-end: 18;
  }

  .cancel {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 16;
    grid-row-end: 18;
  }

  .cash {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 18;
    grid-row-end: 21;
  }

  .non-cash {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 18;
    grid-row-end: 21;
  }

  .product-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 100px;
  }
</style>
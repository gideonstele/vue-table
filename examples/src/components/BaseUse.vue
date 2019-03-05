<template>
  <div class="page">
    <vue-table :columns="columns" :data="data" border>
      <template slot="salePrice" slot-scope="row">
        {{'&yen;' + row.salePrice}}
      </template>
      <template slot="skuAttributes" slot-scope="row">
        <div v-for="value,key in row.skus" :key="key">
          {{key}}: {{value}}
        </div>
      </template>
      <template slot="sellerSkus" slot-scope="row">
        <div v-for="value,key in row.sellerSkus" :key="key">
          {{key}}: {{value}}
        </div>
      </template>
      <template slot="action" slot-scope="row">
        <button v-if='row.stateText === "Refused"' type='button' @click='goToDetailsPage(row)'>Edit</button>
      </template>
    </vue-table>
  </div>
</template>
<script>
import { getData } from '../mock/index'
export default {
  data () {
    return {
      columns: [
        {
          label: 'Product',
          field: 'title',
          // fixed: 'left',
          width: '20%',
          thStyle: 'text-align: center'
        },
        {
          label: 'Sale Price',
          field: 'salePrice',
          width: '10%',
          thStyle: 'text-align: center',
          customRender: {
            slot: 'salePrice'
          },
        },
        {
          label: 'Category',
          field: 'categories',
          width: '15%',
          thStyle: 'text-align: center'
        },
        {
          label: 'Sku Attribute',
          field: 'skus',
          width: '10%',
          thStyle: 'text-align: center',
          customRender: {
            slot: 'skuAttributes'
          },
          rowSpan: {
            attr: 'length'
          },
        },
        {
          label: 'Seller Skus',
          field: 'sellerSkus',
          width: '15%',
          thStyle: 'text-align: center',
          customRender: {
            slot: 'sellerSkus'
          },
        },
        {
          label: 'Listing Status',
          field: 'stateText',
          width: '10%',
          thStyle: 'text-align: center',
          align: 'center',
        },
        {
          label: 'Action',
          field: 'categoryId',
          // fixed: 'right',
          width: '10%',
          thStyle: 'text-align: center',
          align: 'center',
          customRender: {
            slot: 'action'
          }
        }
      ],
      data: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getData().then(result => {
        this.data = result.data.products
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

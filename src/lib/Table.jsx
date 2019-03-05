import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'

export default {
  name: 'vue-table',
  props: {
    border: {
      type: Boolean,
      default: false
    },
    fixHead: {
      type: Boolean,
      default: false
    },
    headHeight: {
      type: String,
      default: '32px'
    },
    tdHeight: {
      type: String,
      default: '32px'
    },
    rowCollapse: {
      type: Object,
      require: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    'THeader': TableHeader,
    'TBody': TableBody
  },
  computed: {
    tableScrollStyle () {
      return this.fixHead ? {
        overflow: 'auto',
        height: `${this.scrollHight}px`
      } : {}
    },
    headerStyle() {
      return this.fixHead ? {
        position: 'absolute',
        overflow: 'hidden',
        width: '100%'
      } : {}
    },
    bodyStyle() {
      return this.fixHead ? {
        paddingTop: `${this.headHeight}px`
      } : {}
    }
  },
  mounted() {
    this.setLeftFixWidth()
  },
  render(h) {
    return (
      <div class={['c-table', {
        'c-table__bordered': this.border
      }]}>
        <div class='c-table-fixed c-table-fixed__left' ref='leftFixedWrapper'>
          <div class={['c-table-content-header', {
            'c-table-header__fixed': this.fixHead
          }]}>
            <t-header columns={this.columns}></t-header>
          </div>
          <div class={['c-table-content-body', {
            'c-table-body__fixed': this.fixHead
          }]}>
            <t-body columns={this.columns} data={this.data} rowCollapse={this.rowCollapse}></t-body>
          </div>
        </div>
        <div class='c-table-scroll' ref='tableScrollWrapper'>
          <div class={['c-table-content-header', {
            'c-table-header__fixed': this.fixHead
          }]}>
            <t-header columns={this.columns} ref='mainHeaderTable'></t-header>
          </div>
          <div class={['c-table-content-body', {
            'c-table-body__fixed': this.fixHead
          }]}>
            <t-body columns={this.columns} data={this.data} rowCollapse={this.rowCollapse}></t-body>
          </div>
        </div>
        <div class='c-table-fixed c-table-fixed__right' ref='rightFixedWrapper'>
          <div class={['c-table-content-header', {
            'c-table-header__fixed': this.fixHead
          }]}>
            <t-header columns={this.columns}></t-header>
          </div>
          <div class={['c-table-content-body', {
            'c-table-body__fixed': this.fixHead
          }]}>
            <t-body columns={this.columns} data={this.data} rowCollapse={this.rowCollapse}></t-body>
          </div>
        </div>
      </div>
    )
  },
  methods: {
    setLeftFixWidth() {
      const lths = this.$refs.mainHeaderTable.getFixedElm('l')
      const rths = this.$refs.mainHeaderTable.getFixedElm('r')
      let lthsW = 0
      let rthsW = 0
      let w = this.$refs.tableScrollWrapper.offsetWidth
      const leftDivs = this.$refs.leftFixedWrapper.querySelectorAll('.c-table-content-header,.c-table-content-body')
      const rightDivs = this.$refs.rightFixedWrapper.querySelectorAll('.c-table-content-header,.c-table-content-body')
      leftDivs.forEach(div => { div.style.width = `${w}px` })
      rightDivs.forEach(div => { div.style.width = `${w}px` })
      lths.forEach(lth => { lthsW += lth.offsetWidth })
      rths.forEach(rth => { rthsW += rth.offsetWidth })
      this.$refs.leftFixedWrapper.style.width = `${lthsW}px`
      this.$refs.rightFixedWrapper.style.width = `${rthsW}px`
      this.$refs.rightFixedWrapper.scrollLeft = w
    }
  }
}

import './lib/styles/index.scss'
import Table from './lib/Table.jsx'

Table.install = function (Vue) {
  Vue.component(Table.name, Table)
}

if (typeof window === 'object' && window.Vue) {
  Table.install(window.Vue)
}

export default Table

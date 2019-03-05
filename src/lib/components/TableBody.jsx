import { gcds } from '../utils/gcds'

/**
 * @description 把带有rowspan的行分解为多个行
 * @returns {name: fieldName, value: fieldValue, rowSpan: number}
 */
const expandRow = (row, columns) => {
  const rowSpanFields = columns.reduce((acc, col) => {
    if (col.rowSpan) {
      acc.push({
        fieldName: col.field,
        length: typeof col.rowSpan === 'number' ? col.rowSpan : row[col.field][col.rowSpan.attr]
      })
    }
    return acc
  }, [])
  const gcdsNum = gcds(rowSpanFields.map(f => f.length))
  const rowSpanFieldsName = rowSpanFields.map(f => f.fieldName)
  rowSpanFields.forEach((rowSpanField, i) => {
    rowSpanField.rowSpan = gcdsNum / rowSpanField.length
  })
  const newRows = [{}]
  rowSpanFields.forEach(rowSpanField => {
    const field = row[rowSpanField.fieldName]
    field.forEach((fieldItem, index) => {
      newRows[index] = newRows[index] || {}
      newRows[index][rowSpanField.fieldName] = {
        name: rowSpanField.fieldName,
        value: fieldItem,
        rowSpan: rowSpanField.rowSpan
      }
    })
  })
  for (const key in row) {
    if (rowSpanFieldsName.indexOf(key) > -1) {
      continue
    }
    newRows[0][key] = {
      name: key,
      value: row[key],
      rowSpan: gcdsNum
    }
  }
  return newRows
}
const getRowData = (row) => {
  const data = {}
  for (const key in row) {
    data[key] = row[key].value
  }
  return data
}
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    rowCollapse: {
      type: Object,
      require: false
    }
  },
  render (h) {
    const rows = []
    this._l(this.data, row => {
      rows.push(...expandRow(row, this.columns))
    })
    return (
      <table class='c-tbody' cellspacing='0' cellpadding='0' border='0'>
        <colgroup>
          {
            this._l(this.columns, column => <col name={column.id} width={column.width} />)
          }
        </colgroup>
        <tbody>
          {
            this._l(rows, (row, $index) => (
              <tr>
                {
                  this._l(this.columns, (column, $j) => {
                    if (!row[column.field]) return null
                    const alignClassName = `align-${column.align || 'left'}`
                    let vdom
                    if (column.customRender && column.customRender.slot) {
                      const slotName = column.customRender.slot
                      const rowData = getRowData(row)
                      vdom = h(
                        'div',
                        {
                          attrs: {
                            class: 'cell'
                          }
                        },
                        this.$parent.$scopedSlots[slotName](rowData)
                      )
                    } else {
                      vdom = h('div', {
                        attrs: {
                          class: 'cell'
                        }
                      }, row[column.field].value)
                    }
                    return (
                      <td
                        class={[`td-row-${$index}-col-${$j}`, alignClassName, column.tdClassName, column.colClassName]}
                        style={column.tdStyle}
                        rowSpan={row[column.field].rowSpan}
                      >
                        {vdom}
                      </td>
                    )
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

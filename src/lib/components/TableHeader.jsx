export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getFixedElm(pos) {
      const elms = []
      for (const key in this.$refs) {
        if (key.indexOf('th_') !== 0) {
          continue
        }
        const th = this.$refs[key]
        const fixValue = th.getAttribute('data-fix')
        if (fixValue === pos) {
          elms.push(th)
        }
      }
      return elms
    }
  },
  render(h) {
    return (
      <table class='c-theader' cellspacing='0' cellpadding='0' border='0'>
        <colgroup>
          {
            this._l(this.columns, column => <col name={column.id} width={column.width} />)
          }
        </colgroup>
        <thead>
          <tr>
            {
              this._l(this.columns, (column, $index) => {
                const alignClassName = `align-${column.align || 'left'}`
                return (
                  <th
                    ref={'th_' + column.field}
                    data-field={column.field}
                    data-fix={
                      column.fixed === true || column.fixed === 'left'
                        ? 'l'
                        : column.fixed === 'right' ? 'r' : ''}
                    class={[
                      `th-col-${$index}`,
                      alignClassName,
                      column.thClassName,
                      column.colClassName
                    ]}
                    style={column.thStyle}>
                    {
                      h('div', {
                        class: 'cell',
                        domProps: {
                          innerHTML: column.label
                        }
                      })
                    }
                  </th>
                )
              })
            }
          </tr>
        </thead>
      </table>
    )
  }
}

# Vue Table

一个基于 Vue.js 的 Table 组件

## 介绍

#### 特点

 - 可以自定义每列的渲染
 - 可以定义跨行
 - 可以固定左右列

**待完成**

 - 排序
 - 过滤

## 安装和使用

```shell
npm install 
# or 
yarn add 
```

#### props

###### border

`type: Boolean`
`default: false`

单元格是否带边框样式

###### fixHead

`type: Boolean`
`default: false`

头部是否固定，不随滚动条滚动

###### headHeight

`type: String`
`default: 32px`

表头高度

###### tdHeight

`type: String`
`default: 32px`

单元格默认最大高度

###### columns

表格列设定

```typescript
interface ColumnProps {
  label: string;     // 标签名称
  field: string;     // 所要显示的字段名称(key)
  width?: string;    // 列宽度
  thStyle: string;   // 列的th元素需要自定义的style
  align: string;     // 列默认对齐方式 'left' | 'center' | 'right'，默认为 'left'
  fixed: string; // 是否需要固定显示，列固定显示，则表格横向滚动不会影响这列，可选值 'left' | 'right'
  customRender?: {   // 自定义此列的渲染
    slot: string;    // 对应插槽名称
  };
                     // 如果某个字段需要划分子行，可以使用此元素，它将实现自动跨行处理
                     // 每条数据最好只有一个字段需要跨行，否则可能出现布局问题。如有类似需求，请使用customRender属性自己遍历
  rowSpan? {         
    attr: string;    // 划分子行的属性名，一般情况下该字段为数组，而此值则为length
  };

};

type columns = Array<ColumnProps>
```

###### data

数据信息

```typescript
export interface Data<T> {
  [key: number | string]: any;
}
type columns = Array<Data<T>>
```
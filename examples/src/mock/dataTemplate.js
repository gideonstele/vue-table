export const tableData = {
  'products|10-10': [
    {
      'id': '@guid',
      'title': '@word(3,10)',
      'categories': '@cword(6, 10) > @cword(6, 10) > @cword(6, 10)',
      'categoryId': '@guid',
      'salePrice|1-100.1-10': 1.0,
      'sellerSkus|1-5': ['@upper(@word)'],
      'skus|1-4': [
        {
          'Size|1': ['X-Large', 'Large', 'Medium', 'Small']
        }
      ],
      'stateText|1': ['Refused', 'Pending']
    }
  ]
}

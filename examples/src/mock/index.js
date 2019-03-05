import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import mockjs from 'mockjs'
import { tableData } from './dataTemplate'

const mock = new MockAdapter(axios)

mock.onGet('api/data').reply(200, mockjs.mock(tableData))

export const getData = () => {
  return axios.get('api/data')
}

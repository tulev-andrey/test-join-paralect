import { Item } from '../types'

export const defaultItem: Item = {
  _id: null,
  key: Date.now().toString(),
  company: '',
  vacancy: '',
  fork: {
    min: null,
    max: null
  },
  status: false,
  note: ''
}

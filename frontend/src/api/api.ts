import axios, { AxiosInstance } from 'axios'
import { Item } from '../types'

export default class Api {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_API_URL
    })
  }

  async getData() {
    return await this.instance.get('/data')
  }

  async saveData(data: Item) {
    return await this.instance.post('/data', { data })
  }

  async updateData(data: Item) {
    return await this.instance.put('/data', { data })
  }

  async deleteData(data: Item) {
    return await this.instance.delete('/data', { data })
  }
}

import axios, { AxiosInstance } from 'axios'
import { Item } from '../types'

export default class Api {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://45.132.1.221/api'
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

import * as React from 'react'

export interface Item {
  _id: React.Key | null
  key: string
  company: string
  vacancy: string
  fork: ForkType
  status: boolean
  note: string
}

export interface ForkType {
  min: number | null
  max: number | null
}

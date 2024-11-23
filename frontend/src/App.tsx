import { Table, Button } from 'antd'
import { defaultItem } from './constants'
import styles from './App.module.css'
import { Action } from './components/Action/Action.tsx'
import { useEffect, useState } from 'react'
import { ForkType, Item } from './types'
import Api from './api/api.ts'
import { Fork } from './components/Fork/Fork.tsx'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Column } = Table

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState(defaultItem)
  const [data, setData] = useState<Item[]>([])

  const api = new Api()

  const handleOpen = (item: Item) => {
    setItem(item)
    setIsOpen(true)
  }

  const getData = async () => {
    const response = await api.getData()
    setData(response.data.map((item: Item) => ({ ...item, key: item._id })))
  }

  useEffect(() => {
    getData().then()
  }, [])

  const submit = async (save: Item) => {
    setIsOpen(false)
    console.log({ save })
    if (save._id) {
      setData(prev =>
        prev.map(p => {
          if (save._id === p._id) return save
          return p
        })
      )
      await api.updateData(save)
    } else {
      setData(prev => [...prev, save])
      await api.saveData(save)
    }
    await getData()
  }

  const handleDelete = async (item: Item) => {
    await api.deleteData(item)
    await getData()
  }

  const close = () => setIsOpen(false)

  return (
    <>
      <Table<Item> dataSource={data} pagination={false} key="table">
        <Column title="Компания" dataIndex="company" key="company" align="center" />
        <Column title="Вакансия" dataIndex="vacancy" key="vacancy" align="center" />
        <Column
          title="Зарплатная вилка"
          dataIndex="fork"
          key="fork"
          align="center"
          render={(text: ForkType) => <Fork text={text} />}
        />
        <Column
          title="Статус отклика"
          dataIndex="status"
          key="status"
          align="center"
          render={(text: boolean) => <p>{text ? 'Просмотрено' : 'Не просмотрено'}</p>}
        />
        <Column title="Заметка" dataIndex="note" key="note" align="center" />
        <Column
          title="Действия"
          dataIndex="actions"
          key="actions"
          align="center"
          render={(_text, record: Item) => (
            <>
              <Button onClick={() => handleOpen(record)}>
                <EditOutlined />
              </Button>
              <Button onClick={() => handleDelete(record)}>
                <DeleteOutlined />
              </Button>
            </>
          )}
        />
      </Table>
      <Button className={styles.button} type="primary" onClick={() => handleOpen(defaultItem)}>
        +
      </Button>
      <Action isOpen={isOpen} close={close} item={item} submit={submit} />
    </>
  )
}

export default App

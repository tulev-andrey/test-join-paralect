import { Modal, Form, Input, Checkbox, InputNumber, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Item } from '../../types'
import styles from './Action.module.css'

export function Action({
  isOpen,
  close,
  item,
  submit
}: {
  isOpen: boolean
  close: () => void
  item: Item
  submit: (save: Item) => Promise<void>
}) {
  const [form, setForm] = useState(item)

  useEffect(() => {
    setForm(item)
  }, [item])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) =>
    setForm({ ...form, [key]: event.target.value })

  const handleFork = (price: number | null, type: 'min' | 'max') => {
    if (price) setForm({ ...form, fork: { ...form.fork, [type]: price } })
  }

  return (
    <Modal
      open={isOpen}
      footer={
        <Button type="primary" onClick={() => submit(form)}>
          Сохранить
        </Button>
      }
      onCancel={close}
      title="Редактирование откликов"
      destroyOnClose={true}
    >
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Компания">
          <Input onChange={e => handleChange(e, 'company')} value={form.company} />
        </Form.Item>
        <Form.Item label="Вакансия">
          <Input onChange={e => handleChange(e, 'vacancy')} value={form.vacancy} />
        </Form.Item>
        <Form.Item label="Зарплатная вилка">
          <div className={styles.fork}>от: </div>
          <InputNumber onChange={price => handleFork(price, 'min')} value={form.fork.min} />
          <div className={styles.fork}>до: </div>
          <InputNumber onChange={price => handleFork(price, 'max')} value={form.fork.max} />
        </Form.Item>
        <Form.Item label="Статус отклика">
          <Checkbox checked={form.status} onClick={() => setForm({ ...form, status: !form.status })} />
        </Form.Item>
        <Form.Item label="Заметка">
          <Input onChange={e => handleChange(e, 'note')} value={form.note} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

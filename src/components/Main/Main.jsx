import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import Buttons from '../Buttons/Buttons'
import Ticket from '../Ticket/Ticket'
import { ticketsLoad } from '../Redux/ticketsSlice'

import classes from './Main.module.scss'

export default function Main() {
  const tickets = useSelector((state) => {
    return state.ticketsSlice.tickets
  })
  let { loading, error } = useSelector((state) => {
    return state.ticketsSlice
  })
  const checkboxes = useSelector((state) => state.checkboxSlice)

  const dispatch = useDispatch()

  const [showTickets, setShowTickets] = useState(5)

  let ticketsFiltered = tickets.filter((el) => {
    if (checkboxes['Все']) return el
    if (checkboxes['Без пересадок'] && !el.segments[0].stops.length && !el.segments[1].stops.length) return el
    if (checkboxes['1 пересадка'] && el.segments[0].stops.length === 1 && el.segments[1].stops.length === 1) return el
    if (checkboxes['2 пересадки'] && el.segments[0].stops.length === 2 && el.segments[1].stops.length === 2) return el
    if (checkboxes['3 пересадки'] && el.segments[0].stops.length === 3 && el.segments[1].stops.length === 3) return el
  })
  if (!ticketsFiltered.length && !error.length) error = 'Рейсов, подходящих под заданные фильтры, не найдено...'
  ticketsFiltered.length = showTickets

  const clickShowMore = () => {
    setShowTickets(showTickets + 5)
  }

  useEffect(() => {
    dispatch(ticketsLoad())
  }, [])

  return (
    <main className={classes.main}>
      <Buttons />
      {loading && <Spin style={{ marginTop: 30 }} indicator={<LoadingOutlined style={{ fontSize: 200 }} spin />} />}
      {Boolean(!error) &&
        ticketsFiltered.map((el, i) => {
          return <Ticket key={i} ticket={el} />
        })}
      {Boolean(error) && !loading && <span className={classes.error}>{error}</span>}
      {!!ticketsFiltered.length && Boolean(!error) && (
        <button className={classes['button']} onClick={clickShowMore}>
          ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ
        </button>
      )}
    </main>
  )
}

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { checkedUpdate } from '../Redux/checkboxSlice'

import classes from './Aside.module.scss'

export default function Aside() {
  const checkboxArray = useSelector((state) => state.checkboxSlice)
  const dispatch = useDispatch()

  const handleChange = (key) => {
    if (key === 'Все') dispatch(checkedUpdate({ type: 'CHECK_ALL' }))
    if (key === '1 пересадка' || key === '2 пересадки' || key === '3 пересадки' || key === 'Без пересадок') {
      dispatch(checkedUpdate({ type: 'CHECK', key }))
    }
  }
  useEffect(() => {
    if (!Object.values(checkboxArray).slice(1).includes(false) && !checkboxArray['Все'])
      dispatch(checkedUpdate({ type: 'CHECK_FOUR' }))
  }, [checkboxArray])

  return (
    <aside className={classes.aside}>
      <span className={classes['aside__title']}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      {Object.entries(checkboxArray).map((el, i) => {
        return (
          <label key={i} className={classes['aside__label']}>
            <input type="checkbox" onChange={() => handleChange(el[0])} checked={el[1]}></input>
            <span className={classes['aside__label-checkbox']}></span>
            {el[0]}
          </label>
        )
      })}
    </aside>
  )
}

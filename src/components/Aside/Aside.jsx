import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { checkedUpdate } from '../Redux/action'

import classes from './Aside.module.scss'

export default function Aside() {
  const checkboxArray = useSelector((state) => state.checkboxReducer)
  const dispatch = useDispatch()

  const handleChange = (key) => {
    if (key === 'Все') dispatch(checkedUpdate('CHECK_ALL', key))
    if (key === '1 пересадка' || key === '2 пересадки' || key === '3 пересадки' || key === 'Без пересадок') {
      dispatch(checkedUpdate('CHECK', key))
    }
  }
  useEffect(() => {
    if (!Object.values(checkboxArray).slice(1).includes(false) && !checkboxArray['Все'])
      dispatch(checkedUpdate('CHECK_FOUR'))
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

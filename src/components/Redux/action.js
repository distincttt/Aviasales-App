export const checkedUpdate = (type, key) => ({ type, key })

export function ticketsLoad() {
  return async (dispatch) => {
    dispatch(loaderOn())
    try {
      const searchId = await fetch('https://aviasales-test-api.kata.academy/search')
      const jsonSearchId = await searchId.json()
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${jsonSearchId.searchId}`)
      const jsonResponse = await response.json()
      dispatch(ticketsSave(jsonResponse.tickets))
      if (!jsonResponse.stop) dispatch(ticketsLoad())
    } catch (error) {
      dispatch(loaderOff())
      dispatch(errorOn(`${error.message}, please wait...`))
    }
  }
}
export const ticketsSave = (tickets) => ({ type: 'TICKETS_LOAD', data: tickets })
export const ticketsSort = (tickets) => ({ type: 'TICKETS_SORT', data: tickets })

export const loaderOn = () => ({ type: 'LOADER_ON' })
export const loaderOff = () => ({ type: 'LOADER_OFF' })

export function errorOn(text) {
  return (dispatch) => {
    dispatch({ type: 'ERROR_ON', text })
    setTimeout(() => {
      dispatch(errorOff())
    }, 3000)
  }
}
export const errorOff = () => ({ type: 'ERROR_OFF' })

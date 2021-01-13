import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducer"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    combineReducers(reducer),
  {
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    departStation: null,
    arriveStation: null,
    trainNumber: null,
    durationStr: null,
    tickets: [],
    isScheduleVisible: false,
    searchParsed: false,
  },
  composeEnhancers(applyMiddleware(thunk))
)

export default store
// export default createStore(
//     combineReducers(reducer),

//     applyMiddleware(thunk)
// )

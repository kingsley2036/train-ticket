import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducer"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    combineReducers(reducer),
  {
    trainNumber: null,
    departStation: null,
    arriveStation: null,
    seatType: null,
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    durationStr: null,
    price: null,
    passengers: [],
    menu: null,
    isMenuVisible: false,
    searchParsed: false,
  },
  composeEnhancers(applyMiddleware(thunk))
)

export default store


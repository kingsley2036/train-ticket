import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import React, { useCallback, useMemo } from "react"
import Header from "../common/Header.jsx"
import DepartDate from "./DepartDate.jsx"
import HighSpeed from "./HighSpeed.jsx"
import Journey from "./Journey.jsx"
import Submit from "./Submit.jsx"
import CitySelector from "../common/CitySelector.jsx"
import DateSelector from "../common/DateSelector.jsx"
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed

} from "./actions"
import "./App.css"
import { h0 } from '../common/fp';
function App(props) {
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible,
    highSpeed
  } = props
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch
    )
  }, [dispatch])
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity,
      },
      dispatch
    )
  }, [dispatch])
  const departDateCbs = useMemo(() => {
    return bindActionCreators(
        {
            onClick: showDateSelector,
        },
        dispatch
    );
}, [dispatch]);
const DateSelectorCbs= useMemo(() => {
  return bindActionCreators(
      {
          onBack: hideDateSelector
      },
      dispatch
  );
}, [dispatch]);
const onSelectDate=useCallback(
  (day) => {
    if(!day){
      return
    }
    if(day<h0){
      return
    }
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  },
  [dispatch],
)
const HighSpeedCbs= useMemo(() => {
  return bindActionCreators(
      {
          toggle: toggleHighSpeed
      },
      dispatch
  );
}, [dispatch]);

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form className="form" action="./query.html">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate {...departDateCbs} time={departDate} />
        <HighSpeed highSpeed={highSpeed} {...HighSpeedCbs}/>
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector show={isDateSelectorVisible} {...DateSelectorCbs}  onSelect={onSelectDate}/>
    </div>
  )
}
function mapStateToProps(state) {
  return state
}
function mapDispatchToProps(dispatch) {
  return { dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

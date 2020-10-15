import { connect } from "react-redux"
import React from "react"
import "./App.css"
import Header from "../common/Header.jsx"
import DepartDate from "./DepartDate.jsx"
import HighSpeed from "./HighSpeed.jsx"
import Journey from "./Journey.jsx"
import Submit from "./Submit.jsx"

function App() {
  return (
    <div>
      <Header />
      <Journey />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}
function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

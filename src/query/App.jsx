import {connect} from "react-redux"
import React from 'react';
import "./App.css"
import Nav from '../common/Nav.jsx';
import List from './List.jsx';
import Bottom from './Bottom.jsx';

function App() {
  return (
    <div>
      <Nav></Nav>
      <List></List>
      <Bottom></Bottom>
    </div>
  )
 
}
function mapStateToProps(state){
  return state

}
function mapDispatchToProps(dispatch){
return {dispatch}
}
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import React, { Component } from 'react'
import './App.css'

import Header from './component/Header'
import List from './component/List'

export default class App extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <List />
      </div>
    )
  }
}

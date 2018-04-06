import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Login from './components/Login.js';
import { Field, reduxForm } from 'redux-form';
import { StatusBar } from 'react-native'
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';
import { Container, View, Header } from 'native-base';
import Landing from './components/Landing.js';
import Home from './components/Home.js';
const store = createStore(allReducers);
export default class Application extends Component {
  render() {
    return (
      <Container>
        <Header style={{ height: 0, paddingTop: 0 }}>
          <StatusBar hidden={true} />
        </Header>
        <Router>
          <Stack key="root">
            <Scene titleStyle={{ alignSelf: 'center' }} key="home" component={Landing} title="" />
            <Scene titleStyle={{ alignSelf: 'center' }} key="login" component={Login} title="Login" />
            <Scene titleStyle={{ alignSelf: 'center' }} key="items" component={Home} title="Items" />
          </Stack>
        </Router>
      </Container>

      // <MainContainer/>
      // </Provider>
    )
  }
}
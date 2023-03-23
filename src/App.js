import './App.css';
import React from 'react';
import Nav from './components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { Component } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Suspense } from 'react';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);

const ProfileContainer = React.lazy(() =>
  import('./components/Profile/ProfileContainer')
);

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    } else
      return (
        <BrowserRouter>
          <div className="app_wrapper">
            <HeaderContainer />
            <Nav />
            <div className="app_wrapper_component">
              <Suspense
                fallback={
                  <div>
                    <Preloader />
                  </div>
                }
              >
                <Routes>
                  <Route
                    path="/profile/:profileId"
                    element={<ProfileContainer />}
                  />
                  <Route path="/dialogs/*" element={<DialogsContainer />} />
                  <Route path="/users" element={<UsersContainer />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </BrowserRouter>
      );
  }
}

const mapStateToProps = (state) => {
  return { initialized: state.app.initialized };
};

export default connect(mapStateToProps, { initializeApp })(App);

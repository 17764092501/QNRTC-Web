import * as React from 'react';
import Home from './pages/home';
import Room from './pages/room';
import LivePage from './pages/live';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';

import * as stores  from "./stores"
import './App.css';
import { createBrowserHistory } from 'history';
import Settings from './pages/settings';
import Layout from './layouts';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: '#34AADC',
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#34AADC',
      contrastText: '#FAFAFA',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

if(process.env.NODE_ENV === 'development') (window as any).__STORES__ = stores;

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider {...stores}>
        <Layout
          messageStore={stores.messageStore}
          menuStore={stores.menuStore}
        >
          <Router history={history}>
            <Switch>
              <Route
                path="/"
                exact
                component={Home}
              />
              <Route
                path="/roomtoken"
                component={Home}
                exact
              />
              <Route
                path="/room/:roomid?"
                component={Room}
              />
              <Route
                path="/live/:roomid"
                component={LivePage}
              />
              <Route
                path="/settings"
                component={Settings}
              />
              <Redirect to="/"/>
            </Switch>
          </Router>
        </Layout>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

import './App.css';
import 'fontsource-roboto';

import { AppBar, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { useRerender } from './hooks/useRerender';
import Daily from './views/Daily';
import { ExercisesList } from './views/Exercises/ExercisesList';

const queryClient = new QueryClient();

function App() {
  const rerender = useRerender();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <div className="App">
            <AppBar position="static">
              <Tabs value={window.location.pathname} onChange={rerender}>
                <Tab label="Daily" component={Link} to='/daily' value='/daily' />
                <Tab label="Monthly" component={Link} to='/monthly' value='/monthly' />
                <Tab label="Exercises" component={Link} to='/exercises' value='/exercises' />
                <Tab label="Routines" component={Link} to='/routines' value='/routines' />
                <Tab label="Settings" component={Link} to='/settings' value='/settings' />
              </Tabs>
            </AppBar>
            <Switch>
              <Route path='/daily'>
                <Daily />
              </Route>
              <Route path='/monthly'>
                Monthly
              </Route>
              <Route path='/exercises'>
                <ExercisesList />
              </Route>
              <Route path='/routines'>
                Routines
              </Route>
              <Route path='/settings'>
                Settings
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;

import './App.css';
import 'fontsource-roboto';

import { AppBar, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Daily from './views/Daily';
import { ExercisesTab } from './views/Exercises';
import { RoutinesTab } from './views/Routines';

const queryClient = new QueryClient();

function App() {
  const [currentTab, setCurrentTab] = useState('daily');
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <div className="App">
            <AppBar position="static">
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Daily" component={Link} to="/daily" value="daily" />
                <Tab label="Monthly" component={Link} to="/monthly" value="monthly" />
                <Tab label="Exercises" component={Link} to="/exercises" value="exercises" />
                <Tab label="Routines" component={Link} to="/routines" value="routines" />
                <Tab label="Settings" component={Link} to="/settings" value="settings" />
              </Tabs>
            </AppBar>
            <Switch>
              <Route path="/daily">
                <Daily />
              </Route>
              <Route path="/monthly">Monthly</Route>
              <Route path="/exercises">
                <ExercisesTab />
              </Route>
              <Route path="/routines">
                <RoutinesTab />
              </Route>
              <Route path="/settings">Settings</Route>
              <Route exact path="/">
                <Redirect to="/daily" />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;

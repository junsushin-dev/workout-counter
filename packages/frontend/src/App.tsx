import './App.css';
import 'fontsource-roboto';

import { AppBar, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import { TabPanel } from './common/TabPanel';
import Daily from './Daily';

const queryClient = new QueryClient();

function App() {

  const [currTab, setCurrTab] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setCurrTab(newValue);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className="App">
          <AppBar position="static">
            <Tabs value={currTab} onChange={handleChange}>
              <Tab label="Daily" />
              <Tab label="Monthly" />
              <Tab label="Exercises" />
              <Tab label="Routines" />
              <Tab label="Settings" />
            </Tabs>
          </AppBar>
          <TabPanel index={0} value={currTab}>
            <Daily />
          </TabPanel>
          <TabPanel index={1} value={currTab}>
            Monthly
          </TabPanel>
          <TabPanel index={2} value={currTab}>
            Exercise
          </TabPanel>
          <TabPanel index={3} value={currTab}>
            Routines
          </TabPanel>
          <TabPanel index={4} value={currTab}>
            Settings
          </TabPanel>
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;

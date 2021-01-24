import React, { useState, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';

import { AppBar, Tabs, Tab } from '@material-ui/core';
import Daily from './Daily';
import CenteredProgress from './common/CenteredProgress';

function App() {

  const [currTab, setCurrTab] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setCurrTab(newValue);
  }

  return (
    <RecoilRoot>
        <div className="App">
          <AppBar position="static">
            <Tabs value={currTab} onChange={handleChange}>
              <Tab label="Daily" />
              <Tab label="Monthly" />
              <Tab label="Routines" />
              <Tab label="Settings" />
            </Tabs>
          </AppBar>
          <Suspense fallback={<CenteredProgress />}>
            <Daily />
          </Suspense>
        </div>
    </RecoilRoot>
  );
}

export default App;

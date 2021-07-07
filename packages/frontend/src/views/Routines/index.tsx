import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { RoutineListPage } from './RoutineListPage';

export function RoutinesTab() {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <RoutineListPage />
      </Route>
      <Route path={`${path}/new`}>Add routines</Route>
    </>
  );
}

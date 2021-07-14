import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { AddRoutinePage } from './AddRoutinePage';
import { EditRoutinePage } from './EditRoutine/EditRoutinePage';
import { RoutineListPage } from './RoutineListPage';

export function RoutinesTab() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <RoutineListPage />
      </Route>
      <Route exact path={`${path}/new`}>
        <AddRoutinePage />
      </Route>
      <Route path={`${path}/:id`}>
        <EditRoutinePage />
      </Route>
    </Switch>
  );
}

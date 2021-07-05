import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

export function RoutinesTab() {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        Routines List
      </Route>
      <Route path={`${path}/new`}>Add routines</Route>
    </>
  );
}

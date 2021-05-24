import React from 'react';
import { Route, useRouteMatch } from "react-router-dom";

import { ExercisesList } from './ExercisesList';

export function ExercisesTab() {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <ExercisesList />
      </Route>
      <Route path={`${path}/new`}>
        Add Exercise
      </Route>
    </>
  )

}
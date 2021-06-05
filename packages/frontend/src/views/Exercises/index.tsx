import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { ExercisesForm } from './ExercisesForm';
import { ExercisesList } from './ExercisesList';

export function ExercisesTab() {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path}>
        <ExercisesList />
      </Route>
      <Route path={['/new', '/edit'].map((subPath) => path + subPath)}>
        <ExercisesForm />
      </Route>
    </>
  );
}

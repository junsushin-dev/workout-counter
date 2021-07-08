import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { FlexContainer } from '../common/FlexContainer';
import { RoutineList } from './RoutineList';

export function RoutineListPage() {
  const history = useHistory();

  const handleAddButtonClick = () => history.push('/routines/new');

  return (
    <FlexContainer>
      <FlexContainer padding={2}>
        <RoutineList />
      </FlexContainer>
      <Box padding={2} borderTop="1px solid rgba(224, 224, 224, 1)">
        <Button variant="contained" color="primary" onClick={handleAddButtonClick}>
          Add Routine
        </Button>
      </Box>
    </FlexContainer>
  );
}

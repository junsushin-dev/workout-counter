import { Box, Button } from '@material-ui/core';
import React from 'react';

import { FlexContainer } from '../common/FlexContainer';
import { RoutineList } from './RoutineList';

export function RoutineListPage() {
  return (
    <FlexContainer>
      <FlexContainer padding={2}>
        <RoutineList />
      </FlexContainer>
      <Box padding={2} borderTop="1px solid rgba(224, 224, 224, 1)">
        <Button variant="contained" color="primary" onClick={() => {}}>
          Add Routine
        </Button>
      </Box>
    </FlexContainer>
  );
}

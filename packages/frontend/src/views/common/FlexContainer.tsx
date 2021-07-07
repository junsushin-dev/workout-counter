import { Box, styled } from '@material-ui/core';

export const FlexContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflowY: 'scroll',
});

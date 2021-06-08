import { Box } from '@material-ui/core';
import React from 'react';

import { ERROR_MESSAGE } from '../../apis/constants';
import ErrorImage from '../../static/images/errorGuy.png';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <h2>{ERROR_MESSAGE}</h2>
      <Box p={2}>
        <img src={ErrorImage} alt="error" width="50%" />
      </Box>
      <span>{`Error: ${message}`}</span>
    </div>
  );
}

import React, { useState } from 'react';
import { Box, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Done as DoneIcon, DirectionsRun as InProgressIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  progressBar: {
    height: '30px',
  },
});

interface IProps {
  name: string;
  targetCount: number;
  offset: number;
}

function Workout(props: IProps) {
  const { name, targetCount, offset } = props;
  const classes = useStyles();
  const [doneCount, setDoneCount] = useState(0);
  const isFinished = doneCount === targetCount;

  const progressText = `${doneCount} / ${targetCount}`;

  const handleProgressBarClick = () => {
    if(doneCount >= targetCount) return;
    setDoneCount(prevCount => Math.min(prevCount + offset, targetCount));
  };

  return (
    <Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <Box display='flex' flexDirection='row'>
          <Typography>{name}</Typography>
          {isFinished ? <DoneIcon /> : <InProgressIcon />}
        </Box>
        <Typography>{progressText}</Typography>
      </Box>
      <LinearProgress className={classes.progressBar} value={doneCount / targetCount * 100} variant='determinate' onClick={handleProgressBarClick}/>
    </Box>
  )
}

export default Workout;
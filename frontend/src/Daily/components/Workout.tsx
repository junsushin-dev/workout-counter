import React, { useState } from 'react';
import { Box, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Done as DoneIcon, DirectionsRun as InProgressIcon } from '@material-ui/icons';
import { IWorkout } from '../types';
import { updateDoneCount } from '../services';

const useStyles = makeStyles({
  fadeInOutContainer: {
    animation: 'fadein 0.2s linear forwards',
  },
  progressBar: {
    height: '30px',
  },
});

interface IProps {
  date: Date;
  workout: IWorkout;
  offset: number;
}

function Workout(props: IProps) {
  const { date, workout, offset } = props;
  const { exercise: { name, count: targetCount }, done } = workout;
  const classes = useStyles();
  const [doneCount, setDoneCount] = useState(done);
  const isFinished = doneCount === targetCount;

  const progressText = `${doneCount} / ${targetCount}`;

  const handleProgressBarClick = () => {
    if(doneCount >= targetCount) return;
    const newCount = doneCount + offset;
    setDoneCount(Math.min(newCount, targetCount));
    updateDoneCount(date, name, newCount);
  };

  return (
    <Box className={classes.fadeInOutContainer}>
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
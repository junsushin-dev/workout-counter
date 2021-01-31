import React, { useState } from 'react';
import { Box, Typography, LinearProgress, styled } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Done as DoneIcon, 
  DirectionsRun as InProgressIcon,
  PlayArrow as ForwardIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
} from '@material-ui/icons';
import { IWorkout } from '../types';
import { updateDoneCount } from '../services';

const useStyles = makeStyles({
  fadeInOutContainer: {
    position: 'relative',
    animation: 'fadein 0.2s linear forwards',
  },
  headerBar: {
    paddingBottom: '4px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressBar: {
    height: '30px',
  },
  buttonBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '30px',
  },
  buttonsContainer: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const RewindIcon = styled(ForwardIcon)({
  transform: "rotate(-180deg)",
});

const FORWARD_OFFSET = 1;
const FAST_FORWARD_OFFSET = 5;
const REWIND_OFFSET = -1;
const FAST_REWIND_OFFSET = -5;

interface IProps {
  date: Date;
  workout: IWorkout;
}

function Workout(props: IProps) {
  const { date, workout } = props;
  const { exercise: { name, count: targetCount }, done } = workout;

  const classes = useStyles();
  const [doneCount, setDoneCount] = useState(done);
  const isFinished = doneCount === targetCount;

  const progressText = `${doneCount} / ${targetCount}`;

  const handleArrowClick = (offset: number) => {
    const newCount = Math.min(Math.max(0, doneCount + offset), targetCount);
    setDoneCount(newCount);
    updateDoneCount(date, name, newCount);
  };

  return (
    <Box className={classes.fadeInOutContainer}>
      <Box className={classes.headerBar}>
        <Box display='flex' flexDirection='row'>
          <Typography>{name}</Typography>
          {isFinished ? <DoneIcon /> : <InProgressIcon />}
        </Box>
        <Typography>{progressText}</Typography>
      </Box>
      <LinearProgress className={classes.progressBar} value={doneCount / targetCount * 100} variant='determinate'/>
      <Box className={classes.buttonBar}>
        <Box className={classes.buttonsContainer}>
          <FastRewindIcon onClick={() => handleArrowClick(FAST_REWIND_OFFSET)}/>
          <RewindIcon onClick={() => handleArrowClick(REWIND_OFFSET)}/>
        </Box>
        <Box className={classes.buttonsContainer}>
          <ForwardIcon onClick={() => handleArrowClick(FORWARD_OFFSET)}/>
          <FastForwardIcon onClick={() => handleArrowClick(FAST_FORWARD_OFFSET)}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Workout;
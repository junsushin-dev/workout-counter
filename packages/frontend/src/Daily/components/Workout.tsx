import { Box, LinearProgress, styled,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
  DirectionsRun as InProgressIcon,
  Done as DoneIcon, 
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
  PlayArrow as ForwardIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';

import { updateDoneCount } from '../../apis/workoutsAPI';
import { IWorkout } from '../../types';

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

function Workout({ date, workout }: IProps) {
  const { id, exercise: { name, count: targetCount }, doneCount: done } = workout;

  const classes = useStyles();
  const [doneCount, setDoneCount] = useState(done);
  const isFinished = doneCount === targetCount;

  const progressText = `${doneCount} / ${targetCount}`;

  const handleArrowClick = (offset: number) => {
    const newCount = Math.min(Math.max(0, doneCount + offset), targetCount);
    setDoneCount(newCount);
    updateDoneCount(id, date, newCount);
  };

  return (
    <div className={classes.fadeInOutContainer}>
      <div className={classes.headerBar}>
        <Box display='flex' flexDirection='row'>
          <Typography>{name}</Typography>
          {isFinished ? <DoneIcon /> : <InProgressIcon />}
        </Box>
        <Typography>{progressText}</Typography>
      </div>
      <LinearProgress className={classes.progressBar} value={doneCount / targetCount * 100} variant='determinate'/>
      <div className={classes.buttonBar}>
        <div className={classes.buttonsContainer}>
          <FastRewindIcon onClick={() => handleArrowClick(FAST_REWIND_OFFSET)}/>
          <RewindIcon onClick={() => handleArrowClick(REWIND_OFFSET)}/>
        </div>
        <div className={classes.buttonsContainer}>
          <ForwardIcon onClick={() => handleArrowClick(FORWARD_OFFSET)}/>
          <FastForwardIcon onClick={() => handleArrowClick(FAST_FORWARD_OFFSET)}/>
        </div>
      </div>
    </div>
  )
}

export default Workout;
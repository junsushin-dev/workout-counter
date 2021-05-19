import { Card, CardActionArea, CardContent, styled,Typography } from '@material-ui/core'
import React from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { createWorkoutsByRoutine } from '../../../apis/workoutsAPI';
import { IRoutine } from '../../../types';
import { getDateString } from '../../../utils/getDateString';
import { dateState } from '../states';
import ExerciseItem from './ExerciseItem';

const TextAlignLeftCardContent = styled(CardContent)({
  textAlign: 'left',
});

interface IProps {
  routine: IRoutine;
}

function RoutineItem({ routine }: IProps) {
  const date = useRecoilValue(dateState);
  const { name, exercises } = routine;
  const queryClient = useQueryClient();

  const handleClick = async () => {
    await createWorkoutsByRoutine(date, routine);
    queryClient.invalidateQueries(`workouts/${getDateString(date)}`);
  }

  return (
    <Card elevation={2} onClick={handleClick}>
      <CardActionArea>
        <TextAlignLeftCardContent>
          <Typography variant='h5' component='h3' gutterBottom>{name}</Typography>
          {exercises.map(exercise => 
            <ExerciseItem key={exercise.id} exercise={exercise}/>
          )}
        </TextAlignLeftCardContent>
      </CardActionArea>
    </Card>
  );
}

export default RoutineItem;

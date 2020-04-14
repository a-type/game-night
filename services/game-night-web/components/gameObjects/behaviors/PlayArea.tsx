import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { PlayAreaBehavior } from '../../../types/gameState';

export interface PlayAreaProps {
  behavior: PlayAreaBehavior;
}

const useStyles = makeStyles<Theme, PlayAreaProps>((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

const PlayArea: FC<PlayAreaProps> = (props) => {
  const { behavior, children, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root} {...rest}>
      {children}
    </div>
  );
};

export default PlayArea;

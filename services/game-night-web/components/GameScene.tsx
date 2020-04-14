import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { GameState } from '../types/gameState';
import GameObject from './gameObjects/GameObject';

export interface GameSceneProps {
  gameState: GameState;
}

const useStyles = makeStyles<Theme, GameSceneProps>((theme) => ({}));

const GameScene: FC<GameSceneProps> = (props) => {
  const { gameState } = props;
  const classes = useStyles(props);

  return <GameObject gameObject={gameState.root} />;
};

export default GameScene;

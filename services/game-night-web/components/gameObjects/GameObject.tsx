import React, { FC, ComponentType } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import {
  GameEntity,
  LayoutComponent,
  BehaviorComponent,
} from '../../types/gameState';
import Plane from './layouts/Plane';
import Card from './behaviors/Card';
import PlayArea from './behaviors/PlayArea';

export interface GameObjectProps {
  gameObject: GameEntity;
}

const useStyles = makeStyles<Theme, GameObjectProps>((theme) => ({}));

const layoutComponentMap: {
  [kind in LayoutComponent['kind']]: ComponentType<{ layout: LayoutComponent }>;
} = {
  PlaneLayout: Plane,
};

const behaviorComponentMap: {
  [kind in BehaviorComponent['kind']]: ComponentType<{
    behavior: BehaviorComponent;
  }>;
} = {
  CardBehavior: Card,
  PlayAreaBehavior: PlayArea,
};

const GameObject: FC<GameObjectProps> = (props) => {
  const { gameObject } = props;
  const classes = useStyles(props);

  // each game object has a layout and behavior. Behavior is the parent,
  // layout is rendered within it.

  const LayoutComponentImplementation =
    layoutComponentMap[gameObject.layout.kind];
  const BehaviorComponentImplementation =
    behaviorComponentMap[gameObject.behavior.kind];

  return (
    <BehaviorComponentImplementation behavior={gameObject.behavior}>
      <LayoutComponentImplementation
        layout={gameObject.layout}
      ></LayoutComponentImplementation>
    </BehaviorComponentImplementation>
  );
};

export default GameObject;

import React, { FC, useState, useCallback, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { PlaneLayout, Coordinate } from '../../../types/gameState';
import GameObject from '../GameObject';
import clsx from 'clsx';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated } from 'react-spring';

export interface PlaneChildContainerProps {
  coordinate: Coordinate;
  className?: string;
}

const useChildContainerStyles = makeStyles<Theme, PlaneChildContainerProps>(
  () => ({
    root: {},
  }),
);

const PlaneChildContainer: FC<PlaneChildContainerProps> = (props) => {
  const { children, className, coordinate, ...rest } = props;

  const classes = useChildContainerStyles(props);

  const [{ x, y }, set] = useSpring(() => ({
    ...coordinate,
  }));

  const bind = useDrag(({ offset }) => {
    set({
      x: coordinate.x + offset[0],
      y: coordinate.y + offset[1],
    });
    // TODO: persist this movement to the synchronized game state!
  });

  const preventDragStart = useCallback((ev) => {
    ev.preventDefault();
  }, []);

  return (
    <animated.div
      {...rest}
      onDragStart={preventDragStart}
      {...bind()}
      className={clsx(classes.root, className)}
      style={{
        left: x,
        top: y,
      }}
    >
      {children}
    </animated.div>
  );
};

export interface PlaneProps {
  layout: PlaneLayout;
}

const useStyles = makeStyles<Theme, PlaneProps>((theme) => ({
  // Plane extends to fill its parent
  root: {
    width: '100%',
    height: '100%',
  },
  childArea: {
    position: 'relative',
  },
  childContainer: {
    position: 'absolute',
  },
}));

const Plane: FC<PlaneProps> = (props) => {
  const { layout: plane, children, ...rest } = props;
  const classes = useStyles(props);

  const { children: childObjects, coordinates } = plane.state;

  return (
    <div className={classes.root} {...rest}>
      {children}
      <div className={classes.childArea}>
        {childObjects.map((childObject) => {
          return (
            <PlaneChildContainer
              key={childObject.id}
              coordinate={coordinates[childObject.id]}
              className={classes.childContainer}
            >
              <GameObject gameObject={childObject} />
            </PlaneChildContainer>
          );
        })}
      </div>
    </div>
  );
};

export default Plane;

import React, { FC, useMemo, CSSProperties } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Coordinate } from '../types/gameState';
import clsx from 'clsx';

export interface SpriteProps {
  spriteSheetUrl: string;
  topLeftCoordinate: Coordinate;
  bottomRightCoordinate: Coordinate;
  spriteSheetDimensions: Coordinate;
  className?: string;
  style?: CSSProperties;
}

const useStyles = makeStyles<Theme, SpriteProps>((theme) => ({
  root: {
    backgroundRepeat: 'none',
  },
}));

const Sprite: FC<SpriteProps> = (props) => {
  const {
    spriteSheetDimensions,
    spriteSheetUrl,
    bottomRightCoordinate,
    topLeftCoordinate,
    style,
    className,
    ...rest
  } = props;
  const classes = useStyles(props);

  const { x: spriteSheetWidth, y: spriteSheetHeight } = spriteSheetDimensions;
  const { x: topLeftX, y: topLeftY } = topLeftCoordinate;
  const { x: bottomRightX, y: bottomRightY } = bottomRightCoordinate;

  const imageStyle = useMemo(() => {
    const topU = topLeftX / spriteSheetWidth;
    const topV = topLeftY / spriteSheetHeight;
    const spriteWidth = bottomRightX - topLeftX;
    const spriteHeight = bottomRightY - topLeftY;

    // scale background size to fit card aspect
    const spriteHorizontalScale = spriteSheetWidth / spriteWidth;

    const spriteVerticalScale = spriteSheetHeight / spriteHeight;

    return {
      background: `url(${spriteSheetUrl})`,
      backgroundPosition: `${-topU * spriteHorizontalScale * 100}% ${
        -topV * spriteVerticalScale * 100
      }%`,
      backgroundSize: `${spriteHorizontalScale * 100}% ${
        spriteVerticalScale * 100
      }%`,
      ...style,
    };
  }, [
    topLeftX,
    topLeftY,
    bottomRightX,
    bottomRightY,
    spriteSheetWidth,
    spriteSheetHeight,
    spriteSheetUrl,
    style,
  ]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
      style={imageStyle}
    />
  );
};

export default Sprite;

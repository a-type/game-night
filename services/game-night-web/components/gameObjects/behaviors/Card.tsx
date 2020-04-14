import React, { FC, useMemo } from 'react';
import { makeStyles, Theme, Paper } from '@material-ui/core';
import { CardBehavior } from '../../../types/gameState';
import Sprite from '../../Sprite';

const CARD_WIDTH = 80;

export interface CardProps {
  behavior: CardBehavior;
}

const useStyles = makeStyles<Theme, CardProps>((theme) => ({
  root: {
    width: CARD_WIDTH,
    position: 'relative',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
}));

const Card: FC<CardProps> = (props) => {
  const { behavior: card, children, ...rest } = props;
  const classes = useStyles(props);

  const {
    spriteSheetBottomRight,
    spriteSheetDimensions,
    spriteSheetTopLeft,
    spriteSheetUrl,
  } = card.properties.frontFace;

  const spriteWidth =
    card.properties.frontFace.spriteSheetBottomRight.x -
    card.properties.frontFace.spriteSheetTopLeft.x;
  const spriteHeight =
    card.properties.frontFace.spriteSheetBottomRight.y -
    card.properties.frontFace.spriteSheetTopLeft.y;
  const aspectRatio = spriteHeight / spriteWidth;

  const rootStyle = useMemo(
    () => ({
      paddingTop: `${aspectRatio * 100}%`,
    }),
    [aspectRatio],
  );

  return (
    <Paper className={classes.root} style={rootStyle} {...rest}>
      <div className={classes.content}>
        <Sprite
          spriteSheetDimensions={spriteSheetDimensions}
          spriteSheetUrl={spriteSheetUrl}
          topLeftCoordinate={spriteSheetTopLeft}
          bottomRightCoordinate={spriteSheetBottomRight}
          className={classes.image}
        />
        {children}
      </div>
    </Paper>
  );
};

export default Card;

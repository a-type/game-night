/** all kinds of components extend this basic type */
export type GameObjectComponent<
  P = Record<string, any>,
  S = Record<string, any>
> = {
  properties: P;
  state: S;
};

/** Layout components */

export type Coordinate = {
  x: number;
  y: number;
};

export type PlaneLayout = GameObjectComponent<
  {},
  { coordinates: Record<string, Coordinate>; children: GameEntity[] }
> & {
  kind: 'PlaneLayout';
};

export type LayoutComponent = PlaneLayout;

/** Behavior components */

export type UVCoordinate = {
  u: number;
  v: number;
};

export type FaceLayout = {
  spriteSheetUrl: string;
  spriteSheetDimensions: Coordinate;
  /** UV coordinates indicate the top left and bottom right corners of the sprite in the sheet */
  spriteSheetTopLeft: Coordinate;
  spriteSheetBottomRight: Coordinate;
};

export enum CardFaceName {
  Front,
  Back,
}

export enum CardinalDirection {
  North,
  South,
  East,
  West,
}

export type PlayAreaBehavior = GameObjectComponent<{}, {}> & {
  kind: 'PlayAreaBehavior';
};

export type CardBehavior = GameObjectComponent<
  { frontFace: FaceLayout },
  { topFace: CardFaceName; orientation: CardinalDirection }
> & {
  kind: 'CardBehavior';
};

export type BehaviorComponent = CardBehavior | PlayAreaBehavior;

export type GameEntity = {
  id: string;
  layout: LayoutComponent;
  behavior: BehaviorComponent;
};

export type GameState = {
  root: GameEntity;
};

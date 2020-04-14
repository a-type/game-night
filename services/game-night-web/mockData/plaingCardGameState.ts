import {
  GameState,
  GameEntity,
  CardFaceName,
  CardinalDirection,
} from '../types/gameState';
import cardSheetUrl from '../assets/boardgamePack_v2/Spritesheets/playingCards.png';

const cardData = [
  // name, x, y, width, height
  ['cardClubs10.png', 560, 760, 140, 190],
  ['cardClubs2.png', 280, 1140, 140, 190],
  ['cardClubs3.png', 700, 190, 140, 190],
  ['cardClubs4.png', 700, 0, 140, 190],
  ['cardClubs5.png', 560, 1710, 140, 190],
  ['cardClubs6.png', 560, 1520, 140, 190],
  ['cardClubs7.png', 560, 1330, 140, 190],
  ['cardClubs8.png', 560, 1140, 140, 190],
  ['cardClubs9.png', 560, 950, 140, 190],
  ['cardClubsA.png', 560, 570, 140, 190],
  ['cardClubsJ.png', 560, 380, 140, 190],
  ['cardClubsK.png', 560, 190, 140, 190],
  ['cardClubsQ.png', 560, 0, 140, 190],
  ['cardDiamonds10.png', 420, 190, 140, 190],
  ['cardDiamonds2.png', 420, 1710, 140, 190],
  ['cardDiamonds3.png', 420, 1520, 140, 190],
  ['cardDiamonds4.png', 420, 1330, 140, 190],
  ['cardDiamonds5.png', 420, 1140, 140, 190],
  ['cardDiamonds6.png', 420, 950, 140, 190],
  ['cardDiamonds7.png', 420, 760, 140, 190],
  ['cardDiamonds8.png', 420, 570, 140, 190],
  ['cardDiamonds9.png', 420, 380, 140, 190],
  ['cardDiamondsA.png', 420, 0, 140, 190],
  ['cardDiamondsJ.png', 280, 1710, 140, 190],
  ['cardDiamondsK.png', 280, 1520, 140, 190],
  ['cardDiamondsQ.png', 280, 1330, 140, 190],
  ['cardHearts10.png', 140, 1520, 140, 190],
  ['cardHearts2.png', 700, 380, 140, 190],
  ['cardHearts3.png', 280, 950, 140, 190],
  ['cardHearts4.png', 280, 760, 140, 190],
  ['cardHearts5.png', 280, 570, 140, 190],
  ['cardHearts6.png', 280, 380, 140, 190],
  ['cardHearts7.png', 280, 190, 140, 190],
  ['cardHearts8.png', 280, 0, 140, 190],
  ['cardHearts9.png', 140, 1710, 140, 190],
  ['cardHeartsA.png', 140, 1330, 140, 190],
  ['cardHeartsJ.png', 140, 1140, 140, 190],
  ['cardHeartsK.png', 140, 950, 140, 190],
  ['cardHeartsQ.png', 140, 760, 140, 190],
  ['cardJoker.png', 140, 570, 140, 190],
  ['cardSpades10.png', 0, 760, 140, 190],
  ['cardSpades2.png', 140, 380, 140, 190],
  ['cardSpades3.png', 140, 190, 140, 190],
  ['cardSpades4.png', 140, 0, 140, 190],
  ['cardSpades5.png', 0, 1710, 140, 190],
  ['cardSpades6.png', 0, 1520, 140, 190],
  ['cardSpades7.png', 0, 1330, 140, 190],
  ['cardSpades8.png', 0, 1140, 140, 190],
  ['cardSpades9.png', 0, 950, 140, 190],
  ['cardSpadesA.png', 0, 570, 140, 190],
  ['cardSpadesJ.png', 0, 380, 140, 190],
  ['cardSpadesK.png', 0, 190, 140, 190],
  ['cardSpadesQ.png', 0, 0, 140, 190],
] as [string, number, number, number, number][];

const createPlayingCards = (): GameEntity[] =>
  cardData.map(([name, x, y, width, height]) => ({
    id: name,
    layout: {
      kind: 'PlaneLayout',
      properties: {},
      state: {
        children: [],
        coordinates: {},
      },
    },
    behavior: {
      kind: 'CardBehavior',
      properties: {
        frontFace: {
          spriteSheetUrl: cardSheetUrl,
          spriteSheetDimensions: {
            x: 1024,
            y: 2048,
          },
          spriteSheetTopLeft: {
            x,
            y,
          },
          spriteSheetBottomRight: {
            x: x + width,
            y: y + height,
          },
        },
      },
      state: {
        topFace: CardFaceName.Front,
        orientation: CardinalDirection.North,
      },
    },
  }));

const initialCoordinates = cardData.reduce(
  (coords, [name, x, y]) => ({
    ...coords,
    [name]: { x, y },
  }),
  {},
);

export const playingCardGameState: GameState = {
  root: {
    id: 'root',
    layout: {
      kind: 'PlaneLayout',
      properties: {},
      state: {
        children: createPlayingCards(),
        coordinates: initialCoordinates,
      },
    },
    behavior: {
      kind: 'PlayAreaBehavior',
      state: {},
      properties: {},
    },
  },
};

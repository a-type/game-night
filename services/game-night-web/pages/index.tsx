import React, { FC } from 'react';
import Head from 'next/head';
import { graphql } from 'react-relay';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { pages_indexQuery } from './__generated__/pages_indexQuery.graphql';
import GameScene from '../components/GameScene';
import { playingCardGameState } from '../mockData/plaingCardGameState';

type HomeProps = {};

const query = graphql`
  query pages_indexQuery {
    ping
  }
`;

const Home: FC<HomeProps> = () => {
  const data = useLazyLoadQuery<pages_indexQuery>(query, {});

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>The Relay ping value is: {data?.ping}</p>
        <GameScene gameState={playingCardGameState} />
      </main>
    </div>
  );
};

export default Home;

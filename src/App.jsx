import { useState } from 'react';

import AudioPlayer from './Sound'
import DisplayCards from './Cards'
import DisplayScore from './Score'
import DisplayGameEnd from './GameEnd';

import './App.css'

function OpeningMessage() {
  const handleClick = () => {
    const container = document.querySelector('#introComponent');
    const root = document.querySelector('#root');
    container.classList.add('hide');
    setTimeout(() => {root.removeChild(container);}, 1000);
  };

  return (
    <div id="introComponent" className="overlay">
      <div className='overlayContent'>
        <h1>The Elder Scrolls™ <br /> Memory Game </h1>
        <button onClick={handleClick}>Click here to start game</button>
        <p>(I&apos;m just a fan Bethesda, please don&apos;t sue me)</p>
      </div>
    </div>
  );
};

/*
1. Azura
2. Boethia
3. Clavicus Vile
4. Hermaeus Mora
5. Hircine
6. Jyggalag
7. Malacath
8. Mehrunes Dagon
9. Mephala
10. Meridia
11. Molag Bal
12. Namira
13. Nocturnal
14. Peryite
15. Sanguine
16. Sheogorath
17. Vaermina
*/

function App() {
  const [cardList, setCardList] = useState(
    Array(17).fill(null).map((element, index) => ({
      id: index,
      selected: false
    }))
  );

  const [gameOver, setGameOver] = useState(false);

  return (
    <>
      <AudioPlayer/>
      <OpeningMessage/>
      <DisplayScore cardList={cardList} />
      <DisplayCards cardList={cardList} setCardList={setCardList} gameOver={gameOver} setGameOver={setGameOver} />
      {gameOver && <DisplayGameEnd cardList={cardList} setCardList={setCardList} setGameOver={setGameOver}/>}
    </>
  )
}

export default App

import { useEffect } from 'react';
import './cards.css'

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

const preloadImages = (imageUrls) => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = ('daedric-princes' + url + '.png');
    });
  };

const cardSource = [
    'azura',
    'boethia',
    'clavicus-vile',
    'hermaeus-mora',
    'hircine',
    'jyggalag',
    'malacath',
    'mehrunes-dagon',
    'mephala',
    'meridia',
    'molag-bal',
    'namira',
    'nocturnal',
    'peryite',
    'sanguine',
    'sheogorath',
    'vaermina'
];

function shuffleArray(oldArr) {
    const arr = [...oldArr];
    for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

function DisplayCards({ cardList, setCardList, gameOver, setGameOver}) {
    useEffect(() => {
        preloadImages(cardSource);
    }, [])
    if (gameOver) return null;

    const shuffledCards = shuffleArray(cardList);
    const newCardCount = Math.floor(Math.random() * 5) + 1;

    let unplacedCards = 0;
    const toPlace = [];

    for (let i = 0; i < shuffledCards.length; i++) {
        if (newCardCount === unplacedCards) break;
        if (!shuffledCards[i].selected) {
            toPlace.push(shuffledCards[i]);
            unplacedCards++;
        }
    }
    // no card could be placed, end the game
    if (unplacedCards == 0) {
        setGameOver(true);
        return null;
    }
    // jo bhi ho, bass abhi selected nahi hone chahiye
    for (let i = 0; i < shuffledCards.length; i++) {
        if (toPlace.length === 10) break;
        if (!toPlace.includes(shuffledCards[i])) {
            toPlace.push(shuffledCards[i]);
        }
    }
    const newCards = shuffleArray(toPlace);
    return (
        <div className='boardContainer'>
            <div className='board'>
            {
                newCards.map(card =>
                    (
                        <div key={card.id} className='card rotateReveal' onClick={() => {
                            const cards = document.querySelectorAll('.card');
                            for (let i = 0; i < cards.length; i++) {
                                cards[i].classList.remove('rotateReveal');
                                cards[i].classList.add('rotateHide');
                            }
                            new Promise((resolve) => {setTimeout(() => {
                                for (let i = 0; i < cards.length; i++) {
                                    cards[i].classList.remove('rotateHide');
                                }
                                const newCardList = [...cardList];
                                if (newCardList[card.id].selected == true) {
                                    setGameOver(true);
                                    resolve();
                                    return null;
                                } else {
                                    newCardList[card.id].selected = true;
                                    setCardList(newCardList);
                                    resolve();
                                }
                            }, 1000);})
                            .then(() => {
                                const cards = document.querySelectorAll('.card');
                                for (let i = 0; i < cards.length; i++) {
                                    cards[i].classList.add('rotateReveal');
                                }
                            })
                        }}
                        >
                            <img src={`daedric-princes/${cardSource[card.id]}.png`} alt={cardSource[card.id]} className='front'/>
                            <img src={`skyrim.png`} alt={`skyrim`} className='back'/>
                        </div>
                    )
                )
            }
            </div>
        </div>
    )
}

export default DisplayCards;
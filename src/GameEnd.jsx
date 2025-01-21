function DisplayGameEnd({ cardList, setCardList, setGameOver }) {
    console.log(cardList, setCardList);
    let score = 0;
    for (let i = 0; i < cardList.length; i++) {
        if (cardList[i].selected) score++;
    }
    return (
        <div className="overlay reveal">
            <div className="overlayContent">
                <h1>
                    {score === 17 ? (
                        `You Win!`
                    ) : (
                        <>
                            Game Over! <br /> Your score: {score}/17
                        </>
                    )}
                </h1>
                <button onClick={() => {
                    setGameOver(false);
                    setCardList(
                        Array(17).fill(null).map((element, index) => ({
                            id: index,
                            selected: false
                        }))
                    );
                }}>New Game</button>
            </div>
        </div>
    );
}

export default DisplayGameEnd;
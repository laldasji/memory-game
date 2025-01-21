import './scoreCard.css'

function DisplayScore({ cardList }) {
    let score = 0;
    for (let i = 0; i < cardList.length; i++) {
        if (cardList[i].selected) score++;
    }
    return (<div className="scoreCard">
        <h1>Score: {score}</h1>
        <hr />
    </div>)
}

export default DisplayScore;
const container = document.querySelector('.container');

const COLORS = [
    '#00b694',//Mint Leaf
    '#630330',//Tyrian Purple
    '#f75c75',//Ponceau
    '#273c76',//Mazarine
    '#4a9976',//Smaragdine
    '#df73ff',//Heliotrope
    '#e49b0f',//Gamboge
    '#c04000',//Mahagony
    '#ff2052',//Awesome
    '#0437f2',//Ultramarine

    '#00b694',
    '#630330',
    '#f75c75',
    '#273c76',
    '#4a9976',
    '#df73ff',
    '#e49b0f',
    '#c04000',
    '#ff2052',
    '#0437f2',


    //Comment out first set and uncomment this set to change color of tiles
    // 'Red',
    // 'Blue',
    // 'Green',
    // 'Yellow',
    // 'Orange',
    // 'Purple',
    // 'Pink',
    // 'White',
    // 'Cyan',
    // 'Grey',

    // 'Red',
    // 'Blue',
    // 'Green',
    // 'Yellow',
    // 'Orange',
    // 'Purple',
    // 'Pink',
    // 'White',
    // 'Cyan',
    // 'Grey'
];

const COLORSArray = COLORS.length;

//Game state

let revealedCount = 0;
let activeTile = null;
let awaitingNextGuess = false;



function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(COLORS);



function createDivsForColors(colorArray) {
    for(let color of colorArray) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('tile');
        newDiv.setAttribute('data-color', color);
        newDiv.setAttribute('data-revealed', false);


        function handleTileClick(e) {
            console.log('You Just Cliked', e.target.dataset.color);
            const tileColor = e.target.dataset.color;
            const revealed = newDiv.getAttribute('data-revealed');


            if(awaitingNextGuess || revealed === true || newDiv === activeTile){
                return; 
            }
            e.target.style.backgroundColor = tileColor;

            if(!activeTile) {
                activeTile = newDiv;

                return;
            }


            let winner = document.createElement('h1');//flashes 'YOU WIN' when game is complete
            winner.classList.add('winner');
            winner.innerHTML = 'YOU WIN!'
            let refreshBtn = document.createElement('button');//creates a button that say 'New Game' that refreshes page to start new game
            refreshBtn.innerHTML = 'Start New Game';
            refreshBtn.classList.add('replay');


            const colorToMatch = activeTile.getAttribute('data-color');
            if(colorToMatch === color){
                activeTile.setAttribute('data-revealed', true);
                newDiv.setAttribute('data-revealed', true);
                activeTile = null;
                awaitingNextGuess = false;
                revealedCount += 2;
                console.log('Thats a match!')

                if(revealedCount === COLORSArray) {
                    console.log('YOU WIN!');
                    document.body.appendChild(winner);
                    winner.append(refreshBtn);
                    refreshBtn.addEventListener('click', function(e){
                        if(e.target.classList.contains('replay')) {
                            location.reload(true);
                        };
                    });
                    // alert('You Win! Refresh to play again');
                }
                return;
            }

            awaitingNextGuess = true;

            setTimeout(() => {
                newDiv.style.backgroundColor = null;
                activeTile.style.backgroundColor = null;

                awaitingNextGuess = false;
                activeTile = null;
            }, 750);
        };

        newDiv.addEventListener('click', handleTileClick);

        container.append(newDiv);
    }
};


createDivsForColors(shuffledColors);

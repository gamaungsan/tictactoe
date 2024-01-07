const info = (function() {
    const infoDisplay = document.querySelector('.game-info');

    function displayWinner(player){
        if(player === 0)
        {
            infoDisplay.innerText = 'Tie!'
            return;
        }

        infoDisplay.innerText = `Player ${player} Wins!`
    }

    function resetDisplay(){
        infoDisplay.innerHTML = '';
    }

    return {
        displayWinner: displayWinner,
        resetDisplay: resetDisplay
    }

})();

const game = (function(){
    //represents gameboard with 0 being not played, 1 being player 1 and 2 being player 2
    var gameboard = [ [0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0] ];
    var turn = 0;
    var lastClicked;
    var plays = 0;

    const container = document.querySelector('.container');

    const displayBoard = document.querySelector('.gameboard');
    const squares = document.querySelectorAll('.square');

    const reset = document.querySelector('#reset');
    const back = document.querySelector('#back');

    const playDiv = document.querySelector('.playButton');
    const playButton = document.querySelector('#play');

    //bind
    displayBoard.addEventListener('click', play);
    reset.addEventListener('click', resetDisplay);
    back.addEventListener('click', backDisplay);
    playButton.addEventListener('click', backDisplay);

    function resetDisplay(){
        newGame();
        plays++;
        info.resetDisplay();
        updateDisplay();
    }

    function backDisplay(){
        container.classList.toggle('off');
        playDiv.classList.toggle('off');
        newGame();
        plays++;
        updateDisplay();
    }

    function play(event){
        if(plays === -1){
            updateDisplay();
            info.resetDisplay()
            plays++;
            return;
        }

        position = event.target.id;
        if(turn === 0 || turn === 1)
            putX(position)
        else
            putO(position)

        lastClicked = position;
        
        updateDisplay();

        if(checkWin()){
            //check winner
            info.displayWinner(checkWin());
            newGame();
        }

        if(plays === 9){
            //check tie
            info.displayWinner(0);
            newGame();
        }
        
        

        
    }


    function newGame(player = 0){
        turn = player;
        plays = -1;
        gameboard = [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]];
        
    }

    function putX(position){
        if(gameboard[parseInt(position/3)][position%3] === 0)
        {
            if(turn == 0 || turn == 1){
                turn = 2;
                plays++;

                gameboard[parseInt(position/3)][position%3] = 1;
            } 
        }   
    }
    
    function putO(position){
        if(gameboard[parseInt(position/3)][position%3] === 0)
        {
            if(turn == 0 || turn == 2){
                turn = 1;
                plays++;

                gameboard[parseInt(position/3)][position%3] = 2;
            }
        }
    }
    
    function checkWin(){
        //check player 1 win
        const player = (turn === 1) ? 2: 1;

        
        for(let i=0;i<3;i++){
            //rows
            if(gameboard[i][0] == player && gameboard[i][1] == player && gameboard[i][2] == player){
                
                return player;
            }

            //columns
            if(gameboard[0][i] == player && gameboard[1][i] == player && gameboard[2][i] == player){
                
                return player;
            }

            //diagonal left to right
            if(gameboard[0][0] == player && gameboard[1][1] == player && gameboard[2][2] == player)
            {    
                
                return player;
            }
            //diagonal right to left
            if(gameboard[0][2] === player && gameboard[1][1] === player && gameboard[2][0] === player)
            {   
                return player;
        
            }
        }
        return 0;
    }

    function updateDisplay(){
        for(let i = 0; i < 9; i++){
            if(gameboard[parseInt(i/3)][i%3] === 1){
                squares[i].style.color = 'red';
                squares[i].innerText = 'X';
            }
            else if(gameboard[parseInt(i/3)][i%3] === 2){
                squares[i].style.color = 'blue';
                squares[i].innerText = 'O';
            
            }
            else{
                squares[i].innerText = ' ';
            }
        }
    }

    return {
        newGame: newGame,
        putX: putX,
        putO: putO,
        checkWin: checkWin
    };
})();


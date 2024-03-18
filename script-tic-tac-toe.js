document.addEventListener('DOMContentLoaded', () => {
    const gameModeSelection = document.getElementById('gameModeSelection');
    const gameContainer = document.getElementById('gameContainer');
    const gameBoard = document.getElementById('gameBoard');
    const gameActions = document.querySelector('.game-actions');
    const winMessage = document.getElementById('winMessage');
    const winnerText = document.getElementById('winnerText');
    const playAgain = document.getElementById('playAgain');
    const backToMenu = document.getElementById('backToMenu');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameMode = '';

    function drawBoard() {
        gameBoard.innerHTML = '';
        gameState.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.textContent = cell;
            cellDiv.addEventListener('click', () => playMove(index));
            gameBoard.appendChild(cellDiv);
        });
    }

    function playMove(index) {
   
        if (gameState[index] || checkWinner() || gameMode === '' || (gameMode === 'PvAI' && currentPlayer === 'O')) {
            return;
        }
        gameState[index] = currentPlayer;
        drawBoard();

        if (checkWinner()) {
            endGame(currentPlayer + ' Wins!');
            return;
        }

        if (!gameState.includes('')) {
            endGame('Its a Tie!');
            return;
        }

        if (gameMode === 'PvAI' && currentPlayer === 'X') {
            switchPlayer();
            setTimeout(aiMove, 500);
        } else {
            switchPlayer();
        }
    }

    function aiMove() {
        const availableMoves = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        if (availableMoves.length > 0) {
            const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            gameState[move] = currentPlayer; 
            drawBoard();
            if (checkWinner()) {
                endGame('O Wins!');
                return;
            }

            if (!gameState.includes('')) {
                endGame('Its a Tie!');
                return;
            }

            switchPlayer(); 
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                return true;
            }
            return false;
        });
    }

    function endGame(result) {
        winnerText.textContent = result; 
        winMessage.style.display = 'block';
        gameActions.style.display = 'flex';
    }

    document.getElementById('playerVsPlayer').addEventListener('click', () => {
        gameMode = 'PvP';
        startGame();
    });

    document.getElementById('playerVsAI').addEventListener('click', () => {
        gameMode = 'PvAI';
        startGame();
    });

    playAgain.addEventListener('click', resetGame);

    function startGame() {
        gameState.fill('');
        currentPlayer = 'X';
        gameModeSelection.style.display = 'none';
        gameContainer.style.display = 'block';
        winMessage.style.display = 'none';
        gameActions.style.display = 'none';
        drawBoard();
    }

    function resetGame() {
        gameState.fill('');
        currentPlayer = 'X';
        winMessage.style.display = 'none';
        gameActions.style.display = 'none';
        gameContainer.style.display = 'none';
        gameModeSelection.style.display = 'block';
    }
});

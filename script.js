window.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameContainer = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    const sky = document.querySelector('.sky');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let gap = 500;
    let score = 0;
    let isGameOver = false;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimeId = setInterval(startGame, 20);

    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
        console.log(birdBottom);
    }

    function control(e) {
        if (e.keyCode === 32 || e.keyCode === 38) {
            jump();
        }
    }

    document.addEventListener('keyup', control);

    function generateObstacle() {
        if (isGameOver) return

        let obstacleLeft = 500;
        const randomHeight = Math.random() * 60 + 1;
        let obstacleBottom = randomHeight;

        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');

        obstacle.classList.add('obstacle');
        topObstacle.classList.add('top-obstacle');

        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = gap + obstacleBottom + 'px';

        gameContainer.appendChild(obstacle);
        gameContainer.appendChild(topObstacle);

        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            score += 1;
            ground.innerHTML = `<h1 id="score">Score: ${score}</h1>`;
            if (obstacleLeft === -60) {
                clearInterval(timeId);
                gameContainer.removeChild(obstacle);
                gameContainer.removeChild(topObstacle);
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0
            ) {
                gameOver();
                clearInterval(timeId);
            }
        }
        let timeId = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }

    generateObstacle();

    function gameOver() {
        isGameOver = true;
        clearInterval(gameTimeId);
        document.removeEventListener('keyup', control);
    }
})
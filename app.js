document.addEventListener("DOMContentLoaded", () => {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    let isJumping = false
    let gravity = 0.9
    let isGameOver = false

    function control(e) {
        if (e.keyCode === 32) { /*e.keyCode 32 selects the space bar as a key*/
            if (!isJumping) {
                isjumping = true
                jump()
            }
        }
    }
    document.addEventListener('keyup', control) /*this listens out for the control function, so when space bar is pressed*/

    let position = 0
    function jump() {
        let count = 0
        let timerId = setInterval(function() {

            //move down
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 5
                    count--
                    position = position * gravity
                    dino.style.bottom = position + 'px'
                }, 20)
            }

            //move up
            console.log('up')
            position +=30
            count++
            position = position * gravity
            dino.style.bottom = position + 'px'
        }, 20)
    }


    function generateObstacle() {
        let randomTime = Math.random() * 4000 /*chooses a random number between 1 and 4000 milliseconds*/
        let obstaclePosition = 1000
        const obstacle = document.createElement('div') /*create a div to put obstacle in*/
        if (!isGameOver) obstacle.classList.add('obstacle') /*take CSS details and add the obstacle*/
        grid.appendChild(obstacle) /*put the obstacle we just made into the grid*/
        obstacle.style.left = obstaclePosition + 'px' /*adds 1000 pixels to left of obstacle*/

        let timerId = setInterval(function() {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(timerId)
                alert.innerHTML = 'Game Over!'
                isGameOver = true
                // remove all children
                body.removeChild(body.firstChild)
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild) /*removes the last child so as this is a while it just keeps removing all the children*/
                }
            }

            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + 'px'
            },20)
            if (!isGameOver) setTimeout(generateObstacle, randomTime)
    }
    generateObstacle()

})
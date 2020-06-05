function main() {

  const score = document.querySelector('#score')
  const lives = document.querySelector('#lives')
  const grid = document.querySelector('.grid')
  const width = 25
  const cells = []
  const interesectionArray = [32, 36, 42, 101, 107, 115, 117, 123, 151, 157, 159, 161, 165, 167,
    173, 205, 207, 217, 219, 359, 365, 405, 407, 409, 415, 417, 419,
    461, 463, 542, 544, 532, 530]

  //  Junctions that don't work  // 305, 307, 309, 315, 317, 319

  const wallsArray = [39, 52, 53, 54, 55, 56, 58, 59, 60, 62, 64, 66, 68, 69, 70, 71, 72,
    77, 78, 79, 80, 81, 83, 85, 87, 89, 91, 93, 94, 95, 96, 97,
    108, 109, 110, 112, 116,
    127, 128, 129, 130, 131, 133, 135, 137, 138, 139, 141, 143, 144, 145, 146, 147,
    177, 178, 179, 180, 181, 183, 185, 186, 187, 188, 189, 191, 193, 194, 195, 196, 197,
    208, 212, 216,
    226, 227, 228, 229, 231, 233, 234, 235, 237, 239, 240, 241, 243, 245, 246, 247, 248,
    254, 256, 258, 266, 268, 270,
    276, 277, 278, 279, 281, 283, 285, 286, 287, 288, 289, 291, 293, 295, 296, 297, 298,
    310, 314,
    326, 327, 328, 329, 331, 333, 335, 336, 337, 338, 339, 341, 343, 345, 346, 347, 348,
    354, 356, 358, 366, 368, 370,
    376, 377, 378, 379, 381, 383, 385, 386, 387, 388, 389, 391, 393, 395, 396, 397, 398,
    412,
    427, 428, 430, 431, 433, 434, 435, 437, 439, 440, 441, 443, 444, 446, 447,
    452, 453, 454, 455, 456, 468, 469, 470, 471, 472,
    481, 483, 484, 485, 486, 487, 488, 489, 490, 491, 493,
    501, 502, 503, 504, 506, 508, 512, 516, 518, 520, 521, 522, 523,
    535, 537, 539,
    552, 553, 554, 555, 556, 557, 558, 559, 560, 562, 564, 565, 566, 567, 568, 569, 570, 571, 572]
  const blankCells = [84, 251, 252, 253, 271, 272, 273, 351, 352, 353, 371, 372, 373]
  const door = []
  const bigFruit = [104, 120, 134, 429, 445, 526, 548]
  const pacManStart = [462]
  const pinkyStart = [262]
  const greenyStart = [311]
  const blueboyStart = [312]
  const clydeStart = [313]
  const header = document.querySelector('#header')
  const ghostDirections = [- 1, + 1, + width, - width]
  const deathAudio = document.querySelector('#death-audio')
  deathAudio.volume = 0.1
  const wakawaka = document.querySelector('#wakawaka')
  wakawaka.volume = 0.2
  const endMusic = document.querySelector('#end')
  endMusic.volume = 0.5


  let pacmanPosition = 462
  let direction = ''
  let count = 0
  let livesCount = 3
  let dotCount = 0
  let pinkyPosition = 262
  let greenyPosition = 311
  let blueboyPosition = 312
  let clydePosition = 313
  let pinkyDirection = ghostDirections[0]
  let greenyDirection = ghostDirections[0]
  let blueboyDirection = ghostDirections[0]
  let clydeDirection = ghostDirections[0]
  let pinkyReady = false
  let pinkyTimeout = false
  let greenyReady = false
  let greenyTimeout = false
  let blueboyReady = false
  let blueboyTimeout = false
  let clydeReady = false
  let clydeTimeout = false
  let scaredGhost = false


  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    if (i === 300 || i === 324) {
      div.classList.add('wrap')
    } else if ((i < width) || (i > (width ** 2 - 1) - width) || ((i % width) === 0) || ((i % width) - (width - 1) === 0)) {
      div.classList.add('wall')
    } else if (div.classList.contains('wrap')) {
      div.classList.remove('wall')
    } else if (wallsArray.includes(i)) {
      div.classList.add('wall')
    } else if (blankCells.includes(i)) {
      div.classList.add('blank')
    } else if (door.includes(i)) {
      div.classList.add('door')
    } else if (bigFruit.includes(i)) {
      div.classList.add('bigdot')
      dotCount++
    } else if (pacManStart.includes(i)) {
      div.classList.add('pacman')
    } else if (greenyStart.includes(i)) {
      div.classList.add('greeny')
    } else if (pinkyStart.includes(i)) {
      div.classList.add('pinky')
      div.classList.add('smalldot')
    } else if (blueboyStart.includes(i)) {
      div.classList.add('blueboy')
    } else if (clydeStart.includes(i)) {
      div.classList.add('clyde')
    } else {
      div.classList.add('smalldot')
      dotCount++
    }
    // div.innerHTML = i

    grid.appendChild(div)
    cells.push(div)

    score.innerHTML = 'Ready? Press the left or right arrow key to start!'

  }


  function renderGhosts() {
    cells.forEach(cell => {
      cell.classList.remove('pinky')
      cell.classList.remove('greeny')
      cell.classList.remove('blueboy')
      cell.classList.remove('clyde')
    })
    cells[pinkyPosition].classList.add('pinky')
    cells[greenyPosition].classList.add('greeny')
    cells[blueboyPosition].classList.add('blueboy')
    cells[clydePosition].classList.add('clyde')
  }







  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      direction = 'right'
      cells[pacmanPosition].classList.add('pacmanright')
    } else if (event.key === 'ArrowLeft') {
      direction = 'left'
      cells[pacmanPosition].classList.add('pacmanleft')
    } else if (event.key === 'ArrowDown') {
      direction = 'down'
      cells[pacmanPosition].classList.add('pacmandown')
    } else if (event.key === 'ArrowUp') {
      direction = 'up'
      cells[pacmanPosition].classList.add('pacmanup')
    }
  })

  cells[pacmanPosition].classList.add('pacman')

  function renderPacman() {
    cells.forEach(cell => {
      cell.classList.remove('pacman')
      cell.classList.remove('pacmanup')
      cell.classList.remove('pacmandown')
      cell.classList.remove('pacmanleft')
      cell.classList.remove('pacmanright')
      cell.classList.remove('pacmanclosed')

    })
    cells[pacmanPosition].classList.add('pacman')
    if (pacmanPosition % 2 === 0) {
      cells[pacmanPosition].classList.add('pacmanclosed')
    }
  }


  lives.innerHTML = 'Lives: ' + livesCount


  setInterval(() => {
    if (direction === 'right') {
      cells[pacmanPosition].classList.add('pacmanright')
      if (pacmanPosition === 324) {
        pacmanPosition -= width
      } else if (cells[pacmanPosition + 1].classList.contains('smalldot')) {
        cells[pacmanPosition + 1].classList.remove('smalldot')
        count += 10
        dotCount--
        wakawaka.play()
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition + 1].classList.contains('bigdot')) {
        cells[pacmanPosition + 1].classList.remove('bigdot')
        count += 100
        dotCount--
        scaredGhost = true
        setTimeout(scaredGhost = false, 10000)
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition + 1].classList.contains('greeny') || cells[pacmanPosition + 1].classList.contains('pinky') || cells[pacmanPosition + 1].classList.contains('blueboy') || cells[pacmanPosition + 1].classList.contains('clyde')) {
        livesCount -= 1
        direction = 'up'
        pacmanPosition = 461
        lives.innerHTML = 'Lives ' + livesCount
        score.innerHTML = 'You lost a life! Press the left or right arrow key to resume!'
        pinkyPosition = 262
        greenyPosition = 311
        blueboyPosition = 312
        clydePosition = 313
        pinkyReady = false
        pinkyTimeout = false
        greenyReady = false
        greenyTimeout = false
        blueboyReady = false
        blueboyTimeout = false
        clydeReady = false
        clydeTimeout = false
        deathAudio.play()

      } else if (cells[pacmanPosition + 1].classList.contains('wall')) {
        return
      }
      pacmanPosition += 1
      // console.log('right')
    } else if (direction === 'left') {
      cells[pacmanPosition].classList.add('pacmanleft')
      if (pacmanPosition === 300) {
        pacmanPosition += width
      } else if (cells[pacmanPosition - 1].classList.contains('smalldot')) {
        cells[pacmanPosition - 1].classList.remove('smalldot')
        count += 10
        dotCount--
        wakawaka.play()
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition - 1].classList.contains('bigdot')) {
        cells[pacmanPosition - 1].classList.remove('bigdot')
        count += 100
        dotCount--
        scaredGhost = true
        setTimeout(scaredGhost = false, 10000)
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition - 1].classList.contains('greeny') || cells[pacmanPosition - 1].classList.contains('pinky') || cells[pacmanPosition - 1].classList.contains('blueboy') || cells[pacmanPosition - 1].classList.contains('clyde')) {
        livesCount -= 1
        direction = 'up'
        pacmanPosition = 463
        lives.innerHTML = 'Lives ' + livesCount
        score.innerHTML = 'You lost a life! Press the left or right arrow key to resume!'
        pinkyPosition = 262
        greenyPosition = 311
        blueboyPosition = 312
        clydePosition = 313
        pinkyReady = false
        pinkyTimeout = false
        greenyReady = false
        greenyTimeout = false
        blueboyReady = false
        blueboyTimeout = false
        clydeReady = false
        clydeTimeout = false
        deathAudio.play()
      } else if (cells[pacmanPosition - 1].classList.contains('wall')) {
        return
      }
      pacmanPosition -= 1
      // console.log('left')
    } else if (direction === 'down') {
      cells[pacmanPosition].classList.add('pacmandown')
      if (cells[pacmanPosition + width].classList.contains('smalldot')) {
        cells[pacmanPosition + width].classList.remove('smalldot')
        count += 10
        dotCount--
        wakawaka.play()
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition + width].classList.contains('bigdot')) {
        cells[pacmanPosition + width].classList.remove('bigdot')
        count += 100
        dotCount--
        scaredGhost = true
        setTimeout(scaredGhost = false, 10000)
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition + width].classList.contains('greeny') || cells[pacmanPosition + width].classList.contains('pinky') || cells[pacmanPosition + width].classList.contains('blueboy') || cells[pacmanPosition + width].classList.contains('clyde')) {
        livesCount -= 1
        direction = 'up'
        pacmanPosition = 462
        lives.innerHTML = 'Lives ' + livesCount
        score.innerHTML = 'You lost a life! Press the left or right arrow key to resume!'
        pinkyPosition = 262
        greenyPosition = 311
        blueboyPosition = 312
        clydePosition = 313
        pinkyReady = false
        pinkyTimeout = false
        greenyReady = false
        greenyTimeout = false
        blueboyReady = false
        blueboyTimeout = false
        clydeReady = false
        clydeTimeout = false
        deathAudio.play()
      } else if (cells[pacmanPosition + width].classList.contains('wall') || cells[pacmanPosition + width].classList.contains('door')) {
        return
      }
      pacmanPosition += width
      // console.log('down') 
    } else if (direction === 'up') {
      cells[pacmanPosition].classList.add('pacmanup')
      if (cells[pacmanPosition - width].classList.contains('smalldot')) {
        cells[pacmanPosition - width].classList.remove('smalldot')
        count += 10
        dotCount--
        wakawaka.play()
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition - width].classList.contains('bigdot')) {
        cells[pacmanPosition - width].classList.remove('bigdot')
        count += 100
        dotCount--
        scaredGhost = true
        setTimeout(scaredGhost = false, 10000)
        score.innerHTML = 'Score: ' + count
      } else if (cells[pacmanPosition - width].classList.contains('greeny') || cells[pacmanPosition - width].classList.contains('pinky') || cells[pacmanPosition - width].classList.contains('blueboy') || cells[pacmanPosition - width].classList.contains('clyde')) {
        livesCount -= 1
        direction = 'up'
        pacmanPosition = 462
        lives.innerHTML = 'Lives ' + livesCount
        score.innerHTML = 'You lost a life! Press the left or right arrow key to resume!'
        pinkyPosition = 262
        greenyPosition = 311
        blueboyPosition = 312
        clydePosition = 313
        pinkyReady = false
        pinkyTimeout = false
        greenyReady = false
        greenyTimeout = false
        blueboyReady = false
        blueboyTimeout = false
        clydeReady = false
        clydeTimeout = false
        deathAudio.play()
      } else if (cells[pacmanPosition - width].classList.contains('wall')) {
        return
      }
      pacmanPosition -= width
      // console.log('up') 


    }


    renderPacman()

    if (dotCount === 0) {

      // ! animation
      // setTimeout(() => {
      //   cells[wallsArray].classList.remove('wall')
      //   cells[wallsArray].classList.add('wallEnd')
      // }, 500)

      setTimeout(() => {
        grid.classList.add('gameOver')
        pinkyPosition = 311
        endMusic.play()

        header.innerHTML = 'You Win!'
        score.innerHTML = 'Final Score: ' + count
        lives.innerHTML = 'Refresh your browser to play again!'
        setTimeout(() => {
          pinkyPosition = 311
        }, 501)
        setTimeout(() => {
          greenyPosition = 311
        }, 6001)
        setTimeout(() => {
          blueboyPosition = 311
        }, 3001)
        setTimeout(() => {
          clydePosition = 311
        }, 9001)
      }, 800)
    }


  }, 210)


  function collisionCheck(ghostDirection, ghostPosition) {
    if (cells[ghostPosition + ghostDirection].classList.contains('wall')) {
      return true
    }
    return false
  }

  function randomDirection(ghostDirection, ghostPosition) {
    const oppositeDirection = ghostDirection * -1
    const filteredGhostDirections = ghostDirections.filter(currentDirection => {
      return currentDirection !== ghostDirection
    }).filter(test => test !== oppositeDirection)
    const neighbourCells = []
    filteredGhostDirections.forEach(alisdirection => {
      neighbourCells.push(ghostPosition + alisdirection)
    })
    const validNeighbours = neighbourCells.filter(cell => !cells[cell].classList.contains('wall') && !cells[cell].classList.contains('door'))
    const randomNeighbour = validNeighbours[Math.floor(Math.random() * validNeighbours.length)]
    // console.log(filteredGhostDirections)
    // console.log(neighbourCells)
    // console.log(validNeighbours)
    return (randomNeighbour - ghostPosition)

  }


  // Pinky Position
  setInterval(() => {

    if (!pinkyTimeout) {
      pinkyTimeout = true
      setTimeout(() => {
        pinkyPosition = 262
        pinkyReady = true
      }, 500)
    }
    if (!pinkyReady) {
      return
      // }
      // if (pinkyPosition === 324) {
      //   pinkyPosition -= width
      //   pinkyDirection[1]

      //   console.log(pinkyDirection)
      //   console.log(pinkyPosition)
      // }
      // if (pinkyPosition === 300) {
      //   pinkyPosition += width
      //   pinkyDirection[0]

      //   console.log(pinkyDirection)
      //   console.log(pinkyPosition)
    }
    // if (scaredGhost) {
    //   pinkyPosition.classList.remove('pinky')
    //   pinkyPosition.classList.add('scared')
    // }

    if (interesectionArray.includes(pinkyPosition)) {
      pinkyDirection = randomDirection(pinkyDirection, pinkyPosition)
    }
    if (collisionCheck(pinkyDirection, pinkyPosition)) {
      pinkyDirection = randomDirection(pinkyDirection, pinkyPosition)
    } else {
      pinkyPosition += pinkyDirection
    }
    renderGhosts()
  }, 240)


  // Greeny


  setInterval(() => {
    if (!greenyTimeout) {
      greenyTimeout = true
      setTimeout(() => {
        greenyPosition = 261
        greenyReady = true
      }, 6000)
    }
    if (!greenyReady) {
      return
    }
    if (greenyPosition === 324) {
      greenyPosition -= width
      greenyDirection[1]
    }
    if (greenyPosition === 300) {
      greenyPosition += width
      greenyDirection[0]
    }
    if (interesectionArray.includes(greenyPosition)) {
      greenyDirection = randomDirection(greenyDirection, greenyPosition)
    }
    if (collisionCheck(greenyDirection, greenyPosition)) {
      greenyDirection = randomDirection(greenyDirection, greenyPosition)
    } else {
      greenyPosition += greenyDirection
    }
    renderGhosts()
  }, 240)


  // blueboy

  setInterval(() => {
    if (!blueboyTimeout) {
      blueboyTimeout = true
      setTimeout(() => {
        blueboyPosition = 262
        blueboyReady = true
      }, 3000)
    }
    if (!blueboyReady) {
      return
    }
    if (blueboyPosition === 324) {
      blueboyPosition -= width
      blueboyDirection[1]
    }
    if (blueboyPosition === 300) {
      blueboyPosition += width
      blueboyDirection[0]
    }
    if (interesectionArray.includes(blueboyPosition)) {
      blueboyDirection = randomDirection(blueboyDirection, blueboyPosition)
    }
    if (collisionCheck(blueboyDirection, blueboyPosition)) {
      blueboyDirection = randomDirection(blueboyDirection, blueboyPosition)
    } else {
      blueboyPosition += blueboyDirection
    }
    renderGhosts()
  }, 210)



  // clyde
  setInterval(() => {

    if (!clydeTimeout) {
      clydeTimeout = true
      setTimeout(() => {
        clydePosition = 263
        clydeReady = true
      }, 9000)
    }
    if (!clydeReady) {
      return
    }
    if (clydePosition === 324) {
      clydePosition -= width
      clydeDirection[1]
    }
    if (clydePosition === 300) {
      clydePosition += width
      clydeDirection[0]
    }
    if (interesectionArray.includes(clydePosition)) {
      clydeDirection = randomDirection(clydeDirection, clydePosition)
    }
    if (collisionCheck(clydeDirection, clydePosition)) {
      clydeDirection = randomDirection(clydeDirection, clydePosition)
    } else {
      clydePosition += clydeDirection
    }
    renderGhosts()
  }, 270)


  setInterval(() => {
    if (pacmanPosition === pinkyPosition || pacmanPosition === greenyPosition || pacmanPosition === blueboyPosition || pacmanPosition === clydePosition) {
      livesCount--
      lives.innerHTML = 'Lives: ' + livesCount
      pacmanPosition = 462
      direction = 'up'
      pinkyPosition = 262
      greenyPosition = 311
      blueboyPosition = 312
      clydePosition = 313
      renderGhosts()
      renderPacman()
      pinkyReady = false
      pinkyTimeout = false
      greenyReady = false
      greenyTimeout = false
      blueboyReady = false
      blueboyTimeout = false
      clydeReady = false
      clydeTimeout = false
      deathAudio.play()
      score.innerHTML = 'You lost a life! Press the left or right arrow key to resume!'



    }

    if (livesCount === 0) {
      grid.classList.add('gameOver')
      pinkyPosition = 311
      endMusic.play()

      header.innerHTML = 'Game Over!'
      score.innerHTML = 'Final Score: ' + count
      lives.innerHTML = 'Refresh your browser to play again!'
      setTimeout(() => {
        pinkyPosition = 311
      }, 501)
      setTimeout(() => {
        greenyPosition = 311
      }, 6001)
      setTimeout(() => {
        blueboyPosition = 311
      }, 3001)
      setTimeout(() => {
        clydePosition = 311
      }, 9001)
    }
  }, 1)







}

document.addEventListener('DOMContentLoaded', main)


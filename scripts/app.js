function main() {

  const score = document.querySelector('#score')
  const start = document.querySelector('#start')
  const grid = document.querySelector('.grid')
  const width = 25
  const cells = []
  const wallsArray = [52, 53, 54, 55, 56, 58, 59, 60, 62, 66, 68, 69, 70, 71, 72,
    77, 78, 79, 80, 81, 83, 85, 87, 91, 93, 94, 95, 96, 97,
    108, 109, 110, 112, 116,
    127, 128, 129, 130, 131, 133, 135, 137, 138, 139, 141, 143, 144, 145, 146, 147,
    177, 178, 179, 180, 181, 183, 185, 186, 187, 188, 189, 191, 193, 194, 195, 196, 197,
    208, 212, 216,
    226, 227, 228, 229, 231, 233, 234, 235, 237, 239, 240, 241, 243, 245, 246, 247, 248,
    254, 256, 258, 266, 268, 270,
    276, 277, 278, 279, 281, 283, 285, 289, 291, 293, 295, 296, 297, 298,
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
  const blankCells = [84, 251, 252, 253, 271, 272, 273, 311, 312, 313, 351, 352, 353, 371, 372, 373]
  const door = [286, 287, 288]


  let pacmanPosition = 463
  let direction = 'right'
  let count = 0


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
    } else {
      div.classList.add('smalldot')
    }
    // div.innerHTML = i



    grid.appendChild(div)
    cells.push(div)

    score.innerHTML = 'Ready?'

  }

  start.addEventListener('click', () => {
    cells[pacmanPosition].classList.add('pacman')

    function renderGame() {
      cells.forEach(cell => {
        cell.classList.remove('pacman')
      })
      cells[pacmanPosition].classList.add('pacman')
    }



    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        direction = 'right'
      } else if (event.key === 'ArrowLeft') {
        direction = 'left'
      } else if (event.key === 'ArrowDown') {
        direction = 'down'
      } else if (event.key === 'ArrowUp') {
        direction = 'up'
      }
    })


    setInterval(() => {
      if (direction === 'right') {
        if (pacmanPosition === 324) {
          pacmanPosition -= width
        } else if (cells[pacmanPosition + 1].classList.contains('smalldot')) {
          cells[pacmanPosition + 1].classList.remove('smalldot')
          count += 10
          score.innerHTML = 'Score: ' + count
        } else if (cells[pacmanPosition + 1].classList.contains('wall')) {
          return
        }
        pacmanPosition += 1
        // console.log('right')
      } else if (direction === 'left') {
        if (pacmanPosition === 300) {
          pacmanPosition += width
        } else if (cells[pacmanPosition - 1].classList.contains('smalldot')) {
          cells[pacmanPosition - 1].classList.remove('smalldot')
          count += 10
          score.innerHTML = 'Score: ' + count
        } else if (cells[pacmanPosition - 1].classList.contains('wall')) {
          return
        }
        pacmanPosition -= 1
        // console.log('left')
      } else if (direction === 'down') {
        if (cells[pacmanPosition + width].classList.contains('smalldot')) {
          cells[pacmanPosition + width].classList.remove('smalldot')
          count += 10
          score.innerHTML = 'Score: ' + count
        } else if (cells[pacmanPosition + width].classList.contains('wall') || cells[pacmanPosition + width].classList.contains('door')) {
          return
        }
        pacmanPosition += width
        // console.log('down') 
      } else if (direction === 'up') {
        if (cells[pacmanPosition - width].classList.contains('smalldot')) {
          cells[pacmanPosition - width].classList.remove('smalldot')
          count += 10
          score.innerHTML = 'Score: ' + count
        } else if (cells[pacmanPosition - width].classList.contains('wall')) {
          return
        }
        pacmanPosition -= width
        // console.log('up') 
      }
      renderGame()
    }, 170)

  })

  // console.log(dots)




}

document.addEventListener('DOMContentLoaded', main)


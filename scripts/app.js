function main() {

  const grid = document.querySelector('.grid')
  const width = 28
  const cells = []
  let pacmanPosition = 600
  let direction = 'right'


  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    div.classList.add('cell')
    grid.appendChild(div)
    cells.push(div)
  }

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
      if ((pacmanPosition % 28) - 27 === 0) {
        return
      }
      pacmanPosition += 1
      // console.log('right')
    } else if (direction === 'left') {
      if ((pacmanPosition % 28) === 0) {
        return
      }
      pacmanPosition -= 1
      // console.log('left')
    } else if (direction === 'down') {
      if (pacmanPosition > (cells.length - width - 1)) {
        return
      }
      pacmanPosition += width
      // console.log('down') 
    } else if (direction === 'up') {
      if (pacmanPosition < width) {
        return
      }
      pacmanPosition -= width
      // console.log('up') 
    } 
    renderGame()
  }, 150)





}

document.addEventListener('DOMContentLoaded', main)
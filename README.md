![General Assembly Logo](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# PAC-MAN


The classic Pac-Man game with the same retro feel!
[Try it out!](https://alibhimani.com/pacman) 

(Only works on large screen devices with keyboard at the moment)

This was my first project during the Software Engineering Immersive course at General Assembly London.

![Pac-Man gameplay](./readme_imgs/screenshot.gif)

## Brief
Pac Man is a classic arcade game from the 80s. The player aims eat all the food in a maze whilst being hunted by ghosts.
The aim is to achieve the highest score possible before being killed by the ghosts.

### Requirements
- The player should be able to clear at least one board
- The player's score should be displayed at the end of the game

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- Git/GitHub
- Adobe Photoshop 2020
- Google Fonts

## Planning
I began this project by planning out all the different classes I would need. These were:

- Pac-Man
- Ghosts (named Greeny, Pinky, Blueboy and Clyde, a tribute to the names of the original Pac-Man ghosts)
- Small pellets (named smalldot)
- Power pellets (named bigdot)
- Walls
- Wrap (the gates on the left and right which allow Pac-Man and the ghosts to teleport from one side of the maze to the other)
- Door (the door for the ghosts to exit their holding pen)

After concluding the list of classes, I made notes on how they would all interact with each other, particularly Pac-Man.

I then had to plan how I wanted the maze to look. To do this I created a simple grid on paper and marked out all of the cells and which class they would contain. Once this was done I declared all the constant variables and set their positions:

``` 
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
```
For all the moving parts, I used 'let' variables and set all of their positions:

```
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
```
  
## Future Improvements
### Additional Features
This project is far from complete! There are many features I would like to add. These include:

- Pathfinding for the ghosts to actually track Pac-Man rather than moving randomly
- Scared mode where the ghosts run away from Pac-Man upon the consumption of a power pellet by the player, truer to the original game
- Mobile-friendly
- Save highscores using local storage
- Additional levels with differently styled mazes
- Sound off
- Pause game

### Bugs
Currently there are cells on the grid where the ghosts can get stuck. Additionally there are cells where the ghosts can't reach. In theory, once a pathfinding algorithm is implemented, the ghosts will be able to escape areas where they are trapped and travel to all cells, thus fixing the bug. 

Another bug is that if the player changes direction into a wall or the opposite direction they are currently travelling, Pac-Man freezes. To fix this I am going to adjust Pac-Man so that he carries on moving but checks his surroundings and only changes to the user-stated direction when it is possible to do so, again, truer to the original game.

### Styling
In the future I would like to add eyes to the ghosts which look towards Pac-Man. I have also been working on Pac-Man's mouth which will face the direction he his moving as well as open and close as he moves and eats pellets.







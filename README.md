# Turn-based Chess-like Game

A turn-based chess-like game where two players compete on a 5x5 grid. The game follows a server-client architecture with real-time communication through WebSockets and a web-based user interface.

![Grey minimalist business project presentation ](https://github.com/user-attachments/assets/c763d267-da69-4859-b5e7-bae8a6b77c8e)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Built With🕹️

- Node.js - Server-side runtime
- Express - Web application framework
- WebSocket - Real-time communication protocol
- HTML/CSS/JavaScript - Front-end technologies

### Prerequisites


- Node.js
- npm (Node Package Manager)
- A modern web browser

### Installation🚀

1. Clone the repository: [https://github.com/yazdanhaider/Yazdan_Haider_21BCE10015](https://github.com/yazdanhaider/Yazdan_Haider_21BCE10015)
2. Navigate to the server directory:
   ```bash
   cd server

3. Install the required dependencies:
   ```bash
   npm i

4. Start the server:
   ```bash
   npm start

5. Open the `index.html` file in your web browser using a live server.

## Game Rules🤝
Objective:
Eliminate all opponent characters to win the game.

**Game Setup🌐:**

Two players, each controlling 5 characters (Pawns, Hero1, Hero2).
Characters are placed on the starting row of a 5x5 grid.
Characters and Movements:

**Pawn:** Moves 1 block in any direction (L, R, F, B).
**Hero1:** Moves 2 blocks straight, eliminating any opponent's character in its path.
**Hero2:** Moves 2 blocks diagonally, eliminating any opponent's character in its path.
Move Command Format:

**Pawn/Hero1:** <Character>:<Move> (e.g., P1, H1)
**Hero2:** <Character>:<Move> (e.g., H2, FL)

**Game Flow🤖:**

Players alternate turns, making one move per turn.
Characters eliminate opponents by moving into their space.
Invalid Moves:

Out of bounds or targeting friendly characters will result in retrying the move.

**Winning Condition🏆:**

**The game ends when one player eliminates all opposing characters.🏆🎊**

## Authors

- Yazdan Haider 🇮🇳

<h1 align="center">
<a href='#'><img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="600px"/></a>
  <br>
  <br>
  <div>
    <a href="https://github.com/marcelldac/GameRave/issues">
        <img src="https://img.shields.io/github/issues/marcelldac/GameRave?color=fab387&labelColor=303446&style=for-the-badge">
    </a>
    <a href="https://github.com/marcelldac/GameRave/stargazers">
        <img src="https://img.shields.io/github/stars/marcelldac/GameRave?color=ca9ee6&labelColor=303446&style=for-the-badge">
    </a>
    <a href="https://github.com/marcelldac/GameRave">
        <img src="https://img.shields.io/github/repo-size/marcelldac/GameRave?color=ea999c&labelColor=303446&style=for-the-badge">
    </a>
    </div>
   </h1>

<h1 align="center">🎮 GameRave 🎮</h1>

# GameRave - Game Reviews

GameRave is an API built in Node.js with a PostgreSQL database running on Docker and utilizing TypeORM. Users can create games and provide critiques about them. Additionally, it features a system of likes and dislikes. Perfect for you to develop your frontend with this completely free API.

## How to Run?

Steps to run this project:

1. Run `npm i` command
2. Run `docker-compose up -d` command
3. Run `npm run migration:run` command
4. Run `npm start` command

## Features

- Create, Read and Delete Games
- Create, Read, Update and Delete Reviews
- Like a Game
- Like a Review
- Dislike a Game
- Dislike a Review
- Games can have multiples reviews

### GameRave API Documentation

#### Returns all Games

```http
  GET /games
```

#### Return one game

```http
  GET /games/:id
```

#### Create a Game

```http
  POST /games
```

| Parameters | Type     | Description              |
| :--------- | :------- | :----------------------- |
| `name`     | `string` | **Mandatory**. Game Name |

#### Delete a Game

```http
  DELETE /games/:id
```

#### Returns all Reviews

```http
  GET /reviews
```

#### Return one Review

```http
  GET /reviews/:id
```

#### Create a Review

```http
  POST /reviews
```

| Parameters    | Type      | Description                                                  |
| :------------ | :-------- | :----------------------------------------------------------- |
| `title`       | `string`  | **Mandatory**. Review's Title                                |
| `description` | `string`  | **Mandatory**. Review's Description                          |
| `gameName`    | `boolean` | **Mandatory**. The name of the game that the review was made |

#### Update a Review

```http
  PUT /reviews/:id
```

| Parameters    | Type      | Description                                   |
| :------------ | :-------- | :-------------------------------------------- |
| `title`       | `string`  | Review's Title                                |
| `description` | `string`  | Review's Description                          |
| `gameName`    | `boolean` | The name of the game that the review was made |

#### Delete a Review

```http
  DELETE /reviews/:id
```

#### Like a Game

```http
  POST /like/:id
```

#### Like a Review

```http
  POST /like-review/:id
```

#### Dislike a Game

```http
  POST /dislike/:id
```

#### Dislike a Review

```http
  POST /dislike-review/:id
```

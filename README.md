# Funny Movies

- ## Backend

  - NodeJS
  - Mongoose

  Run `npm start` to start server

  APIs list:

  - GET `/api/users`: Get list users
  - POST `/api/auth/signin`: Sign in webpage using an account
  - POST `/api/auth/signup`: Sign up an account
  - GET `/api/movies`: Get list movies
  - POST `/api/movie`: Post a movie
  - POST `/api/movie/upvote`: Up vote a movie
  - POST `/api/movie/downvote`: Down vote a movie

- ## Frontend

  - ReactJS
  - Ant Design

  Run `npm start` to start webpage

  Pages list:

  - `/`: Homepage - Display list movies of all users. A user can up vote or down vote a movie one time.
  - `/post-movie`: Used to post a movie by pasting in a youtube video url

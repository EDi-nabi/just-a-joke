# JustAJoke

Click and laugh application in Angular.
[Online demo](http://nabi.pl/projects/just-a-joke)

## Run the app

Local:
`npm start`

Local with server side rendering:
`npm run serve:ssr`

Docker with server side rendering:
Build docker image
`docker build -t just-a-joke .`
Run docker image
`docker run --rm -it -p 4000:4000/tcp just-a-joke:latest`

# What is it all about

Just a Joke is an Angular application that shows a list of jokes taken from the [Joke API](https://sv443.net/jokeapi/v2/). Each joke is presented with an image taken from [Lorem Picsum](https://picsum.photos/).\
It utilizes [NgRx](https://ngrx.io) for state management and [Async local storage](https://github.com/cyrilletuzi/angular-async-local-storage) for, well, local storage.

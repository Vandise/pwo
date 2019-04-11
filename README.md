# Multiplayer Online Game with Canvas and MelonJS

This is a multi-player online game built with MelonJS, Canvas, Node, and React.

## Servers

The servers are built with webpack with the following command:

```bash
$$ > cd servers && npm install && npm run build
```

or, if you've already installed the dependencies

```bash
$$ > cd servers && npm run build
```

this will generate all the servers in the `bin` directory.

### Server boot order

Servers should be booted in the following order:

- Login Server
- Game Server
- Map Server

each server has a variety of parameters specify ports, hosts, etc. The defaults currently allow you to just run

```bash
$$ > cd servers && node ./bin/the-server-to-start.js
```

## Client

The client is ran with webpack by the following command

```bash
$$ > cd client && npm install && npm start
```

or, if you've already installed the dependencies

```bash
$$ > cd client && npm start
```

there currently isn't a build process available yet to serve on the web. 

### Unit tests

Unit tests can be ran by

```bash
$$ > cd client && npm run test
```
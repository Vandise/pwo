import Events from '../../shared/events';

export default (server) => {
  let socket = server.gsSocket;

  socket.on(Events.SERVER.PLAYER.UPDATE_POSITION, (data) => {
    const { playerID, position, velocity } = data;

    //server.logger.info(`Updating player(${playerID}) position| x: ${position.x}, y: ${position.y}, vx:  ${velocity.x}, vy: ${velocity.y}`);

    const x = position.x + velocity.x;
    const y = position.y + velocity.y;

    const newPostion = JSON.stringify({
      x, y
    });

    server.db.query(`
      UPDATE users
      SET position = '${newPostion}'
      WHERE id = ${playerID}
    `);
  });

};
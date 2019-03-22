import GameServer from './obj/gameServer';

(() => {
  const GS = new GameServer(process.argv);

  GS.main();

  process.stdin.resume();

  process.on('SIGINT', () => {
    GS.close();
    process.exit(2);
  });
})();
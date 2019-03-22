import MapServer from './obj/mapServer';

(() => {
  const MS = new MapServer(process.argv);

  MS.main();

  process.stdin.resume();

  process.on('SIGINT', () => {
    MS.close();
    process.exit(2);
  });
})();
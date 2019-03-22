import LoginServer from './obj/loginServer';

(() => {
  const LS = new LoginServer(process.argv);

  LS.main();

  process.stdin.resume();

  process.on('SIGINT', () => {
    LS.close();
    process.exit(2);
  });
})();
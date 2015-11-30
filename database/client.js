var ActorDB = require('actordb');

var client = ActorDB.connectSingle({
  host: 'gescoDBM.cloudapp.net',
  port: 33306,
  username: "usuario",
  password: "usuario"
});

module.exports = client;

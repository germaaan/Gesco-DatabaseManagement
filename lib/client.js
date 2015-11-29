var ActorDB = require('actordb');
var client = ActorDB.connectSingle({
  host: '127.0.0.1',
  port: 33306,
  username: "usuario",
  password: "usuario"
});

module.exports = client;

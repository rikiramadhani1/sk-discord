require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client()

const connectionPool = [];
const connection = () => {
  return { index: null, config: '', client: null };
};

async function createConnectionClient(){
  setTimeout(() => {
    for (const connection of connectionPool) {
      try {
        connection.client = client
        /* istanbul ignore next */
        connection.client.on('error', (error) => {
          console.error(`[MsgErr: ${error.message}]`)
          setTimeout(() => {
            console.error(`[Msg: Trying re-connect on Discord-bot at ${new Date().toISOString()}]`);
            this.init();
            console.clear();
          }, 5000)
        });
      } catch (error) {
        console.error(error)
        setTimeout(() => {
          console.error(`[Msg: Trying re-connect on Discord-bot at ${new Date().toISOString()}]`);
          this.init();
          console.clear();
        }, 5000)
      }
    }
  }, 3000)
}

function addConnectionToPool(){
  const databases = [
    {
      index: process.env.DISCORD_INDEX,
      config: {
        token: process.env.DISCORD_TOKEN
      }
    }
  ];
  for (const database of databases) {
    const newConnection = connection();
    newConnection.index = database.index;
    newConnection.config = database.config;
    connectionPool.push(newConnection);
  }
}

async function init(){
  await createConnectionClient(),
    addConnectionToPool()
}

function getConnection(index) {
  for (const connection of connectionPool) {
    if (connection.index === index) {
      return connection.client;
    }
  }
  return null;
}

client.login(process.env.DISCORD_TOKEN);

module.exports = {
  init,
  getConnection
}

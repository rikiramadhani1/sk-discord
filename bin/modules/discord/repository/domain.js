const discord = require('../../../helpers/discord').getConnection('inpoin-notification-discord');
const command = require('./command');
const Command = new command(discord);
class Domain{
  constructor(InMemDB) {
    this.database = InMemDB;
  }
  async bugCatcher(idBug, errorMessage, fileLocation, functionName, bugAppeared, codeError){
    return Command.sendBug(idBug, errorMessage, fileLocation, functionName, bugAppeared, codeError)
  }

  async hoursPatroly( idLog, errorMessage, fileLocation, functionName, bugAppeared, level, codeResponse){
   return Command.sendLog(idLog, errorMessage, fileLocation, functionName, bugAppeared, level, codeResponse)
  }

}

module.exports = Domain

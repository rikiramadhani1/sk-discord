const commandHandler = require('../repository/command_handler');
class handlers {

  bugCatcher(idBug, errorMessage, fileLocation, functionName, codeError) {
    const data = {idBug, errorMessage, fileLocation, functionName, codeError};
    let isEmpty = false;
    for(var key in data){
      if(data[key] === "" || data[key] === undefined || data[key] === null){
        console.log(key + " is empty.")
        isEmpty = true;
      }
    }
    return ((!isEmpty) ?
        commandHandler.bugCatcher(idBug, errorMessage, fileLocation, functionName, codeError) :
        "Please completed all field"
    )
  }

  hoursPatroly(idLog, responseMessage, fileLocation, functionName, level, codeResponse) {
    const data = {idLog, responseMessage, fileLocation, functionName, level, codeResponse};
    let isEmpty = false;
    for(var key in data){
      if(data[key] === "" || data[key] === undefined || data[key] === null){
        console.log(key + " is empty.")
        isEmpty = true;
      }
    }
    return ((!isEmpty) ?
      commandHandler.hoursPatroly(idLog, responseMessage, fileLocation, functionName, level, codeResponse) :
      "Please completed all field"
    )

  }

}

module.exports = handlers;

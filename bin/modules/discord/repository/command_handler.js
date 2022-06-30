const InMemDB = require('../../../helpers/in-memory-databases/database');
const domain = require('./domain');
const Domain = new domain();

const bugCatcher = (idBug, errorMessage, fileLocation, functionName, codeError) => {
  const theBug = InMemDB.get(idBug)
  if(theBug){
    const now = (new Date().getTime()) / 1000
    const past = (new Date(theBug.firstAppeared) / 1000)
    if (now - past >= 600) { //Cek apakah kelewat 10 menit
      const formatData = { "idBug" : idBug, "appeared" : 0, "firstAppeared" : new Date() }
      InMemDB.set(idBug, formatData)
      return Domain.bugCatcher(idBug, errorMessage, fileLocation, functionName, 0)
    } else {
      const formatData = { "idBug" : idBug, "appeared" : theBug.appeared + 1, "firstAppeared" : theBug.firstAppeared }
      InMemDB.set(idBug, formatData)
      return Domain.bugCatcher(idBug, errorMessage, fileLocation, functionName, theBug.appeared + 1, codeError)
    }
  } else {
    const formatData = { "idBug" : idBug, "appeared" : 0, "firstAppeared" : new Date() }
    InMemDB.set(idBug, formatData)
    return Domain.bugCatcher(idBug, errorMessage, fileLocation, functionName, 0, codeError)
  }
}

const hoursPatroly = (idLog, responseMessage, fileLocation, functionName, level, codeResponse) => {
  const theBug = InMemDB.get(idLog)
  if(theBug){
    const now = (new Date().getTime()) / 1000
    const past = (new Date(theBug.firstAppeared) / 1000)
    if (now - past >= 600) { //kalo kelewat 10 menit
      const formatData = { "idLog" : idLog, "appeared" : 0, "firstAppeared" : new Date() }
      InMemDB.set(idLog, formatData)
      return Domain.hoursPatroly(idLog, responseMessage, fileLocation, functionName, 0, level, codeResponse)
    } else { //kalo belum kelewat 10 menit
      const formatData = { "idLog" : idLog, "appeared" : theBug.appeared + 1, "firstAppeared" : theBug.firstAppeared }
      InMemDB.set(idLog, formatData)
      return Domain.hoursPatroly(idLog, responseMessage, fileLocation, functionName, theBug.appeared + 1, level, codeResponse)
    }
  } else { //kalo bug nya belum ada
    const formatData = { "idLog" : idLog, "appeared" : 0, "firstAppeared" : new Date() }
    InMemDB.set(idLog, formatData)
    return Domain.hoursPatroly(idLog, responseMessage, fileLocation, functionName, 0, level, codeResponse)
  }
}

module.exports = {
  bugCatcher,
  hoursPatroly
}
//
// const arr = [{"idBug":"test","appeared":0,"firstAppeared":"2021-01-22T03:55:03.609Z"}];
// function addArr(){
//   const data = {"idBug" : "test", "serviceName" : "testService", "errorMessage" : "error", "fileLocation" : "/test/test.js"}
//   const checkIfIDAlreadyListed = () => {
//     return (arr.find((x) => x.idBug === data.idBug) ? true : false)
//   }
//
//   if(!checkIfIDAlreadyListed()){ //Untuk insert ke array jika idBug belum ditemukan
//     console.log("true")
//     const date = new Date()
//     arr.push({"idBug" : data.idBug, appeared : 0, firstAppeared : date})
//   } else {
//     console.log("false")
//     const checkIfThisBugAppearedInLast10Minutes = () => {
//       var tenMinutes = 1000 * 60 * 10;
//       var findSameBugWithIn10Minutes = arr.find((x) => ((new Date().getTime() - new Date(x.firstAppeared).getTime()) < tenMinutes) ? true : false)
//       console.log(findSameBugWithIn10Minutes)
//       return findSameBugWithIn10Minutes
//     }
//   }
//
// }
// addArr()


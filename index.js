require('./bin/helpers/discord').init();
const handler = require('./bin/modules/discord/handler/handler')
module.exports = {
  channel : new handler()
}

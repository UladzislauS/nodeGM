const config = require('./config/config.json');
const models = require('./models');

console.log(config.name);
new models.Product();
new models.User();

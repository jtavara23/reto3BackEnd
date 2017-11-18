'use strict'

//REQUERIMIENTOS    
var router_main = require('../controller/main.js');
var router_user = require('../api/user.js');
var router_amigo = require('../api/amigo.js')

//RUTEO
var routers = function (server) {
    server.use('/', router_main);
    server.use('/api/', router_amigo);
    server.use('/api/', router_user);
}


//EXPORTACION
module.exports = routers;
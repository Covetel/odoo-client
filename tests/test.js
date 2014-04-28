var openerp = require('../lib/openerp.js');

var opts = {
    login: 'admin',
    password: '123321...',
    db: 'cooperativa-test',
    host: 'localhost',
    port: '8069'
}

// create the client
var client = new openerp(opts);

// auth
client.auth(on_auth);

// show databases
//client.database_getlist(callback);

function callback (err,response){
    console.dir(response.result);
}

function on_auth (err,response,sid){
    if (err) throw err;

    if (response.result.uid){
	//save session
	client.session_id = response.result.session_id;
	client.context = response.result.user_context;
	client.sid = sid;

	// Get model struct
	client.get_model('res.partner',callback);
    }
}

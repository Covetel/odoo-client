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

function callback (err,response){
    if (err) throw err;
    
    console.dir(response.result);
}

function on_auth (err,response,sid){
    if (err) throw err;

    if (response.result.uid){
	//save session
	client.session_id = response.result.session_id;
	client.context = response.result.user_context;
	client.sid = sid;

	// Search an account by code equal
	client.search('account.account', callback, ['code','=','1.1.2']);

	// Search an account by code equal
	client._search('account.account', callback, ['code','=','1.1.2'], ['id','name']);

	// Search an account by code is not equal 
	client._search('account.account', callback, ['code','!=','1.1.2'], ['id','name']);
		
	// search an account by code contains 1.1.2
	client._search('account.account', callback, ['code','ilike','1.1.2'], ['id','name']);

	// search an account by code contains 1.1.2
	client._search('account.account', callback, ['code','not like','1.1.2'], ['id','name']);

	// search an account by code contains 1.1.2
	client._search('account.account', callback, undefined, ['id','name']);

	// search all
	client._search('account.account', callback, undefined, undefined, 0, 0);

	// search all sort by field type asc
	client._search('account.account', callback, undefined, ['id', 'name', 'type'], 0, 0, 'type ASC');

	// search all sort by field type desc 
	client._search('account.account', callback, undefined, ['id', 'name', 'type'], 0, 0, 'type DESC');

    }
}

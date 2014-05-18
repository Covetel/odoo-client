var odoo = require('../lib/odoo.js');

var opts = {
    login: 'admin',
    password: '123321...',
    db: 'cooperativa-test',
    host: 'localhost',
    port: '8069'
}

// create the client
var client = new odoo(opts);

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
	//client.get_model('res.partner',callback);

	// Create record
	var args = [
	    {
		"journal_id" : 6,
		"credit" : 0,
		"ref" : false,
		"date" : "2014-04-28",
		"move_id" : false,
		"name" : "nombre",
		"period_id" : 5,
		"account_id" : 5,
		"debit" : 100,
		"statement_id" : false,
		"partner_id" : false,
		"date_maturity" : false,
		"account_tax_id" : false,
		"analytic_account_id" : false
	     }
	];
	
	client._create('account.move.line', args, undefined, undefined, callback);
    }
}

var jayson = require('jayson');

module.exports =  (function (){
    
    function OpenERP(opts){
	this.opts = opts;

	if (opts && opts.port){
	    this.port = opts.port;
	} else {
	    this.port = '8069';
	}
	
	if (opts && opts.host){
	    this.host = opts.host;
	} else {
	    this.host = 'localhost';
	}

	this.protocol = 'http';
	this.base_location = this.protocol + '://' + this.host + ':' + this.port;
	
	this.paths = {
	    'auth': this.base_location + '/web/session/authenticate',
	    'databases': this.base_location + '/web/database/get_list',
	};
    }

    OpenERP.prototype.database_getlist = function (cb) {
	var client = jayson.client.http(this.paths.databases);

	client.request('call',{'session_id': '', 'context':{}}, 'r8', cb);

    };

    OpenERP.prototype.auth = function (cb){
	var json_client = jayson.client.http(this.paths.auth);

	var params = {
	    'db': this.opts.db, 
	    'login': this.opts.login,
	    'password': this.opts.password,
	    'base_location': this.base_location,
	    'session_id': '',
	    'context': {}
	}
	
	json_client.request('call', params, 'r8',cb);	
    }

    OpenERP.prototype.get_model = function (cb){
	var json_client = jayson.client.http(this.paths.auth);
    }
    
    return OpenERP;
})();

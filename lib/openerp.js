var jayson = require('jayson');
var http = require('http');

module.exports =  (function (){
    
    function OpenERP(opts){
	this.opts = opts;
	this.session_id = '';
	this.context = '';
	this.sid = '';

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
	    'dataset_call_kw': this.base_location + '/web/dataset/call_kw',
	};
    }

    OpenERP.prototype.database_getlist = function (cb) {
	var client = jayson.client.http(this.paths.databases);

	client.request('call',{'session_id': '', 'context':{}}, 'r8', cb);

    };

    OpenERP.prototype.auth = function (cb){

	var params = {
	    'db': this.opts.db, 
	    'login': this.opts.login,
	    'password': this.opts.password,
	    'base_location': this.base_location,
	    'session_id': '',
	    'context': {}
	}

	var json = JSON.stringify({
	    'jsonrpc': '2.0',
	    'method': 'call',
	    'params': params
	});

	var options = {
	    'host': this.host,
	    'port': this.port,
	    'path': '/web/session/authenticate',
	    'method': 'POST',
	    'headers': {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Content-Length": json.length,
	    }
	};


	var req = http.request(options, function(res){
	    var response = '';

	    res.setEncoding('utf8');
	    
	    var sid = res.headers['set-cookie'][0].split(';')[0];
	    
	    res.on('data', function (chunk){
		response += chunk;
	    });

	    res.on('end',function(){
		if (res.statusCode < 200 || res.statusCode >= 300) {
		    var err = new Error(response);
		    err.code = res.statusCode;
		    return cb(err);
		} else {
		    return cb(null,JSON.parse(response),sid);
		}
	    });
	});

	req.write(json);
    }


    OpenERP.prototype._call = function (model, method, cb, args, kwargs, options){

	args = args || [
	    false,
	    "tree",
	    {
		"uid": this.context.uid,
		"lang": this.context.lang,
		"tz": this.context.tz,
	    },
	    true
	];
	
	kwargs = kwargs || {};

	options = options || {
	    host: this.host,
	    port: this.port,
	    path: '/web/dataset/call_kw',
	    headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Cookie": this.sid + ';',
	    }
	};

	var params = {
	    "session_id": this.session_id,
	    "kwargs": kwargs,
	    "context" : this.context,
	    "args": args,
	    "model": model,
	    "method": method,
	}

	var json_client = jayson.client.http(options);
	
	json_client.request('call', params, 'r8', cb);
    }

    OpenERP.prototype._create = function (model, args, kwargs, options, cb) {
	this._call(model, "create", cb, args, kwargs, options);
    }
    
    OpenERP.prototype.get_model = function (model,cb){
	this._call(model,"fields_view_get", cb);
    }

    
    
    return OpenERP;
})();

## OpenERP JSON-RPC Client for NodeJS

### SYNOPSIS

```js
var openerp = require('./lib/openerp.js');

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
client.auth(callback);

// show databases
client.database_getlist(callback);

// get model

function callback (err,response){
    console.dir(response);
}
```

## odoo JSON-RPC Client for NodeJS

[![Join the chat at https://gitter.im/Covetel/odoo-client](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Covetel/odoo-client?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### SYNOPSIS

```js
var odoo = require('./lib/odoo.js');

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
client.auth(callback);

// show databases
client.database_getlist(callback);

// get model

function callback (err,response){
    console.dir(response);
}
```

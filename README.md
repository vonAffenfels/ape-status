# ape-status

## Installation

```
    npm install ape-status --save
```

## Usage

### Initialization
```javascript
var apeStatus = require("ape-status");

apeStatus.configure({
    root: __dirname                             // required! should be the root path of your application OR the path on the local maschine where you want the APPINFO.json to be.
    
    info: {...}                                 // everything you want to end up in the APPINFO.json (can be also added during startup)
    infoName: "NAME_OF_INFO.json"               // default APPINFO.json 
    path: "/path/for/simple/health/check",      // default /ape/status
    pathBackends: "/path/for/backend/checks"    // default /ape/status/backends,
});
```

### Bind to express instance

```javascript
var expressApp = require("express")();

expressApp.use(apeStatus.express);
```

### Info File

#### Add Info
```javascript
apeStatus.info("port", 1337);
```

#### Save To File
```javascript
apeStatus.saveJSONInfo();
```

### Add Backends

#### MYSQL Pool 
```javascript
var pool = mysql.createPool({...});

apeStatus.mysql("NAME YOUR CONNECTION", pool);
```

#### Mongoose connection 
```javascript
mongoose.connect(...);

apeStatus.mongoose(mongoose.connection); // The collection name will be used as the name for the status page
```

#### Webservice
```javascript
apeStatus.webservice("NAME YOUR WEBSERVICE", "URL TO CHECK");
```

## Response example

/ape/status => 200 OK (no body)

/ape/status/backends

```JSON
{
    MYSQL-main: {
        connected: true
    },
    WEBSERVICE-googlemaps: {
        available: true,
        response_time: 57   // MS
    },
    MONGOOSE-main: {
        connected: true
    }
}
```
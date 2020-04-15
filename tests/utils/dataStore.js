


var fs = require('fs');

function dataStore(dataFile) {
    var dataJson = fs.readFileSync(dataFile);
    this.data = JSON.parse(dataJson);
}


dataStore.prototype.getEntity = function (entityName, dataCallback) {
    if (!this.data) {
        dataCallback(new Error('Data not initialized'))
    } else if (this.data[entityName]) {
        return this.data[entityName]
    } else {
        if(dataCallback)
            dataCallback(new Error('Entity Data not found'));
        else
        return undefined;    
    }
}


module.exports = dataStore;
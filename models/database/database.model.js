const DB = require('./connections.model');
const { format } = require("mysql");

class DatabaseModel {
    constructor(){
        this.mysqlFormat = format;
    }

    runQueryStatement = (query) => {

        return new Promise((resolve, reject ) => {
            DB.query(query, ( error, result ) => {
                let response_data = { status: false, result: null, error: null }

                if(error){
                    console.log(error);
                    response_data.error = error;
                    resolve(response_data);
                }
                else{
                    response_data.status = true;
                    response_data.result = result;
                    resolve(response_data);
                }
            })
        })
    }
}

module.exports = DatabaseModel;
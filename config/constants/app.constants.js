const { load } = require('js-yaml');
const { readFileSync }  = require('fs');
const path = require('path');

let AppConstants = {};

try {
    let env_file = `development`;

    let env_constants = readFileSync(path.join(__dirname, `../${env_file}.env.yml`), 'utf-8');
    let data = load(env_constants);

    for(let key in data){
        AppConstants[key] = data[key];
    }
} 
catch (error) {
    console.log(error);
    process.exit(1);
}

module.exports = AppConstants;
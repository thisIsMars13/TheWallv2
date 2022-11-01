class GlobalHelper {
    constructor(){
        /* Set default variable if needed */
    }

    /** 
    * Function that handles the sanitation of parameters from FE form body
    * Last updated November 1, 2022
    * @author Jomar
    */
    sanitizeParams = (required_params, optional_params, req) => {
        let response_data = { status: false, result: null, error: null }

        try {
            let all_fields = [ ...required_params, ...optional_params ];
            let missing_fields = [];
            let sanitized_params = {};

            /* Loop through all the firlds and compare each in the req.body to determine the keys that are needed */
            for(let index in all_fields){
                let param = all_fields[index];
                let param_value = req?.body[param] || "";
                
                if( toString(param_value).trim() === "" && required_params.includes(param) ){
                    missing_fields.push(param);
                }
                else{
                    sanitized_params[param] = param_value;
                }
            }

            /* Check if there are required field that are missing, if so, return error */
            if(missing_fields.length){
                response_data.error = "Missing Parameters";
                response_data.result = missing_fields;
            }
            else{
                response_data.status = true;
                response_data.result = sanitized_params;
            }
        } 
        catch (error) {
            console.log(error)
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = GlobalHelper;
const UsersHelper = require('../helpers/users.helper');
const DatabaseModel = require('./database/database.model')

class UsersModel extends DatabaseModel{
    constructor(){
        super();
    }

    /** 
    * Function that handle registration process of the user.
    * Last updated November 1, 2022
    * @author Jomar
    */
    registerUser = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { first_name, last_name, email_address, password } = params;

            /* Check if all the required parameters exist */
            if(first_name && last_name && email_address && password){
                let fetch_user_query = this.mysqlFormat(`SELECT id FROM users WHERE email_address = ? LIMIT 1`, [email_address]);

                let { result: fetch_user_result } = await this.runQueryStatement(fetch_user_query);

                /* Check if the email address was already in use */
                if(!fetch_user_result.length){
                    let usersHelper = new UsersHelper();
                    /* Has the pass word provided by the user */
                    let { status: hash_password_status, result: hashed_password, error } = await usersHelper.hashPassword(password);
    
                    /* Check if the hashing of password was success */
                    if(hash_password_status){
                        let insert_user_query = this.mysqlFormat(`
                            INSERT INTO users(first_name, last_name, password, email_address, created_at, updated_at) 
                            VALUES(?, ?, ?, ?, NOW(), NOW())`, [first_name, last_name, hashed_password, email_address]);
                        
                        /* Insert user data in DB */
                        let { status: insert_user_status, result: insert_user_result, error } = await this.runQueryStatement(insert_user_query);
                        
                        if(insert_user_status && insert_user_result.affectedRows > 0){
                            response_data.status = true;
                            response_data.result = "User succesfully registered";
                        }
                        else{
                            response_data.error = error;
                        }
                    }
                    else{
                        response_data.error = error;
                    }
                }
                else{
                    response_data.error = "Email address already in use.";
                }
            }
            else{
                response_data.error = "Missing parameters to complete the registration of the user";
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }

    /** 
    * Function that handle login process of the user.
    * Last updated November 1, 2022
    * @author Jomar
    */
    loginUser = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { email_address, password } = params;

            /* Check if all the required parameters exist */
            if(email_address && password){
                let fetch_user_query = this.mysqlFormat(`SELECT id, password FROM users WHERE email_address = ? LIMIT 1`, [email_address]);

                let { status: fetch_user_status, result: fetch_user_result, error } = await this.runQueryStatement(fetch_user_query);

                /* Check if user is registered */
                if(fetch_user_status && fetch_user_result.length){
                    let [{ password: hashed_password, id: user_id }] = fetch_user_result;
                    let usersHelper = new UsersHelper();
                    /* Compare the provided password and the stored password */
                    let { status: compare_password_status } = await usersHelper.comparePassword({ password, hashed_password });

                    if(compare_password_status){
                        response_data.status = true;
                        response_data.result = { user_id };
                    }
                    else{
                        response_data.error = "Invalid password";
                    }
                }
                else{
                    response_data.error = error;
                    response_data.message = "User is not yet registered";
                }

            }
            else{
                response_data.error = "Missing parameters to complete login process"
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }
}

module.exports = UsersModel;
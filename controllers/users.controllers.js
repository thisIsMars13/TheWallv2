const GlobalHelper = require('../helpers/global.helper');
const UsersModel =  require('../models/users.model');

class UsersController{
    constructor(){
        /* Set default variable if needed */
    }

    /** 
    * Function that handles login request from FE
    * Last updated November 1, 2022
    * @author Jomar
    */
    loginUser = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            /* Check if the user is already logged in, if so redirect to wall page */
            if(req.session.general){
                response_data.redirect = "/wall";
            }
            else{
                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in login process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["email_address", "password"], [], req);
            
                /* Check if sanitation is success */
                if(sanitation_status){
                    let usersModel = new UsersModel();
                    /* Set login process in model */
                    let { status: login_user_status, result: login_user_result, error, message } =  await usersModel.loginUser(sanitation_result);
    
                    /* Check if the login process was success, if so, set session data */
                    if(login_user_status){
                        req.session.general = { user_id: login_user_result.user_id };
                        response_data.redirect = "/wall";
                    }
                    else{
                        response_data.error = error;
                        response_data.message = message;
                    }
                }
                else{
                    response_data.error = error;
                }
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error = error;    
        }

        /* Check if the user needs to be redirected */
        if(response_data.redirect){
            res.redirect(response_data.redirect);
        }
        else{
            res.json(response_data);
        }
    }

    /** 
    * Function that handles registration request from FE
    * Last updated November 1, 2022
    * @author Jomar
    */
    registerUser = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            /* Check if the user is already logged in, if so redirect to wall page */
            if(req.session.general){
                response_data.redirect = "/wall";
            }
            else{
                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in registration  process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["email_address", "first_name", "last_name", "password"], [], req);
    
                if(sanitation_status){
                    let usersModel = new UsersModel();
                    /* Set registration process in model */
                    let { status: insert_user_status, result: insert_user_result, error} =  await usersModel.registerUser(sanitation_result);
    
                    /* Check if the regsitration process was success, if so, return success message */
                    if(insert_user_status){
                        response_data.status = true;
                        response_data.result = insert_user_result;
                    }
                    else{
                        response_data.error = error;
                    }
                }
                else{
                    response_data.error = error;
                }
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error = error;    
        }

        /* Check if the user needs to be redirected */
        if(response_data.redirect){
            res.redirect(response_data.redirect);
        }
        else{
            res.json(response_data);
        }
    }
}

module.exports = UsersController;
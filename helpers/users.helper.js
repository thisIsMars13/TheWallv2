const bcrypt = require('bcrypt');

class UsersHelper{
    constructor(){

    }

    /** 
    * Function that handles the hashing of password using bcrypt
    * Last updated November 1, 2022
    * @author Jomar
    */
    hashPassword = async(password) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let hash_password = await bcrypt.hash(password, 10);

            response_data.status = true;
            response_data.result = hash_password;
        } 
        catch (error) {
            console.log(error);
            response_data.error = error;
        }

        return response_data;
    }

    /** 
    * Function that handles the comparison of the stored hash password and the provided password of user
    * Last updated November 1, 2022
    * @author Jomar
    */
    comparePassword = async(params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { password, hashed_password } = params;

            response_data.status = await bcrypt.compare(password, hashed_password);
        } 
        catch (error) {
            console.log(error);
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = UsersHelper;
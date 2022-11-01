const GlobalHelper = require('../helpers/global.helper');
const WallsModel = require('../models/walls.model')

class WallControllers{
    constructor(){

    }

    /** 
    * Function that handles the create post request
    * Last updated November 1, 2022
    * @author Jomar
    */
    createPost = async (req, res) => {
        let response_data = { status: false, result: null, error: null };
        
        try {
            /* Check if session exist if so, proceed with rendering of wall data */
            if(req.session.general){
                let globalHelper = new GlobalHelper();
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["message"], [], req);
    
                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    /* Filter parameters from FE, only use keys needed in create post  process */
                    response_data = await wallsModel.createPost({ ...sanitation_result, user_id: req.session.general.user_id });
                }
                else{
                    response_data.error = error;
                }
            }
            else{
                response_data.redirect = "/login"
            }
        } 
        catch (error) {
            
        }

        /* Check if the user needs to be redirected */
        if(response_data.redirect){
            res.redirect(response_data.redirect)
        }
        else{
            res.json(response_data);
        }
    }

    /** 
    * Function that handles the create comment request
    * Last updated November 1, 2022
    * @author Jomar
    */
    createComment = async (req, res) => {
        let response_data = { status: false, result: null, error: null };
        
        try {

            /* Check if session exist if so, proceed with rendering of wall data */
            if(req.session.general){
                let globalHelper = new GlobalHelper();
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["message", "post_id"], [], req);
    
                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    /* Filter parameters from FE, only use keys needed in create post process */
                    response_data = await wallsModel.createComment({ ...sanitation_result, user_id: req.session.general.user_id });
                }
                else{
                    response_data.error = error;
                }
            }
            else{
                response_data.redirect = "/login"
            }
        } 
        catch (error) {
            
        }

        /* Check if the user needs to be redirected */
        if(response_data.redirect){
            res.redirect(response_data.redirect)
        }
        else{
            res.json(response_data);
        }
    }
}

module.exports = WallControllers;
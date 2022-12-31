const GlobalHelper = require('../helpers/global.helper');
const WallsModel =  require('../models/walls.model');

class WallsController{
    constructor(){
        /* Set default variable if needed */
    }

    /** 
    * Function that handle the fetching of posts data on the initial load of walls page
    * Last updated December 31, 2022
    * @author Jomar
    */
    renderWall = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                if(user_id){
                    let wallsModel = new WallsModel();
                    let { status, result, error } = await wallsModel.fetchPosts({user_id});

                    if(status){
                        response_data.status = true;
                        response_data.post_contents = result[0]?.post_contents ? JSON.parse(result[0].post_contents) : [];
                    }
                    else{
                        response_data.error = error;
                    }
                }
                else{
                    response_data.error = 'Incomplete parameters to complete the fetching of post'
                }
            }
            else{
                response_data.redirect = '/login'
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
            res.render('wall', { ...response_data });
        }
    }

    /** 
    * Function that handle the creation of posts
    * Last updated December 31, 2022
    * @author Jomar
    */
    createPost = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in registration  process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["post_message"], [], req);

                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    let { status, result, error } = await wallsModel.createPost({user_id, ...sanitation_result });

                    if(status && result.affectedRows){
                        response_data.status = true;
                        response_data.insert_id = result.insertId;
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
                response_data.redirect = '/login'
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
    * Function that handle the creation of comments
    * Last updated December 31, 2022
    * @author Jomar
    */
    createComment = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in registration  process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["comment_message", "post_id"], [], req);

                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    let { status, result, error } = await wallsModel.createComment({user_id, ...sanitation_result });

                    if(status){
                        response_data.status = true;
                        response_data.result = result;
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
                response_data.redirect = '/login'
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
    * Function that handle the deletion of posts
    * Last updated December 31, 2022
    * @author Jomar
    */
    deletePost = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in registration  process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["post_id"], [], req);

                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    let { status, result, error } = await wallsModel.deletePost({user_id, ...sanitation_result });

                    if(status){
                        response_data.status = true;
                        response_data.result = result;
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
                response_data.redirect = '/login'
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

module.exports = WallsController;
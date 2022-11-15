const { JSONCookie } = require('cookie-parser');
const GlobalHelper = require('../helpers/global.helper');
const WallsModel = require('../models/walls.model');

class WallsController{
    constructor(){
        /* Set default variable if needed */
    }

    /** 
    * Function that handles login request from FE
    * Last updated November 1, 2022
    * @author Jomar
    */
    renderWall = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                let wallsModel = new WallsModel();
                let { status, result, error } = await wallsModel.fetchPosts({ user_id });

                if(status){
                    response_data.posts_contents = result[0]?.post_contents ? JSON.parse(result[0].post_contents) : [];
                    response_data.status = true;
                }
            }
            else{
                response_data.redirect = '/login';
            }
        } 
        catch (error) {
            console.log(error);    
        }

        if(response_data.redirect){
            res.redirect(response_data.redirect);
        }
        else{
            res.render('wall', { ...response_data });
        }
    }

    /** 
    * Function that handles login request from FE
    * Last updated November 1, 2022
    * @author Jomar
    */
    createPost = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in login process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["post_message"], [], req);

                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    let { status, result, error} = await wallsModel.createPost({ user_id, ...sanitation_result });

                    if(status && result.affectedRows ){
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
                response_data.redirect = '/login';
            }
        } 
        catch (error) {
            console.log(error);    
        }

        if(response_data.redirect){
            res.redirect(response_data.redirect);
        }
        else{
            res.json(response_data);
        }
    }

    /** 
    * Function that handles creation of comments
    * Last updated November 1, 2022
    * @author Jomar
    */
    createComment = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in login process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["comment_message", "post_id"], [], req);

                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    let { status, result, error} = await wallsModel.createComments({ user_id, ...sanitation_result });

                    if(status && result.affectedRows ){
                        response_data.status = true;
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
                response_data.redirect = '/login';
            }
        } 
        catch (error) {
            console.log(error);    
        }

        if(response_data.redirect){
            res.redirect(response_data.redirect);
        }
        else{
            res.json(response_data);
        }
    }

    /** 
    * Function that handles the deletion of posts
    * Last updated November 1, 2022
    * @author Jomar
    */
    deletePosts = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            if(req.session.general){
                let { user_id } = req.session.general;

                let globalHelper = new GlobalHelper();
                /* Filter parameters from FE, only use keys needed in login process */
                let { status: sanitation_status, result: sanitation_result, error } = globalHelper.sanitizeParams(["post_id"], [], req);

                if(sanitation_status){
                    let wallsModel = new WallsModel();
                    response_data = await wallsModel.deletePosts({ user_id, ...sanitation_result });
                }
                else{
                    response_data.error = error;
                }
            }
            else{
                response_data.redirect = '/login';
            }
        } 
        catch (error) {
            console.log(error);    
        }

        if(response_data.redirect){
            res.redirect(response_data.redirect);
        }
        else{
            res.json(response_data);
        }
    }
}

module.exports = WallsController;
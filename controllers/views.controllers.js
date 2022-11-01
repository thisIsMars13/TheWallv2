const WallsModel =  require('../models/walls.model');

class UsersController{
    constructor(){
        /* Set default variable if needed */
    }

    /** 
    * Function that handles rendering of wall page
    * Last updated November 1, 2022
    * @author Jomar
    */
    renderWall = async (req, res) => {
        let response_data = { status: false, result: null, error: null}

        try {
            /* Check if session exist if so, proceed with rendering of wall data */
            if(req.session.general){
                let wallsModel = new WallsModel();
                /* Fetch wall post content */
                let { status: fetch_posts_status, result: fetch_posts_result, error } = await wallsModel.fetchPosts({user_id: req.session.general.user_id});
    
                /* if the fteching of post content was success, return post content on FE */
                if(fetch_posts_status){
                    response_data.status = true;
                    response_data.result = fetch_posts_result;
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
            console.log(error)    
        }

         /* Check if the user needs to be redirected */
        if(response_data.redirect){
            res.redirect(response_data.redirect)
        }
        else{
            res.render('walls', { posts: response_data.result });
        }
        
    }
}

module.exports = UsersController;
const UsersHelper = require('../helpers/users.helper');
const DatabaseModel = require('./database/database.model')

class WallsModel extends DatabaseModel{
    constructor(){
        super();
    }

    /** 
    * Function that handle the fetching of post data
    * Last updated December 31, 2022
    * @author Jomar
    */
    fetchPosts = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id } = params;

            if(user_id){
                let fetch_posts_query = this.mysqlFormat(`
                    SELECT IFNULL(JSON_ARRAYAGG(derived_post_content.post_content), JSON_ARRAY())AS post_contents
                    FROM (
                        SELECT JSON_OBJECT("message", posts.message, "post_id", posts.id, "comments", JSON_ARRAYAGG(comments.message)) AS post_content
                        FROM posts
                        LEFT JOIN comments ON comments.post_id = posts.id
                        WHERE posts.user_id = ? AND is_archived = 0
                        GROUP BY posts.id
                        ORDER BY posts.created_at DESC
                    ) derived_post_content
                `, [user_id])

                response_data = this.runQueryStatement(fetch_posts_query);
            }
            else{
                response_data.error = "Missing parameters to complete the fetching of posts";
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }

    /** 
    * Function that handle the creation of post
    * Last updated December 31, 2022
    * @author Jomar
    */
    createPost = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id, post_message } = params;

            if(user_id && post_message){
                let create_posts_query = this.mysqlFormat(`
                    INSERT INTO posts (user_id, message, created_at, updated_at) VALUES (?, ?, NOW(), NOW())
                `, [user_id, post_message])

                response_data = this.runQueryStatement(create_posts_query);
            }
            else{
                response_data.error = "Missing parameters to complete the creation of posts";
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }

    /** 
    * Function that handle the creation of comment
    * Last updated December 31, 2022
    * @author Jomar
    */
    createComment = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id, comment_message, post_id } = params;

            if(user_id && comment_message && post_id){
                let create_comment_query = this.mysqlFormat(`
                    INSERT INTO comments (post_id, user_id, message, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())
                `, [post_id, user_id, comment_message])


                response_data = this.runQueryStatement(create_comment_query);
            }
            else{
                response_data.error = "Missing parameters to complete the creation of comment";
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }

        /** 
    * Function that handle the deletion of posts
    * Last updated December 31, 2022
    * @author Jomar
    */
    deletePost = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id, post_id } = params;

            if(user_id && post_id){
                let create_comment_query = this.mysqlFormat(`
                    UPDATE posts SET is_archived = 1 WHERE id = ? AND user_id = ?
                `, [post_id, user_id])


                response_data = this.runQueryStatement(create_comment_query);
            }
            else{
                response_data.error = "Missing parameters to complete the deletion of post";
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }
}

module.exports = WallsModel;
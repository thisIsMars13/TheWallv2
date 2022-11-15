const DatabaseModel = require('./database/database.model')

class WallsModel extends DatabaseModel{
    constructor(){
        super();
    }

    /** 
    * Function that handle registration process of the user.
    * Last updated November 1, 2022
    * @author Jomar
    */
    createPost = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id, post_message } = params;

            if(user_id && post_message){
                let insert_post_query = this.mysqlFormat(`INSERT INTO posts (user_id, message, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`, [user_id, post_message]);

                response_data = await this.runQueryStatement(insert_post_query);
            }
            else{
                response_data.error = "Missing parameters to complete the creation of post"
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }

    
    /** 
    * Function that handle fetching of posts data.
    * Last updated November 1, 2022
    * @author Jomar
    */
    fetchPosts = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id } = params;

            if(user_id ){
                let fetch_posts_query = this.mysqlFormat(`
                SELECT JSON_ARRAYAGG(derived_table.post_content) AS post_contents
                FROM (
                    SELECT JSON_OBJECT("post_id", posts.id, "message", posts.message, "comments", JSON_ARRAYAGG(comments.message)) AS post_content
                    FROM posts
                    LEFT JOIN comments ON comments.post_id = posts.id
                    WHERE posts.user_id = ? AND is_archived = 0
                    GROUP BY posts.id, posts.message
                    ORDER BY posts.created_at DESC
                ) derived_table;
                `, [user_id]);

                response_data = await this.runQueryStatement(fetch_posts_query);
            }
            else{
                response_data.error = "Missing parameters to complete the fetching of posts"
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }

    /** 
    * Function that handle creation of comments
    * Last updated November 1, 2022
    * @author Jomar
    */
    createComments = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id, post_id, comment_message } = params;

            if(user_id && post_id && comment_message ){
                let fetch_posts_query = this.mysqlFormat(`
                    INSERT INTO comments (post_id, user_id, message, created_at, updated_at) VALUES (?,?,?, NOW(), NOW())
                `, [post_id, user_id, comment_message]);

                response_data = await this.runQueryStatement(fetch_posts_query);
            }
            else{
                response_data.error = "Missing parameters to complete the creation of comments";
            }
        } 
        catch (error) {
            console.log(error);
            response_data.error. error;
        }

        return response_data;
    }

        /** 
    * Function that handle deletion of posts
    * Last updated November 1, 2022
    * @author Jomar
    */
    deletePosts = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id, post_id } = params;

            if(user_id && post_id ){

                let fetch_posts_query = this.mysqlFormat(`
                    SELECT id FROM posts WHERE id = ? AND user_id = ?
                `, [post_id, user_id]);

                let { status: fetch_posts_status, result: fetch_posts_result, error } = await this.runQueryStatement(fetch_posts_query);

                if(fetch_posts_status && fetch_posts_result.length){
                    let update_posts_query = this.mysqlFormat(`
                        UPDATE posts SET is_archived = 1 WHERE id = ?
                    `, [post_id]);

                    response_data = await this.runQueryStatement(update_posts_query);
                }
                else{
                    response_data.error = "Can not delete post. User do not own post";
                }

                response_data = await this.runQueryStatement(fetch_posts_query);
            }
            else{
                response_data.error = "Missing parameters to complete the deletion of posts";
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
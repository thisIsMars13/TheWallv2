const DatabaseModel = require('./database/database.model')

class WallsModel extends DatabaseModel{
    constructor(){
        super();
    }

    /** 
    * Function that handle the creation of post of the user.
    * Last updated November 1, 2022
    * @author Jomar
    */
    createPost = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { message, user_id } = params;
            /* Check if all the required parameters exist */
            if( message && user_id ){
                let insert_post_query = this.mysqlFormat(`
                    INSERT INTO posts(user_id, message, created_at, updated_at) VALUES(?, ?, NOW(), NOW())
                `, [user_id, message]);

                /* Insert post data in the DB */
                let { status: insert_posts_status, result: insert_posts_result, error } = await this.runQueryStatement(insert_post_query);

                /* Check if the insert data was success */
                if(insert_posts_status && insert_posts_result.affectedRows > 0){
                    response_data.status = true;
                    response_data.result = insert_posts_result;
                }
                else{
                    response_data.error = error;
                }
            }
            else{
                response_data.error = "Missing parameters to complete creation of post";
            }
        } 
        catch (error) {
            response_data.error = error;
            console.log(error)
        }

        return response_data;
    }

    /** 
    * Function that handle the creation of comment of the user.
    * Last updated November 1, 2022
    * @author Jomar
    */
    createComment = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { message, user_id, post_id } = params;

            if( message && user_id && post_id ){
                let insert_comment_query = this.mysqlFormat(`
                    INSERT INTO comments(post_id, user_id, message, created_at, updated_at) VALUES(?, ?, ?, NOW(), NOW())
                `, [post_id, user_id, message]);

                /* Insert post data in the DB */
                let { status: insert_comment_status, result: insert_comment_result, error } = await this.runQueryStatement(insert_comment_query);

                /* Check if the insert data was success */
                if(insert_comment_status && insert_comment_result.affectedRows > 0){
                    response_data.status = true;
                    response_data.result = insert_comment_result;
                }
                else{
                    response_data.error = error;
                }
            }
            else{
                response_data.error = "Missing parameters to complete creation of comment";
            }
        } 
        catch (error) {
            response_data.error = error;
            console.log(error)
        }

        return response_data;
    }

    fetchPosts = async (params) => {
        let response_data = { status: false, result: null, error: null };

        try {
            let { user_id } = params;

            if(user_id){
                let fetch_posts_query = this.mysqlFormat(`
                    SELECT JSON_ARRAYAGG(derived_table.posts_content) post_contents
                    FROM (
                            SELECT JSON_OBJECT("post_id", posts.id, "message", posts.message, "comments", JSON_ARRAYAGG(comments.message)) AS posts_content
                            FROM posts
                            LEFT JOIN comments ON comments.post_id = posts.id
                            WHERE posts.user_id = ?
                            GROUP BY posts.id, posts.message
                            ORDER BY posts.created_at DESC
                        ) AS derived_table; 
                `, [user_id]);

                let { status: fetch_posts_status, result: fetch_posts_result, error } = await this.runQueryStatement(fetch_posts_query);

                if(fetch_posts_status){
                    response_data.status = true;
                    response_data.result = JSON.parse(fetch_posts_result[0].post_contents);
                }
                else{
                    response_data.error = error;
                }
            }
            else{
                response_data.error = "Missing parameters to complete creation of comment";
            }
        } 
        catch (error) {
            response_data.error = error;
            console.log(error)
        }

        return response_data;
    }
}

module.exports = WallsModel;
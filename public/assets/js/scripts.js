$(function(){

    /* Handles the Registration of the user when the Registration form is submitted */
    submitRegistrationForm = (element) => {

        $.post("/api/users/registration", $(element).serialize(), function(data){

            if(!data.status){
                alert(data.error || data.message);
            }
            else{
                alert(data.result || data.message);
            }
        });
    }

    /* Handles the create post of user */
    submitCreatePostForm = (element) => {

        $.post("/api/wall/create_post", $(element).serialize(), function(data){
            let { status, result, error, insert_id } = data;
           
            if(status){
                let post_message = $(element).find('textarea').val();
                let html_posts = `<li>
                        <button class="delete-post-button">DELETE POST</button>
                        <input type="hidden" value="${insert_id}">
                        <h1>${post_message}</h1>
                        <div>
                            <ul id="comments-container">
                            </ul>
                            <textarea cols="30" rows="10" placeholder="Say Something"></textarea>
                            <input type="hidden" value="${insert_id}" />
                            <button class="comment-button">Add comment</button>
                        </div>
                    </li>`;
                $("#posts-container").prepend(html_posts);
                $(element).find('textarea').val("");
            }
            else{
                alert(error);
            }
        });
    }

    /* Handles the create comments of user */
    submitCreateCommentForm = (element) => {
        let [ comment_container, comment_message, post_id ] = $(element).siblings();

        $.post("/api/wall/create_comments", { comment_message: $(comment_message).val(), post_id: $(post_id).val() }, function(data){
            let { status, result, error } = data;
            
            if(status){
                let comment_html = `<li>${$(comment_message).val()}</li>`;
                $(comment_container).prepend(comment_html);
                $(comment_message).val("");
            }
            else{
                alert(error);
            }
        });
    }

    /* Handles the create comments of user */
    submitDeletePostForm = (element) => {
        let [ post_id ] = $(element).siblings();

        $.post("/api/wall/delete_posts", { post_id: $(post_id).val() }, function(data){
            let { status, result, error } = data;
            
            if(status){
                $(element).closest('li').remove();
            }
            else{
                alert(error);
            }
        });
    }
    
    $(document).on("submit", "#registration-form", function(){
        submitRegistrationForm(this);
        return false;
    });

    $(document).on("submit", "#post-form", function(){
        submitCreatePostForm(this);
        return false;
    });

    $(document).on("click", ".comment-button", function(){
        submitCreateCommentForm(this);
        return false;
    });

    $(document).on("click", ".delete-post-button", function(){
        submitDeletePostForm(this);
        return false;
    });
})
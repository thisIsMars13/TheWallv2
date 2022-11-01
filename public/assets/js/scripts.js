$(function(){

    /* Handles the creation of posts when the create post form is submitted */
    submitCreatePostForm = (element) => {
        
        $.post("/api/wall/create_post", $(element).serialize(), function(data){

            if(data.status){
                let { insertId } = data.result;
                let html_text_area = $(element).find('textarea');
                let post_html = `<li>
                    <h1>${html_text_area.val()}</h1>                
                    <ul> 
                    </ul>
                    <input type="hidden" value="${insertId}">
                    <textarea name="message" id="" cols="30" rows="1.5" placeholder="Comment something.."></textarea>
                    <button class="comment-button">Add comment</button>
                </li>`;

                $('#posts-lists').prepend(post_html);
                html_text_area.val("");
            }
        });
    }

    /* Handles the creation of comments when the create comment form is submitted */
    submitCreateCommentForm = (element) => {
        let [_h1, ul, input, textarea] = $(element).siblings();

        $.post("/api/wall/create_comment", { post_id: $(input).val(), message: $(textarea).val() }, function(data){
            if(data.status){
                $(ul).prepend(`<li>${$(textarea).val()}</li>`);
                $(textarea).val("");
            }
        });
    }

    /* Handles the login of the user when the login form is submitted */
    submitLoginForm = (element) => {
        
        $.post("/api/users/login", $(element).serialize(), function(data){
            
            if(!data.status){
                alert(data.error || data.message);
            }
        });
    }

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
    
    $(document).on("submit", "#create-post-form", function(){
        submitCreatePostForm(this);
        return false;
    });

    $(document).on("click", ".comment-button", function(){
        submitCreateCommentForm(this);
        return false;
    });

    $(document).on("submit", "#login-form", function(){
        submitLoginForm(this);
        return false;
    });

    $(document).on("submit", "#registration-form", function(){
        submitRegistrationForm(this);
        return false;
    });
})
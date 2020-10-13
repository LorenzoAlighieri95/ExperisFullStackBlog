var editMode= false;
var editedPostId = false

class ArticleController{
  constructor(){
    this.restController = new RestController();
    this.modalBtn;
    this.modalTitle;
    this.modalBody;
    this.publicCheck;
    this.featuredCheck;
    //this.editMode=false;
    //this.editedPostId;
  }
  
  init(){
    $(document).ready(function() {

      this.modalBtn = $("#submitNewPost");
      this.modalTitle = $("#newPostTitleInput");
      this.modalBody = $("#newPostTextInput");
      this.publicCheck = $("#checkBoxPublic");
      this.featuredCheck = $("#checkBoxFeatured");   
        
      this.modalBtn.click(function(e){
        if (editMode){
          var inputTitle = this.modalTitle.val();
          var inputText = this.modalBody.val();
          var publi = this.publicCheck.prop("checked");
          var featured = this.featuredCheck.prop("checked");
          var article = new Article(inputTitle,inputText,publi,featured);
          this.putArticle(article,editedPostId);
          this.closeModal();
          this.resetModal();  
          articleController.articleManagement();
        }else{
          var inputTitle = this.modalTitle.val();
          var inputText = this.modalBody.val();
          var publi = this.publicCheck.prop("checked");
          var featured = this.featuredCheck.prop("checked");
          var article = new Article(inputTitle,inputText,publi,featured);
          this.postArticle(article);
          this.addArticle(article);
          this.closeModal();
          this.resetModal();  
          articleController.articleManagement();
        }
      }.bind(this));
      this.getArticles();  
    }.bind(this));
  }

  getArticles(){
    this.restController.get("http://localhost:3000/articles",function(data,status,xhr){
      for (var i in data){
        var article = new Article();
        article.title = data[i].title;
        article.body = data[i].body;
        article.draft = data[i].draft;
        article.featured = data[i].featured;
        article.tag = data[i].tag;
        article.id = data[i]._id;
        articleController.addArticle(article)
      }
      articleController.articleManagement();
      $('.loader').hide();
    });
  }
  
  postArticle(article){
    console.log(article.draft)
    var obj = {
      body: article.body,
      featured: article.featured,
      draft: article.draft,
      tag: [""],
      title: article.title
    };
    this.restController.post("http://localhost:3000/articles",obj,function(){
      console.log("success")
      $('.loader').hide();
    });
  }
  
  putArticle(article,id){
    var obj = {}
    for (var property in article) {
      if (article[property]!==""&&article[property]!==undefined){
        obj[property] = article[property];
      }
    }
    var url = "http://localhost:3000/articles/"+id;
    console.log("obj",obj)
    console.log("url",url)
    this.restController.put(url,obj,function(){
      console.log("success"); //possibile bug
      editMode=false;
      editedPostId=null;
      //location.reload();
    },function(){
      console.log("error");
      editMode=false;
      editedPostId=null;
      //location.reload();
    });
  }

  deleteArticle(elemId){
    var url = 'http://localhost:3000/articles/'+elemId
    this.restController.delete(url,function(){
      console.log("success");
      location.reload();
    });
  }
  
  addArticle(article){
    var HtmlArticle = this.createHtmlArticle(article);  
    if (article.featured){
        $(".main").prepend(HtmlArticle); 
    } else {
        $(".main").append(HtmlArticle); 
    }
  }

  articleManagement(){
    
    $(".deleteBtn").on("click",function(e){
      var elemId = $(this).closest('article').attr('id'); 
      articleController.deleteArticle(elemId);
    });

    $(".putBtn").on("click",function(e){
      var elemId = $(this).closest('article').attr('id'); 
      editMode=true;
      editedPostId=elemId;
    });
    
    $(".button.like").on("click",function(e){
      var item =$(this);
      var color = item.css("color");
      if (color=="rgb(245, 245, 245)") {
        item.css("color", "lightblue");
      } else {
        item.css("color", "whitesmoke");
      }
    });
  
    $(".button.comment").on('click', function(e) {
      var elemId = $(this).closest('article').attr('id');
      var selector = "#" + elemId + " .commentSection"
      if($(selector).is(":visible")){
        $(selector).hide(1000);
      }else{
        $(selector).show(1000);
      }
    });
  
    $(".submitComment").on("click", function(e) {    
      e.preventDefault();
      var elemId = $(this).closest('article').attr('id');  
      var input = $("#"+elemId+" .comment_input").val()
      var selector = "#" + elemId + " .comments"
      $(selector).append("<div class='media'>"+
                            "<img src='https://www.flaticon.com/svg/static/icons/svg/3408/3408556.svg' style='width:60px' class='align-self-start mr-3'>"+
                            "<div class='media-body'>"+
                            "<h5 class='mt-0'>Gianna</h5>"+
                            input+
                            "</div></div>")                      
    });
  }

  getBadge(publi,featured){
    console.log(publi,featured)
    var badge = "";
    if (featured && publi) {
      badge = "Featured post";
    }else if (publi == false){
      badge = "Draft post";
    } else {
      badge = "New post";
    }
    return badge;
  }

  createHtmlArticle(article){
    var badge = this.getBadge(article.draft,article.featured);
    if (Array.isArray(article.tag)) {
      tag = "<a href=''>#" + tag.join("</a>, <a href=''>#") + "</a>";
    }
    var img="https://source.unsplash.com/random/500x400";
    var htmlContent ='<br>\
                      <article class="card" id="'+article.id+'">\
                        <div style="padding:2%;">\
                          <h5 class="post-title" ">'+article.title+'    <span class="badge badge-secondary">'+badge+'</span></h5>\
                          <button class="button putBtn" style="position:absolute; margin-top:-9%; margin-left:88%;" data-toggle="modal" data-target="#newPostModal"><i class="material-icons" style="font-size:28px;">edit</i></button>\
                          <button class="button deleteBtn" style="position:absolute; margin-top:-9%; margin-left:78%;" data-toggle="modal" data-target="#"><i class="material-icons" style="font-size:28px;">delete_outline</i></button>\
                          </div>\
                        <img src="'+img+'" class="img-fluid" alt="Responsive image">\
                        <div class="card-body">\
                          <h5 class="card-title">'+article.tag+'</h5>\
                          <p class="card-text">'+article.body+'</p>\
                          <hr class="hrSeparator">\
                          <div class="buttons">\
                                <button id="button_like" class="button like"><i id="thumb_up" class="material-icons" style="font-size:25px;">thumb_up</i> Like</button>\
                                <a href="contactUs.html"><button class="button"><i class="material-icons" style="font-size:25px;">book_online</i> Book</button></a>\
                                <button class="button" data-toggle="modal" data-target="#exampleModal"><i class="material-icons" style="font-size:25px;">share</i>Share</button>\
                                <button class="button comment"><i class="material-icons" style="font-size:25px;">comment</i> View Comments</button>\
                            </div>\
                            <br>\
                            <div class="commentSection">\
                              <div class="comments">\
                                <div class="media">\
                                    <img src="https://www.flaticon.com/svg/static/icons/svg/3408/3408578.svg" style="width:60px" class="align-self-start mr-3" alt="...">\
                                    <div class="media-body">\
                                      <h5 class="mt-0">Ciccio</h5>\
                                        Vivamus eros nisi, suscipit eget semper sed, pharetra sit amet est.\
                                    </div>\
                                </div>\
                              </div>\
                              <br>\
                              <form action="" onsubmit="return false">\
                                <input type="text" class="comment_input" placeholder="    Write a comment...">\
                                <button id="submitButton" class="submitComment"><i class="material-icons" style="font-size:40px;">send</i></button>\
                                <br>\
                              </form>\
                            </div>\
                        </div>\
                    </article>';
    return htmlContent;
  }

  closeModal(){
    $("#newPostModal").modal("hide");
  }

  resetModal(){
    $("#newPostTitleInput").val("");
    $("#newPostTextInput").val("");
  }
}
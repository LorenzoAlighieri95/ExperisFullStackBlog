class ArticleController{
  constructor(){
    this.restController = new RestController();
    this.modalBtn;
    this.modalTitle;
    this.modalBody;
    this.publicCheck;
    this.featuredCheck;
  }
  
  init(){
    $(document).ready(function() {

      this.modalBtn = $("#submitNewPost");
      this.modalTitle = $("#newPostTitleInput");
      this.modalBody = $("#newPostTextInput");
      this.publicCheck = $("#checkBoxPublic");
      this.featuredCheck = $("#checkBoxFeatured");
    
      this.modalBtn.click(function(e){
        var inputTitle = this.modalTitle.val();
        var inputText = this.modalBody.val();
        var publi = this.publicCheck.prop("checked");
        var featured = this.featuredCheck.prop("checked");
        var article = new Article(inputTitle,inputText,publi,featured);
        this.addArticle(article);
        this.postArticle(article);
        //this.patchArticle(article);
        //this.putArticle(article);
        this.closeModal();
        this.resetModal();  
        articleController.articleManagement();
      }.bind(this));
      this.getArticles();  
    }.bind(this));
  }

  getArticles(){
    this.restController.get("http://localhost:3000/articles",function(data,status,xhr){
      var numId = 0
      for (var i in data){
        numId++;
        var article = new Article();
        article.title = data[i].title;
        article.body = data[i].body;
        article.draft = data[i].draf;
        article.featured = data[i].featured;
        article.tag = data[i].tag;
        article.id = i;
        article.numId = numId;
        articleController.addArticle(article)
      }
      articleController.articleManagement();
    });
  }
  
  postArticle(article){
    var obj = {
      body: article.body,
      featured: article.featured,
      draft: article.draft,
      //tag: [""],
      title: article.title
    };
    var myJSON = JSON.stringify(obj)
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/articles',
      data: myJSON,
      success: console.log("ok"),
      dataType: JSON,
      contentType:"application/json"
    });
  }

  

  /*
  postArticle(article){
    var obj = {
      body: article.body,
      featured: article.featured,
      public: article.draft,
      tag: [""],
      title: article.title
    };
    this.restController.post("https://texty-89895.firebaseio.com/posts.json",myJSON,function(){
      console.log("ok")
    });
  }
  */

  patchArticle(article){
    var obj = {
      body: article.body,
      featured: article.featured,
      draft: article.draft,
      tag: [""],
      title: article.title
    };
    var url = "https://texty-89895.firebaseio.com/posts/"+article.id+".json";
    this.restController.patch(url,obj,function(){
      console.log("success");
    });
  }

  putArticle(article){
    var obj = {
      body: article.body,
      featured: article.featured,
      draft: article.draft,
      //tag: [""],
      title: article.title
    };
    var url = "https://texty-89895.firebaseio.com/posts/"+article.id+".json";
    this.restController.put(url,obj,function(){
      console.log("success");
    });
  }

  addArticle(article){
    var HtmlArticle = this.createHtmlArticle(article.title,article.body,article.draft,article.featured,article.id,article.tag);  
    if (article.featured){
        $(".main").prepend(HtmlArticle); 
    } else {
        $(".main").append(HtmlArticle); 
    }
  }

  articleManagement(){
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

  createHtmlArticle(title,body,publi,featured,id,tag){
    var badge = this.getBadge(publi,featured);
    if (Array.isArray(tag)) {
      tag = "<a href=''>#" + tag.join("</a>, <a href=''>#") + "</a>";
    }
      var htmlContent ='<br>\
                        <article class="card" id="card_'+id+'">\
                          <div style="padding:2%;">\
                            <h5 class="post-title" ">'+title+'    <span class="badge badge-secondary">'+badge+'</span></h5><button style="position:absolute; margin-top:-8.5%; margin-left:88%;" class="button" data-toggle="modal" data-target="#newPostModal"><i class="material-icons" style="font-size:25px;">edit</i></button>\
                          </div>\
                          <img src="https://source.unsplash.com/random/500x400" class="img-fluid" alt="Responsive image">\
                          <div class="card-body">\
                            <h5 class="card-title">'+tag+'</h5>\
                            <p class="card-text">'+body+'</p>\
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
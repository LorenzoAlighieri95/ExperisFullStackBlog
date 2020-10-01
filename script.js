$(document).ready(function() {
  
  $('.checkbox').click(function(e){
    if($(this).prop("checked") == true){
        var elemId = $(this).closest('div').attr('id');
        item = $("#"+elemId)
        $("#checked_title").show()
        $("#checked_container").append(item)
    } else {
        var elemId = $(this).closest('div').attr('id');
        item = $("#"+elemId)
        $("#checkbox_container").append(item)
    }   
  }); 
  

  $("#submitNewPost").click(function(e){
    articleController = new ArticleController();
    articleController.getArticle();
  }); 
 /*
  var articles = []
  
  function Article(title, body, public, featured) {
    this.title = title;
    this.body = body;
    this.public = public;
    this.featured = featured;
  }

  $('#submitNewPost').click(function(e){
    var inputTitle = $("#newPostTitleInput").val();
    var inputText = $("#newPostTextInput").val();
    var public = false;
    var featured = false;
    if($("#checkBoxPublic").prop("checked")===true) public=true;
    if($("#checkBoxFeatured").prop("checked")===true) featured=true;
    var article = new Article(inputTitle,inputText,public,featured);
    articles.push(article);
    HtmlArticle = createHtmlArticle(article.title,article.body,article.public,article.featured);
    if (article.featured){
      $(".main").prepend(HtmlArticle); 
    } else {
      $(".main").append(HtmlArticle); 
    }

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
  })

  function createHtmlArticle(title,body,public,featured){
    numberArticle =articles.length;
    badge =getBadge(public,featured);
    htmlContent = '<br><article class="card" id="card_'+numberArticle+'">\
                      <h5 class="post-title" style="text-align: center;">Lorem ipsum <span class="badge badge-secondary">'+badge+'</span></h5>\
                      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">\
                          <ol class="carousel-indicators">\
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>\
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>\
                          </ol>\
                          <div class="carousel-inner">\
                            <div class="carousel-item active">\
                              <img class="d-block w-100" src="https://cf.bstatic.com/data/xphoto/1182x887/297/29799900.jpg?size=S" alt="First slide">\
                            </div>\
                            <div class="carousel-item">\
                              <img class="d-block w-100" src="https://www.turismopeschici.it/guida/wp-content/uploads/2016/12/italy-90595_12801.jpg" alt="Second slide">\
                            </div>\
                          </div>\
                          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">\
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                            <span class="sr-only">Previous</span>\
                          </a>\
                          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">\
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                            <span class="sr-only">Next</span>\
                          </a>\
                        </div>\
                      <div class="card-body">\
                        <h5 class="card-title">'+title+'</h5>\
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

  function getBadge(public,featured){
    if (featured && public) {
      badge = "Featured post";
    }else if (public == false){
      badge = "Draft post";
    } else {
      badge = "New post";
    }
    return badge;
  }
*/  
});

  
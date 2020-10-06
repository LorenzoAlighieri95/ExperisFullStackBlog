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
    articleController.articleManagement();
  }); 

  $.get({
    url:'https://api.npoint.io/24620ef625c768a4f3c4',
    success: function (data,textStatus,jqXHR){
      articleController = new ArticleController();
      for (var i = 0; i<data.length; i++){
        article = new Article();
        article.title = data[i].title;
        article.body = data[i].body;
        article.draft = data[i].public;
        article.featured = data[i].featured;
        article.tag = data[i].tag;
        article.id = i+1;
        articleController.addArticle(article)
      }
      articleController.articleManagement();
    }
  });

});

  
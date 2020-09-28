$(document).ready(function() {

    var numberPosts = $(".card").length;
    $("#spanPosts").html(numberPosts);

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
    })

    $(".button.like").on("click",function(e){
        var item =$(this)
        var color = item.css("color")
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

    $('.checkbox').click(function(){
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
    
  });
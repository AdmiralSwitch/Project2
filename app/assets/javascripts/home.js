$(document).ready(function(){
  $(".reset-link").on("click", function() {
    $('#logModal').modal('hide');
  });

  var scroll_start = 0;
   var startchange = $('#startchange');
   var offset = startchange.offset();
    if (startchange.length){
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $(".navbar-default").css('background', 'rgba(255,255,255,0.9)');
          $('.navbar-default').css('border-bottom-color', 'rgba(0, 0, 0, 0.0980392)');

       } else {
          $('.navbar-default').css('background-color', 'transparent');
          $('.navbar-default').css('border-bottom-color', 'rgba(0, 0, 0, 0)');
          $(".navbar-default").css('background', 'none ');
       }
   });
    }

});

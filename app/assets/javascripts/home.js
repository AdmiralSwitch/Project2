$(document).ready(function(){

  // MY Forget Password Modal
  $(".reset-link").on("click", function() {
    $('#logModal').modal('hide');
  });
  
  //Autofocus for the Modals
  $('.modal').on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
  });


  // THE CHANGING OF MY NAV-BAR COLOR 
  var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();

    if (startchange.length){
      $(document).scroll(function() { 
        scroll_start = $(this).scrollTop();
        if(scroll_start > offset.top) {
          $(".navbar-default").css('background', 'rgba(255,255,255,0.85)');
          $('.navbar-default').css('border-bottom-color', 'rgba(0, 0, 0, 0.0980392)');
          $('.navbar-brand').css('color', 'gray');
          $('.navbar-nav > li > a').css('color', 'gray');
        } else {
          $('.navbar-default').css('background-color', 'transparent');
          $('.navbar-default').css('border-bottom-color', 'rgba(0, 0, 0, 0)');
          $(".navbar-default").css('background', 'none ');
          $('.navbar-brand').css('color', 'white');
          $('.navbar-nav > li > a').css('color', 'white');
        }
      });
    }//end of start changed



//  ADDING TO FAVORITES!
$(".tableData").on("click",'.btn', function(e){
  e.preventDefault();
  var roi = (this.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
  addFav(roi);
});

function addFav(roi){
    $.post('/favorite', {roi: roi}).done(function(fav) {
      console.log("Succes:" + fav);
      loadFav();
    }); 
  }

function loadFav() {
  $("#myFavs").empty();
  $.get('/favorite/1').done(function(favs){
    favs.forEach(function(fav){
      var list = "<li>"+fav.roi+"</li>";
      $("#myFavs").append(list);
    });
  });
}







//MY REFACTURED CODE OF SWTICH'S 

var homes = [];

/// THIS IS THE MAIN THING YOOYOYOYOYO
// Adds our input stuff into this Calculator
  function add(city, address, price, units, income, taxes){
    var downpayment = (price * .33).toFixed(2);
    var bills = (units * 5 + income * .1).toFixed(2);
    var repairs = units * 100;

    function vacancy(add) {
      if (city == 'Portland'){
        return (income *.035).toFixed(2);
      } else if (city == 'Las Vegas'){              
        return (income * .08).toFixed(2);
      } else if (city == 'Oakland'){              
        return (income * .11).toFixed(2);
      } else { 
        return 0;   
      }
    };
    

//This is the mortgage calculator
//got off internet!
  function mortgage(price, downpayment){
    var loanAmount = price - downpayment;
    var a = loanAmount;
    var b = 4.25;
    var c = 30;
    var n = c * 12;
    var r = b/(12*100);
    var p = (a * r *Math.pow((1+r),n))/(Math.pow((1+r),n)-1);
    var prin = Math.round(p*100)/100;
    return (prin);
  };

  var cashFlow = ((-1 * taxes)/12 - mortgage(price, downpayment) - bills - repairs - vacancy(city) + income).toFixed(2);
  var rateReturn = ((cashFlow * 12) / price * 100).toFixed(2);

  homes[homes.length] = {
    id: homes.length,
    city: city,
    address: address,
    price: '$' + price,
    units: units,
    income: '$' + income,
    taxes: '$' + taxes,
    downpayment: '$' + downpayment,
    mortgage: '$' + mortgage(price, downpayment),
    bills: '$' + bills,
    repairs: '$' + repairs,
    vacancy: '$' + vacancy(city),
    cashflow: '$' + cashFlow,
    rate: rateReturn +'%'
  };
  
  list(homes);

  function list(homes) {
  $('.tableData').empty();
  var whatever = homes;
  console.log(whatever);
  whatever.forEach(function(whatever) {
    $(".tableData").append
    ("<tr>"  
    + "<td id='tablerate'>" + whatever.rate + "</td>" 
    + "<td id='tableaddress'>"+ whatever.address + "</td>" 
    + "<td id='tabledownpayment'>"+ whatever.downpayment + "</td>" 
    + "<td id='tablemortgage'>"+ whatever.mortgage + "</td>" 
    + "<td id='tableincome'>"+ whatever.cashflow 
    + "</td>"+"<td id='tablebutton'><button id='addFav' class='btn'>Favorite</button>"
    + "</tr>");
  });
}
}// end of the add function


$('.addtolist').on("click", function(e){
  e.preventDefault();
  var city = $('#city').val();
  var address =$('#address').val();
  var price = parseInt($('#price').val());
  var units = parseInt($('#units').val());
  var income = parseInt($('#income').val());
  var taxes = parseInt($('#taxes').val());
  add(city, address, price, units, income, taxes);
  $('#city').val("");
  $('#address').val("");
  $('#price').val("");
  $('#units').val("");
  $('#income').val("");
  $('#taxes').val("");
});


  
});//DOCUMENT CLOSED





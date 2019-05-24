$(document).ready(function() {
  
  $("#logo").click(function(){
    location.href="index.html";
  });
  $("#btn-confirm").click(function(){
    location.href="userinfo.html";
  });
  
  $(document).click(function(event){
    $("#userPanel").hide();
  })


  $('#btn-search').click(function(){
    var originLocation = $('#input-search').val();
   
    
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [originLocation],
      destinations: ['475 3rd St, San Francisco, CA 94107','652 Polk St, San Francisco, CA 94102'],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, callback);
    var dist1;
    var dist2;
    function callback(response, status) {
      if (status == 'OK') {
        dist1 = response.rows[0].elements[0].distance.text;
        dist2 = response.rows[0].elements[1].distance.text;
        $('#distance1').text(dist1)
        $('#distance2').text(dist2)
      }     
    }
    $('.restaurant').show();
    $('#confirm').show();
  })
     


  var totalAmount=0;
  
  for(var i=0;i<localStorage.length; i++) {
      var item = localStorage.key(i); 
      totalAmount += JSON.parse(localStorage.getItem(item)).amount
  }
  var orderInfo = {};
  $('.more').click(function(){
  	var num = $(this).prev().text();
    var amount = parseInt(num);
  	amount+=1
  	$(this).prev().text(amount);

  	// var name = $(this).parents('.menu').siblings('.name').text()//restaurant name
  	
  	var item = $(this).parents('.foodinfo').siblings('h4').text(); //item name
    if(localStorage.getItem(item)===null) {
      orderInfo.amount = amount;//item amount
    } else {
      orderInfo.amount = JSON.parse(localStorage.getItem(item)).amount+1;
    }
  	orderInfo.price = $(this).parent().siblings('.price').text(); //item price
  	localStorage.setItem(item,JSON.stringify(orderInfo));// key=item name; value={amount:x,price:"$y.00"}
    totalAmount ++;
    $('#cart').text(totalAmount.toString())
  

  	// $('#result').text(name + "\n"+orderInfo.item + "\n" + orderInfo.price + "\n" + orderInfo.amount)
  })

  $('.less').click(function(){
  	var num = $(this).next().text();
  	var amount = parseInt(num)
  	if(amount>0) {
  		amount-=1
  		$(this).next().text(amount);
  	}

  	// var name = $(this).parents('.menu').siblings('.name').text()//restaurant name
  	var item = $(this).parents('.foodinfo').siblings('h4').text(); //item name
    if(localStorage.getItem(item)!==null) {
      orderInfo.amount = JSON.parse(localStorage.getItem(item)).amount-1;
    }
  	orderInfo.price = $(this).parent().siblings('.price').text(); //item price
    if(orderInfo.amount!==0) {
      localStorage.setItem(item,JSON.stringify(orderInfo));// key=item name; value={amount:x,price:"$y.00"}
    } else if (orderInfo.amount===0) {
      localStorage.removeItem(item)
    }
    totalAmount--;
    $('#cart').text(totalAmount.toString())
  
  })

  var sum1 = 0;
  $lastOrder = $('<div id="lastOrder">View Cart: </div>')
  $lastOrder.appendTo('#userPanel')
  for(var i=0;i<localStorage.length; i++) {
      var item = localStorage.key(i);
      $orderItem = $('<div class="orders"><div class="o-name">'+ localStorage.key(i)+'</div><div class="o-amt"> x'+ JSON.parse(localStorage.getItem(item)).amount+'</div><div class="o-price">'+ JSON.parse(localStorage.getItem(item)).price+'</div></div>')
      $orderItem.appendTo('#userPanel')            
      sum1 += (JSON.parse(localStorage.getItem(item)).price.slice(1)) *  JSON.parse(localStorage.getItem(item)).amount
  }
  $total = $('<div class="total">Total: $'+ sum1.toFixed(2) +'</div>')
  $total.appendTo('#userPanel');

  




  var sum2=0
  $('#btn-addCart').click(function(){
    $('#userPanel').text('');
  	$lastOrder = $('<div id="lastOrder">View Cart: </div>')
    $lastOrder.appendTo('#userPanel')
    for(var i=0;i<localStorage.length; i++) {
        var item = localStorage.key(i);
        $orderItem = $('<div class="orders"><div class="o-name">'+ localStorage.key(i)+'</div><div class="o-amt"> x'+ JSON.parse(localStorage.getItem(item)).amount+'</div><div class="o-price">'+ JSON.parse(localStorage.getItem(item)).price+'</div></div>')
        $orderItem.appendTo('#userPanel')            
        sum2 += (JSON.parse(localStorage.getItem(item)).price.slice(1)) *  JSON.parse(localStorage.getItem(item)).amount
    }
    $total = $('<div class="total">Total: $'+ sum2.toFixed(2) +'</div>')
    $total.appendTo('#userPanel');
  })
  
  $("#userLine").click(function(e){
    e.stopPropagation();
    $("#userPanel").toggle();
  });
  

  
  
  $('#cart').text(totalAmount.toString())


})

$(document).ready(function(){
  $("#logo").click(function(){
    location.href="index.html";
  });

  $("#back").click(function(){
    location.href="index.html";
  });
  var sum1 = 0;
  for(var i=0;i<localStorage.length; i++) {
        var item = localStorage.key(i);
        $orderItem = $('<div class="orders"><div class="o-name">'+ localStorage.key(i)+'</div><span><div class="quantity"><span> x '+ JSON.parse(localStorage.getItem(item)).amount+'</span></div><div class="price">'+ JSON.parse(localStorage.getItem(item)).price+'</div></span></div>')
        $orderItem.appendTo('#lastOrder')
        sum1 += (JSON.parse(localStorage.getItem(item)).price.slice(1)) *  JSON.parse(localStorage.getItem(item)).amount
  }
  $total = $('<div class="total">Total: $'+ sum1.toFixed(2) +'</div>')
  $total.appendTo('#lastOrder');

  
  var orderInfo = {};
  $('.more').click(function(){
    var num = $(this).prev().text();
    var amount = parseInt(num);
    amount+=1
    $(this).prev().text(amount);   
    var item = $(this).parents('.orders').children('.o-name').text(); //item name
    orderInfo.amount = JSON.parse(localStorage.getItem(item)).amount+1; 
    orderInfo.price = $(this).parent().siblings('.price').text();
    localStorage.setItem(item,JSON.stringify(orderInfo));
  });

  $('.less').click(function(){
    var item = $(this).parents('.orders').children('.o-name').text()
    var num = $(this).next().text();
    var amount = parseInt(num)
    if(amount>1) {
      amount-=1
      $(this).next().text(amount);
      orderInfo.amount = JSON.parse(localStorage.getItem(item)).amount-1; 
      orderInfo.price = $(this).parent().siblings('.price').text();
      localStorage.setItem(item,JSON.stringify(orderInfo));
    }
    else if (amount===1) {
      amount-=1
      $(this).next().text(amount);
      localStorage.removeItem(item)
    }
    
  })

  



  
})

/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/


$(document).ready(function() {
  $("#logo").click(function(){
    location.href="index.html";
  });
  $("#userName").click(function(){
    location.href="userinfo.html";
  });
  $('#btn-search').click(function(){
    location.href="orderpage.html"
  })

  var totalAmount=0;
  
  for(var i=0;i<localStorage.length; i++) {
      var item = localStorage.key(i); 
      totalAmount += JSON.parse(localStorage.getItem(item)).amount
  }
  $('#cart').text(totalAmount.toString())

})

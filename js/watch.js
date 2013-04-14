(function () {
  var $page, $txtWatch, $txtClock, $btnStart, $btnHide;

  $page = $('#watch_page');
  if (!$page.data.initialized) {
	$page.live('pageinit', init);
    $page.data.initialized = true;
  }
  
  function init() {
	//alert("inside pageInit");
	$txtWatch = $('#watch');
	$txtWatch.val('0');
	$txtClock = $('#clock');
    $btnStart = $('#start');
    $btnStart.click(onStartClick);
	$btnHide = $('#hide');
    $btnHide.click(onHideClick);
  }
  
  function onStartClick() {
     //alert("inside onStartClick");
	 var value = $txtWatch.val();
	 $txtWatch.val(incrementValue(value));
  }
  
  function onHideClick() {
     //alert("inside onHideClick");
	 $txtClock.attr("class", "hide");
  }
  
  function incrementValue(value) {
	  var number = parseInt(value, 10);
	  number = isNaN(number) ? 0 : number;
	  number++;
	  return number;
  }
  
  
})();
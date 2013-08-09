$(document).ready(function(){
	
	var timer, count, start_count, milis;
	var $txtValue = $('#value');
	var $txtCount = $('#count');
	var $btnStart = $('#start');
	var $btnStop = $('#stop');
	var $btnReset = $('#reset');
	var $btnMellom = $('#mellom');
	var $ulMellomtider = $('#mellomtider');
	
	$btnStart.click(function (e) {
        e.preventDefault();
        var time    = new Date();
        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
		start_count = seconds + 60 * minutes + 3600 * hours;
		$btnStart.hide();
		$btnStop.show();
		$btnMellom.show();
		startTimer();
    });
	
	$btnStop.click(function (e) {
        e.preventDefault();
        stopTimer();
        //$btnStart.show();
        $btnReset.show();
        $btnStop.hide();
        $btnMellom.hide();
        appendMellomtid();
    });
	
	$btnReset.click(function (e) {
        e.preventDefault();
        resetDisplay();
        $btnStart.show();
        $btnReset.hide();
    });
	
	$btnMellom.click(function (e) {
        e.preventDefault();
        appendMellomtid();
    });
	
	init();
    
	function init() {
	   //alert('Hei på deg!');
		resetDisplay();
		$btnStop.hide();
		$btnReset.hide();
		$btnMellom.hide();
	}
	
	function resetDisplay() {
		//alert('Hei på deg!');
		millis = 0;
	    count = 0;
	    resetMellomtider();
		displayCount();
	}
	
	function appendMellomtid() {
		var li = "<li>" + $txtValue.val() + "</li>"; 
        $ulMellomtider.append(li);
	}
	
	function resetMellomtider() {
		$ulMellomtider.empty();
	}
	
	function startTimer() {
		display();
	    timer = setTimeout(function(){startTimer()}, 100);
	}
	
	function stopTimer() {
	   clearTimeout(timer);
	}
	
	function displayCount() {
		
		//if (count >= 360000)  // 100 timer
		//	 count = 0;
        var timer = Math.floor(count/3600);
        var rest = count % 3600
        var minutter = Math.floor(rest / 60);
        var sekunder = rest % 60;
		 
		var value   = ((timer < 10) ? ' ' : '') + timer
		  + ':' + ((minutter < 10) ? '0' : '') + minutter
		  + ':' + ((sekunder < 10) ? '0' : '') + sekunder
		  + ':' + ((millis < 10) ? '0' : '') + Math.floor(millis / 10);
        
		$txtCount.val(count);
		$txtValue.val(value);
	}
	
	function display() {
		var time    = new Date();
        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
		millis  = time.getMilliseconds();
        var current_count = seconds + 60 * minutes + 3600 * hours;
        count = current_count - start_count;
		
		displayCount();
	}
 });
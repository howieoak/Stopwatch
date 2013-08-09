var db, $txtValue, $btnStart, $btnStop, $btnReset, $btnMellom, $btnLagre, $ulMellomtider;

(function () {
	var timer_stopwatch, count, start_count, milis, value;
	//var $txtValue, $btnStart, $btnStop, $btnReset, $btnMellom, $ulMellomtider;
	
	$page = $('#stopwatch_page');
	
	if (!$page.data.initialized) {
		$page.live('pagecreate', create);
		$page.live('pageinit', init);
		$page.data.initialized = true;
	}
	
	function create() {
		alert("inside index create")
		createDb();
		initSegmentDisplay();
	}
	
	function init() {
		//createDb();
		//initSegmentDisplay();
		alert("inside index init");
		$txtValue = $('#value');
		$btnStart = $('#start');
		$btnStop = $('#stop');
		$btnReset = $('#reset');
		$btnMellom = $('#mellom');
		$btnLagre = $('#lagre');
		$ulMellomtider = $('#mellomtider');
		
		$btnStart.click(onStartBtnClick);
		$btnStop.click(onStopBtnClick);
		$btnReset.click(onResetBtnClick);
		$btnMellom.click(onMellomBtnClick);
		$btnLagre.click(onLagreBtnClick);
		
		resetDisplay();
		$btnStop.closest('.ui-btn').hide();
		$btnReset.closest('.ui-btn').hide();
		$btnMellom.closest('.ui-btn').hide();
		$btnLagre.closest('.ui-btn').hide();
	}
	
	function onStartBtnClick(e) {
        e.preventDefault();
        var time    = new Date();
        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
		start_count = seconds + 60 * minutes + 3600 * hours;
		$btnStart.closest('.ui-btn').hide();
		$btnStop.closest('.ui-btn').show();
		$btnMellom.closest('.ui-btn').show();
		startTimer();
    }
	
	function onStopBtnClick(e) {
        e.preventDefault();
        stopTimer();
        $btnStop.closest('.ui-btn').hide();
        $btnMellom.closest('.ui-btn').hide();
		$btnReset.closest('.ui-btn').show();
		$btnLagre.closest('.ui-btn').show();
        appendMellomtid();
    }
	
	function onResetBtnClick(e) {
        e.preventDefault();
        resetDisplay();
        $btnReset.closest('.ui-btn').hide();
		$btnLagre.closest('.ui-btn').hide();
		$btnStart.closest('.ui-btn').show();
    }
	
	function onMellomBtnClick(e) {
        e.preventDefault();
        appendMellomtid();
	}
	
	function onLagreBtnClick(e) {
        e.preventDefault();
		save();
	}
	
	function createDb()
	{
		var shortName = 'StopWatch';
		var version = '1.0';
		var displayName = 'StopWatch';
		var maxSize = 65536;
		db = openDatabase(shortName, version, displayName, maxSize);
		db.transaction(
			function(transaction) {
				transaction.executeSql(
				'CREATE TABLE IF NOT EXISTS entries ' +
				' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
				' date TEXT NOT NULL, laptimes TEXT NOT NULL, ' +
				' comment TEXT);'
				);
			}
		);	
	}
	
	function save()
	{
		var date = new Date();
		var day =  date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var displayDate = day + '/' + month + '/' + year;
		var lapTimes = getLaptimes();
		//var comment = $('#comment').val();
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'INSERT INTO entries (date, laptimes, comment) VALUES (?, ?, ?);',
					[displayDate, lapTimes, ''],
					insertSuccess,
					errorHandler
				);
			}
		);
	}
	
	function getLaptimes()
	{
		var times = '';
		$ulMellomtider.find('li').each(function(index, value) {
			var $this = $(this);
			$this.text(function(i, curr){
         		if (index > 0)
				{
					if (index == 1)
						times = curr;
					else
						times = times + ' | ' + curr;
				}
			});
        });
		
		return times;
	}
	
	function insertSuccess() {
		resetDisplay();
        $btnReset.closest('.ui-btn').hide();
		$btnLagre.closest('.ui-btn').hide();
		$btnStart.closest('.ui-btn').show();
	}
	
	function errorHandler(transaction, error) {
		alert('Oops. Error was '+error.message+' (Code '+error.code+')');
		return true;
	}
	
	
	
	function startTimer() {
		timer_stopwatch = setInterval(function() {
         	animate();
	    }, 100);
	}
	
	function stopTimer() {
		clearInterval(timer_stopwatch);
	}
	
	function resetDisplay() {
		//alert('Hei på deg!');
		millis = 0;
	    count = 0;
		emptyMellomtider();
		displayValues();
	}
	
	function appendMellomtid() {
		var li = "<li>" + value; 
        $ulMellomtider.append(li);
		$ulMellomtider.listview('refresh');
	}
	
	function emptyMellomtider() {
		$ulMellomtider.empty();
		var li = "<li data-role='list-divider'>Mellomtider";
		$ulMellomtider.append(li);
		$ulMellomtider.listview('refresh');
	}
	
	function initSegmentDisplay() {
	   display = new SegmentDisplay("display");
	   display.pattern         = "##:##:##:##";
	   display.displayAngle    = 6;
	   display.digitHeight     = 20;
	   display.digitWidth      = 14;
	   display.digitDistance   = 2.5;
	   display.segmentWidth    = 2;
	   display.segmentDistance = 0.3;
	   display.segmentCount    = 7;
	   display.cornerType      = 3;
	   display.colorOn         = "#090909";
	   display.colorOff        = "#c8c8c8";
	}
	
	function displayValues() {
		var timer = Math.floor(count/3600);
        var rest = count % 3600
        var minutter = Math.floor(rest / 60);
        var sekunder = rest % 60;
		 
		value   = ((timer < 10) ? ' ' : '') + timer
		  + ':' + ((minutter < 10) ? '0' : '') + minutter
		  + ':' + ((sekunder < 10) ? '0' : '') + sekunder
		  + ':' + ((millis < 10) ? '0' : '') + Math.floor(millis / 10);
        
		display.setValue(value);
	}
  
	function animate() {
	  	var time    = new Date();
        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
		millis  = time.getMilliseconds();
        var current_count = seconds + 60 * minutes + 3600 * hours;
        count = current_count - start_count;
		
		displayValues();
	}
	
})();
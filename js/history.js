var db, $btnSlett, $ulTider;

(function () {
	
	$page = $('#history_page');
	
	if (!$page.data.initialized) {
		$page.live('pagecreate', create);
		$page.live('pageinit', init);
		$page.data.initialized = true;
	}
	function create() {
		alert("inside history create");
		createDb();
	}
  
	function init() {
		
		alert("inside history init");
		$ulTider = $('#tider');
		$btnSlett = $('#slett');
		
		$btnSlett.click(onSlettBtnClick);
		displayEntries();
	}
	
	function onSlettBtnClick(e) {
        e.preventDefault();
		
		if (confirm("Er du sikker på at du vil fjerne alle registrerte tider?")) {
			removeEntries();	
		}
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
	
	function removeEntries()
	{
		//alert("inside remove table");
		db.transaction(
			function(transaction) {
				transaction.executeSql('DELETE FROM entries;',
					[], deleteSuccess, errorHandler);
			}
		);
	}
	
	function displayEntries() {
		//alert("inside displayentries");
		
		db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT * FROM entries;', [], 
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							//alert("inside for");
							var row = result.rows.item(i);
							var newEntryRow = $('#entryTemplate').clone();
							newEntryRow.removeAttr('id');
							newEntryRow.removeAttr('style');
							newEntryRow.data('entryId', row.id);
							newEntryRow.find('#dato').text(row.date);
							newEntryRow.find('#tid').text(row.laptimes);
							$ulTider.append(newEntryRow);
						}
					},
					errorHandler
				);
			}
		);
		
		$ulTider.listview('refresh');
	}
	
	function deleteSuccess() {
		$ulTider.empty();
	}
	
	function errorHandler(transaction, error) {
		alert('Oops. Error was '+error.message+' (Code '+error.code+')');
		return true;
	}
  
})();
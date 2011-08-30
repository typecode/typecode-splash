(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Data)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		app.events.bind('featuresInitialized.app',function(e,d){
			$.ajax({
				url:'js/data/data.squares.js',
				dataType:'json',
				success:function(d,ts,xhr){
					app.events.trigger('loaded.data',{data:d})
				}
			});
		});
		
	});
	
})(this);
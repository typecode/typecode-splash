(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Browser Detection)',
				enabled:true
			});
			
	page.features.push(function(app){
		var browser_detection, browser_hint;
		
		browser_detection = new NI.BrowserDetection({});
		browser_hint = $('.browser-hint');
		
		if($.browser.msie){
			browser_hint.show().animate({
				opacity:1.0
			},600,function(){
				
			});
		}
		
	});
	
})(this);
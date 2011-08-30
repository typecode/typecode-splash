(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Content)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		(function check_typekit_loaded(){
			if(app.page.env.typekit == 'loaded'){
				$('.content').animate({
					opacity:1.0
				},600,function(){
				
				});
			} else {
				setTimeout(check_typekit_loaded,100);
			}
		})();
		
	});
	
})(this);
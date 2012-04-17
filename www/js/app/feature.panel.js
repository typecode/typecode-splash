(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Panel)',
				enabled:true
			});
			
	page.features.push(function(app){
		var internal;
		
		internal = {
			context:tc.particle.context(app,$("<canvas id='particle-panel'></canvas>"),{
				bg_image:'images/typecode.png'
			}),
			mouseforce:null,
			last_mouse_pos:null
		};
		
		$('body').append(internal.context);
		
		function handle_data(arr){
			var i;
			for(i = 0; i < arr.length; i++){
				if(arr[i].s < 2){ continue; }
				(function(sq){
					var i, j, ax, ay;
					ax = ( sq.x );
					ay = ( sq.y );
					
					internal.context.add_particle(new tc.particle.particle(app,{
						pos:{
							x:ax+NI.math.random(-150,150)+$(window).width()/2,
							y:ay+NI.math.random(-90,150)+90
						},
						radius:sq.s/2,
						anchored:true,
						anchor:{
							x:ax,
							y:ay
						},
						anchor_offset:{
							x:$(window).width()/2,
							y:90
						},
						draw:function(context){
							var diameter = this.radius*2;
							context.fillStyle = this.fill;
							context.fillRect(
								this.pos.elements[0],
								this.pos.elements[1],
								diameter,
								diameter
							);
						}
					}));
				})(arr[i]);
			}
		}
		
		app.events.bind('loaded.data',function(e,d){
			handle_data(d.data.squares);
		});
		
		$(window).bind('resize',function(e,d){
			console.log('resize')
			var new_size;
			new_size = {
				width:$(window).width(),
				height:$(window).height()
			};
			internal.context.setSize(new_size);
		});
		
		$(window).bind('mousemove',function(e,d){
			var mousepos, tempvec;
			internal.mouseforce.pos.setElements([e.clientX, e.clientY]);
			mousepos = Vector.create([e.clientX, e.clientY])
			if(internal.last_mouse_pos){
				tempvec = mousepos.subtract(internal.last_mouse_pos);
				internal.mouseforce.radius = (internal.mouseforce.radius * 0.90) + ((Math.sqrt(tempvec.dot(tempvec))*5) * 0.10);
			}
			internal.last_mouse_pos = mousepos;
		});
		
		app.events.bind('featuresInitialized.app',function(){
			$(window).trigger('resize');
			internal.context.start();
			internal.mouseforce = internal.context.add_global_force({x:500,y:500},-15,150);
		});
		
	});
	
})(this);
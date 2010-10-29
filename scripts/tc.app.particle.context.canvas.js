if(!tc){ var tc = {}; }

(function(tc) {
  if(!tc.particle){ tc.particle = {}; }
  if(!tc.particle.context){ tc.particle.context = {}; }
  
  tc.particle.context.canvas = function(app,dom,options){
    var _me;
    _me = dom;
    
    this.options = app.Y.merge({
      
    },options);
    
    
    this.initialize = function(){
      tc.util.log('tc.particle.context.canvas.initialize');
      _me.canvas = _me._node.getContext('2d');
      _me.bounds = this.options.bounds;
      return _me;
    }
    
    _me.draw_particles = function(particles,func){
      var i;
      _me.canvas.clearRect(0,0,_me.bounds.max_x,_me.bounds.max_y);
      for(i = 0; i < particles.length; i++){
        _me.particles[i].draw(_me.context,this.frame);
        if(app.Y.Lang.isFunction(func)){
          func(particle,_me.canvas);
        }
      }
    }
    
    return this.initialize();
  }
  
})(tc);
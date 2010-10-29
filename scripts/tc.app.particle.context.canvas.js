if(!tc){ var tc = {}; }

(function(tc) {
  if(!tc.particle){ tc.particle = {}; }
  if(!tc.particle.context){ tc.particle.context = {}; }
  
  tc.particle.context.canvas = function(app,dom,options){
    var _me, buffers, drawingBuffer;
    _me = dom;
    
    _me.options = app.Y.merge({
      
    },options);
    
    this.initialize = function(){
      tc.util.log('tc.particle.context.canvas.initialize');
      drawingBuffer = 0;
      buffers = dom.getElementsByTagName('canvas')._nodes;
      
      _me.swap_buffers();
      _me.bounds = _me.options.bounds;
      return _me;
    }
    
    _me.draw_particles = function(particles,func,callback){
      var i;
      _me.context.clearRect(0,0,_me.bounds.max_x,_me.bounds.max_y);
      for(i = 0; i < particles.length; i++){
        if(app.Y.Lang.isFunction(func)){
          func.call(_me,particles[i]);
        }
      }
      _me.swap_buffers();
      if(callback){
        callback();
      }
    }
    
    _me.draw_particle = function(particle,func){
      var i;
      //_me.context.clearRect(0,0,_me.bounds.max_x,_me.bounds.max_y);
      if(app.Y.Lang.isFunction(func)){
        func.call(_me,particle);
      }
    }
    
    _me.swap_buffers = function(){
      buffers[1-drawingBuffer].style.visibility='hidden';
      buffers[drawingBuffer].style.visibility='visible';
      drawingBuffer = 1 - drawingBuffer;
      _me.context = buffers[drawingBuffer].getContext('2d');
    }
    
    return this.initialize();
  }
  
})(tc);
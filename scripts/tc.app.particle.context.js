if(!tc){ var tc = {}; }

(function(tc) {
  if(!tc.particle){ tc.particle = {}; }

  
  tc.particle.context = function(app,dom,options){
    var _me;
    _me = dom;
    
    this.options = app.Y.merge({
      framerate:30,
      version:0,
      gravity:0,
      bounds:	{
        min_x: 0,
        max_x: 1000,
        min_y: 0,
        max_y: 1000
      },
      labels:true
    },options);
    
    this.templates = {
      label: "<p class='particleLabel'></p>"
    }
    
    this.initialize = function(){
      tc.util.log('tc.particle.context.initialize');
      _me.forces = [];
      _me.particles = [];
      _me.labels = [];
      _me.frame = 0;
      _me.stopped = true;
      _me.paused = false;
      _me.timer = null;
      _me.mouse_pos = null;
      _me.mouse_down_pos = null;
      _me.context = _me._node.getContext('2d');
      _me.bounds = this.options.bounds;
      
      return _me;
    }
    
    _me.updateBounds = function(){
      tc.util.log('tc.particle.context[_me.updateBounds]');
      _me.bounds = {
        min_x: 0,
        max_x: _me.get('winWidth'),
        min_y: 0,
        max_y: _me.get('winHeight') 
      };
    }
    
    _me.add_particle = function(particle){
      //tc.util.log('tc.particle.context[_me.add_particle]');
      _me.particles.push(particle);
      return _me.particles[_me.particles.length-1];
    }
    
    _me.add_global_force = function(pos, strength, radius){
      tc.util.log('tc.particle.context[_me.add_global_force]');
      var force;
      if(pos.x && pos.y){
        force = {
          pos:Vector.create([pos.x,pos.y]),
          strength:strength,
          radius:radius
        };
        _me.forces.push(force);
        return _me.forces[_me.forces.length-1];
      }
    }
    
    _me.update = function(){
      //tc.util.log('tc.particle.context[_me.update]');
      _me.frame++;
      if(!_me.stopped){
        for(i = 0; i < _me.particles.length; i++){
          _me.particles[i]['reset_forces']();
          _me.particles[i]['add_forces'](_me.forces);
          _me.particles[i]['bounce_off_walls'](_me.bounds);
          _me.particles[i]['handle_anchor']();
          //_me.particles[i]['collide_with_particles'](_me.particles,i);
          _me.particles[i]['add_damping']();
          _me.particles[i]['update']();
        }
      }
      _me.mouse_down_pos = null;
      _draw();
    }
    
    _me.isPaused = function(){
      tc.util.log('tc.particle.context[_me.isPaused]');
      return _paused;
    }
    
    _me.start = function(){
      tc.util.log('tc.particle.context[_me.start]');
      _me.paused = false;
      _me.mouse_pos = null;
      _me.mouse_down_pos = null;
      if(_me.stopped){
        _me.stopped = false;
        _me.timer = app.Y.later(1000/30,_me,_me.update,{},true);
      }
    }
    
    _me.pause = function(){
      tc.util.log('tc.particle.context[_me.pause]');
      _me.paused = true;
    }
    
    _me.stop = function(){
      tc.util.log('tc.particle.context[_me.stop]');
      _me.stopped = true;
      _me.timer.cancel();
    }
    
    function _draw(){
      //tc.util.log('tc.particle.context[_me.draw]');
      _me.context.clearRect(0,0,_me.bounds.max_x,_me.bounds.max_y);
      for(var i = 0; i < _me.particles.length; i++){
        _me.particles[i].draw(_me.context,this.frame);
      }
    }
    
    return this.initialize();
  }
  
})(tc);
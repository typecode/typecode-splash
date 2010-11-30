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
      _me.net_energy = 0;
      _me.bg_image = new Image();
      _me.bg_image.src = 'images/typecode.png';
      return _me;
    }
    
    _me.setSize = function(size){
      tc.util.log('tc.particle.context[_me.setSize]');
      _me.bounds = {
        min_x: 0,
        max_x: size.width,
        min_y: 0,
        max_y: size.height 
      };
      _me.anchor_offset = {
        x:size.width/2,
        y:90
      }
      for(i = 0; i < _me.particles.length; i++){
        _me.particles[i]['set_anchor_offset'](_me.anchor_offset);
      }
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
      _me.net_energy = 0;
      for(i = 0; i < _me.forces.length; i++){
        _me.forces[i].radius = (_me.forces[i].radius * 0.98);
      }
      if(!_me.stopped){
        for(i = 0; i < _me.particles.length; i++){
          _me.particles[i]['reset_forces']();
          _me.particles[i]['add_forces'](_me.forces);
          _me.particles[i]['bounce_off_walls'](_me.bounds);
          _me.particles[i]['handle_anchor']();
          //_me.particles[i]['collide_with_particles'](_me.particles,i);
          _me.particles[i]['add_damping']();
          _me.particles[i]['update']();
          _me.net_energy = _me.net_energy + _me.particles[i].norm_dist_from_anchor;
        }
      }
      _me.net_energy = _me.net_energy / _me.particles.length;
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
      var opacity, i;
      
      _me.context.globalAlpha = 1;
      _me.context.fillStyle = 'rgba(252,252,252,0.5)';
      _me.context.fillRect(
        0,
        0,
        _me.bounds.max_x,
        _me.bounds.max_y
      );
      
      if(_me.net_energy < 0.2){
        opacity = (0.2/(_me.net_energy < 0.01 ? 0.01 : _me.net_energy)/20);
        _me.context.globalAlpha = opacity - 0.01;
        _me.context.drawImage(
          _me.bg_image,
          _me.anchor_offset.x-358,
          _me.anchor_offset.y
        );
      }
      
      _me.context.globalAlpha = 1 - opacity + 0.01;
      
      for(i = 0; i < _me.particles.length; i++){
        _me.particles[i].draw(_me.context);
      }
    }
    
    return this.initialize();
  }
  
})(tc);
if(!tc){ var tc = {}; }

if(Worker){
  var worker;
} else {
  var onmessage;
  function postMessage(msg){
    console.log("POST");
    console.log(msg);
  }
}

onmessage = function(e){
  if(e.data && e.data.action){
    switch(e.data.action){
      case 'start':
        if(e.data.data.options){
          worker = new tc.particle.context.worker(e.data.data.options);
        } else {
          worker = new tc.particle.context.worker({});
        }
        postMessage('WebWorker STARTED');
        break;
      case 'setOption':
        worker.set_option(e.data.data.name,e.data.data.value);
        break;
      case 'addParticle':
        worker.add_particle(e.data.data.particle);
        break;
      case 'play':
        worker.start();
        break;
      case 'stop':
        worker.stop();
        break;
    }
  }
};

(function(tc) {
  if(!tc.particle){ tc.particle = {}; }
  if(!tc.particle.context){ tc.particle.context = {}; }
  
  tc.particle.context.worker = function(){
    var _me, interval;
    _me = this;
    
    this.options = {
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
    }
    
    this.templates = {
      label: "<p class='particleLabel'></p>"
    }
    
    this.initialize = function(){
      //tc.util.log('tc.particle.context.initialize');
      _me.forces = [];
      _me.particles = [];
      _me.timer = null;
      return _me;
    }
    
    //to handle incoming messages when not a WebWorker
    _me.postMessage = function(d){
      onmessage({data:d});
    }
    
    _me.set_option = function(name,value){
      _me.options[name] = value;
    }
    
    _me.start = function(){
      if(interval){
        clearInterval(interval);
      }
      interval = setInterval(_me.update,1000/30);
    }
    
    _me.stop = function(){
      if(interval){
        clearInterval(interval);
        interval = null;
      }
    }
    
    _me.add_particle = function(particle){
      //tc.util.log('tc.particle.context[_me.add_particle]');
      _me.particles.push(particle);
      if(_me.worker){
        particle.worker(_me.worker);
      }
      postMessage('Particle Added');
      return _me.particles[_me.particles.length-1];
    }
    
    _me.add_global_force = function(pos, strength, radius){
      //tc.util.log('tc.particle.context[_me.add_global_force]');
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
          //_me.particles[i]['reset_forces']();
          //_me.particles[i]['add_forces'](_me.forces);
          //_me.particles[i]['bounce_off_walls'](_me.bounds);
          //_me.particles[i]['handle_anchor']();
          //_me.particles[i]['collide_with_particles'](_me.particles,i);
          //_me.particles[i]['add_damping']();
          //_me.particles[i]['update']();
        }
      }
      _me.mouse_down_pos = null;
      postMessage({
        action:'particlesUpdated',
        data:{
          particles:_me.particles
        }
      });
    }
    
    return this.initialize();
  }
  
})(tc);
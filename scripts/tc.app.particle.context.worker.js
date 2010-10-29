if(!tc){ var tc = {}; }

if(typeof Worker != undefined){
  var worker;
  if(typeof importScripts != 'undefined'){
    importScripts('lib/includes.sylvester.src.js');
    importScripts('tc.app.particle.particle.js');
  }
} else {
  var onmessage;
}

onmessage = function(e){
  if(e.data && e.data.action){
    switch(e.data.action){
      case 'init':
        worker = new tc.particle.context.worker();
        break;
      case 'setOption':
        worker.set_option(e.data.data.name,e.data.data.value);
        break;
      case 'addParticle':
        worker.add_particle(e.data.data.particle);
        break;
      case 'addForce':
        worker.add_force(e.data.data.force);
        break;
      case 'update':
        worker.update();
        break;
      case 'start':
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
  
  tc.particle.context.worker = function(app){
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
      _me.forces = {};
      _me.particles = [];
      _me.particles.get = function(){
        var i,arr;
        arr = [];
        for(i = 0; i < this.length; i++){
          arr.push(this[i].get());
        }
        return arr;
      }
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
      //interval = setInterval(_me.update,1000/60);
      _me.update();
    }
    
    _me.stop = function(){
      if(interval){
        clearInterval(interval);
        interval = null;
      }
    }
    
    _me.add_particle = function(particle){
      var p;
      p = new tc.particle.particle(particle);
      
      _me.particles.push(p);
      
      postMessage({
        message:'particleAdded'
      });
      
    }
    
    _me.add_force = function(force){
      force.pos = Vector.create([force.pos.x,force.pos.y]);
      _me.forces[force.id] = force;
      
      postMessage({
        message:'forceAdded',
        forceId:force.id
      });
    }
    
    _me.update = function(){
      //tc.util.log('tc.particle.context[_me.update]');
      _me.frame++;
      for(i = 0; i < _me.particles.length; i++){
        _me.particles[i]['reset_forces']();
        _me.particles[i]['add_forces'](_me.forces);
        //_me.particles[i]['bounce_off_walls'](_me.bounds);
        _me.particles[i]['handle_anchor']();
        //_me.particles[i]['collide_with_particles'](_me.particles,i);
        _me.particles[i]['add_damping']();
        _me.particles[i]['update']();
      }
      
      postMessage({
        action:'particlesUpdated',
        data:{
          particles:_me.particles.get()
        }
      });
    }
    
    return this.initialize();
  }
  
})(tc);
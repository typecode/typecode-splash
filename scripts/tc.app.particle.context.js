if(!tc){ var tc = {}; }

(function(tc) {
  if(!tc.particle){ tc.particle = {}; }

  
  tc.particle.context = function(app,dom,options){
    var _me;
    _me = dom;
    
    _me.options = app.Y.merge({
      draw:function(particle){
        this.context.fillStyle = _me.fill = "rgba("+tc.util.getRGBFromHex('r','000000')+","+tc.util.getRGBFromHex('g','000000')+","+tc.util.getRGBFromHex('b','000000')+",0.50)";
        this.context.fillRect(
          particle.pos[0],
          particle.pos[1],
          particle.radius*2,
          particle.radius*2
        );
      }
    },options);
    
    this.templates = {
      label: "<p class='particleLabel'></p>"
    }
    
    this.initialize = function(){
      tc.util.log('tc.particle.context.initialize');
      
<<<<<<< HEAD
      //WebWorker!!!!
      if(Worker){
        tc.util.log("Starting WebWorker");
        _me.worker = new Worker('scripts/tc.app.particle.context.worker.js');
        _me.worker.onmessage = function(e){
          _me.workerMessageHandler(e.data);
        };
      } else {
        tc.util.log("No WebWorker Available");
        _me.worker = new tc.particle.context.worker(app);
        app.on('workerEvent')
      }
      
      _me.canvas = new tc.particle.context.canvas(app,dom,_me.options);
      
      _me.worker.postMessage({
        action:'init',
        data:{}
      });
      
      _me.updateBounds();
      
      return _me;
    }
    
    _me.workerMessageHandler = function(d){
      if(d.action){
        switch(d.action){
          case 'particleAdded':
            tc.util.log('Particle Added');
            break;
          case 'forceAdded':
            tc.util.log('Force Added');
            break;
          case 'particlesUpdated':
            _me.canvas.draw_particles(d.data.particles,_me.options.draw,function(){
              
              _me.worker.postMessage({
                action:'update'
              });
              
            });
            break;
          case 'particleUpdated':
            //_me.canvas.draw_particle(d.data.particle,_me.options.draw);
            break;
        }
      }
    }
    
=======
      return _me;
    }
    
>>>>>>> 8f8c78ecd909ceca79bfa0a54d6760fbabaa07d3
    _me.updateBounds = function(){
      tc.util.log('tc.particle.context[_me.updateBounds]');
      
      _me.worker.postMessage({
        action:'setOption',
        data:{
          name:'bounds',
          value:{
            min_x: 0,
            max_x: _me.get('winWidth'),
            min_y: 0,
            max_y: _me.get('winHeight') 
          }
        }
      });
      
    }
    
    _me.add_particle = function(particle){
      //tc.util.log('tc.particle.context[_me.add_particle]');
<<<<<<< HEAD
      
      _me.worker.postMessage({
        action:'addParticle',
        data:{
          particle:particle
        }
      });
      
=======
      _me.particles.push(particle);
      return _me.particles[_me.particles.length-1];
>>>>>>> 8f8c78ecd909ceca79bfa0a54d6760fbabaa07d3
    }
    
    _me.add_force = function(force){
      tc.util.log('tc.particle.context[_me.add_force]');
      
      _me.worker.postMessage({
        action:'addForce',
        data:{
          force:force
        }
      });
      
    }
    
    _me.start = function(){
      tc.util.log('tc.particle.context[_me.start]');
<<<<<<< HEAD
      
      _me.worker.postMessage({
        action:'start',
        data:{}
      });
      
=======
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
>>>>>>> 8f8c78ecd909ceca79bfa0a54d6760fbabaa07d3
    }
    
    _me.stop = function(){
      tc.util.log('tc.particle.context[_me.stop]');
<<<<<<< HEAD
      
      _me.worker.postMessage({
        action:'stop',
        data:{}
      });
=======
      _me.stopped = true;
      _me.timer.cancel();
    }
    
    function _draw(){
      //tc.util.log('tc.particle.context[_me.draw]');
      _me.context.clearRect(0,0,_me.bounds.max_x,_me.bounds.max_y);
      for(var i = 0; i < _me.particles.length; i++){
        _me.particles[i].draw(_me.context,this.frame);
      }
>>>>>>> 8f8c78ecd909ceca79bfa0a54d6760fbabaa07d3
    }
    
    return this.initialize();
  }
  
})(tc);
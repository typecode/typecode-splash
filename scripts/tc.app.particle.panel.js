if(!tc){ var tc = {}; }

(function(tc){
  if(!tc.particle){ tc.particle = {}; }
  
  tc.particle.panel = function(app){
    var _me, _domRef, _context, mouseforce, last_mouse_pos;
    _me = this;
    
    this.template =  "<canvas id='particle-panel'></canvas>";
    
    this.initialize = function(){
      tc.util.log('particle.panel.initialize');
      app.Y.augment(_me,app.Y.EventTarget);
      app.Y.on('windowresize',_me.windowresizehandler)
      return _me;
    }
    
    this.windowresizehandler = function(){
      if(_context){
        _context.setSize({
          width:_domRef.get('winWidth'),
          height:_domRef.get('winHeight')
        });
      }
      if(_domRef){
        _domRef.set("width",_domRef.get('winWidth'));
        _domRef.set("height",_domRef.get('winHeight'));
      }
    }
    
    this.add_squares = function(arr){
      var i;
      for(i = 0; i < arr.length; i++){
        if(arr[i].s < 2){ return; }
        (function(sq){
          var i, j, ax, ay;
          ax = ( sq.x );
          ay = ( sq.y );
          
          _context.add_particle(new tc.particle.particle(app,{
            size:{
              width:_domRef.get('winWidth'),
              height:_domRef.get('winHeight')
            },
            pos:{
              x:ax+tc.util.rand(-150,150)+_domRef.get('winWidth')/2,
              y:ay+tc.util.rand(-90,150)+90
            },
            radius:sq.s/2,
            anchored:true,
            anchor:{
              x:ax,
              y:ay
            },
            anchor_offset:{
              x:_domRef.get('winWidth')/2,
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
    
    this.render = function(selector){
      tc.util.log('question_panel.appendTo');
      
      if(!selector){ selector = app.selector; }
      app.Y.one(selector).append(_me.template);
      _domRef = app.Y.one("#particle-panel");
      _domRef.set("width",_domRef.get('winWidth'));
      _domRef.set("height",_domRef.get('winHeight'));
      
      app.Y.one(document).on('mousemove',function(e){
        var mousepos, tempvec;
        if(mouseforce){
          mouseforce.pos.setElements([e.clientX, e.clientY]);
          mousepos = Vector.create([e.clientX, e.clientY])
          if(last_mouse_pos){
            tempvec = mousepos.subtract(last_mouse_pos);
            mouseforce.radius = (mouseforce.radius * 0.90) + ((Math.sqrt(tempvec.dot(tempvec))*5) * 0.10);
          }
          last_mouse_pos = mousepos;
        }
        
      });
      
      _context = tc.particle.context(app,_domRef,{});
      
      if(!_context){
        return false;
      }
      
      _context.setSize({
        height:_domRef.get('winHeight'),
        width:_domRef.get('winWidth')
      });
      _context.start();
      
      mouseforce = _context.add_global_force({x:500,y:500},-15,150);
      
      return _me;
    }
  
  
    return this.initialize();
  }
})(tc);
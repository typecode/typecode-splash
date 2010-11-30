if(!tc){ var tc = {}; }

(function(tc){
  if(!tc.particle){ tc.particle = {}; }
  
  tc.particle.panel = function(app){
    var _me, _domRef, _context, mouseforce;
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
        if(arr[i].s < 3){ return; }
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
              x:ax+tc.util.rand(-200,200)+_domRef.get('winWidth')/2,
              y:ay+tc.util.rand(-75,200)+75
            },
            radius:sq.s/2,
            anchored:true,
            anchor:{
              x:ax,
              y:ay
            },
            anchor_offset:{
              x:_domRef.get('winWidth')/2,
              y:75
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
              //context.fillRect(
              //  this.anchor.elements[0]+this.radius,
              //  this.anchor.elements[1]+this.radius,
              //  1,
              //  1
              //)
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
        if(mouseforce){
          mouseforce.pos.setElements([e.clientX, e.clientY]);
        }
      });
      
      _context = tc.particle.context(app,_domRef,{});
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
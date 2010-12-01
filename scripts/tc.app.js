

var app = {
    Y:null,
    selector:'#app',
    name:'Type/Code',
    version:0.2,
    particle_panel:null
  };
  
  app.initialize = function(Y){
    tc.util.log('app.initialize');
    app.Y = Y;
    app.Y.Node.one('title').setContent(app.name);
    app.Y.augment(app ,app.Y.EventTarget);
    if (app.Y.UA.webkit) {
      app.particle_panel = tc.particle.panel(app).render();
      app.particle_panel.add_squares(tc.squares.squares);
    } else {
      tc.util.log('Not webkit...falling back to static logo');
      app.Y.Node.one('body').addClass('fallback');
    }
    app.fadeInContent();
  };
  
  app.fadeInContent = function() {
    var fadeIn = new app.Y.Anim({
      node: '.content',
      to: {
        opacity: 1
      }
    });
    //fadeIn.set('duration', );
    
    fadeIn.run();
  };
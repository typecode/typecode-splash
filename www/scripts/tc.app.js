

var app = {
    Y:null,
    selector:'#app',
    name:'Type/Code',
    version:0.2,
    smallest_particle:2,
    particle_panel:null
  };
  
  app.initialize = function(Y){
    tc.util.log('app.initialize');
    app.Y = Y;
    app.Y.Node.one('title').setContent(app.name);
    app.Y.augment(app ,app.Y.EventTarget);
    if (app.Y.UA.webkit) {
      app.smallest_particle = 2;
    } else {
      app.smallest_particle = 4;
    }
    app.particle_panel = tc.particle.panel(app).render();
    if(app.particle_panel){
      app.particle_panel.add_squares(tc.squares.squares);
    }
  };
  
  app.fadeInContent = function() {
    var fadeIn = new app.Y.Anim({
      node: '.content',
      to: {
        opacity: 1
      }
    });
    fadeIn.run();
    app.showBrowserHint();
  };
  
  app.showBrowserHint = function() {
    if(app.smallest_particle != 2){
      var fadeIn = new app.Y.Anim({
        node: '.browser-hint',
        to: {
          opacity: 0.6
        }
      });
      fadeIn.run();
    }
  }
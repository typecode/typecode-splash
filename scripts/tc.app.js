

var app = {
    Y:null,
    selector:'#app',
    name:'Type/Code',
    version:0.2,
    particle_panel:null,
    browser:null
  };
  
  app.initialize = function(Y){
    tc.util.log('app.initialize');
    app.Y = Y;
    app.Y.Node.one('title').setContent(app.name);
    app.Y.augment(app ,app.Y.EventTarget);
    app.browser = app.Y.UA;
    if (app.browser.webkit) {
      app.particle_panel = tc.particle.panel(app).render();
      app.particle_panel.add_squares(tc.squares.squares);
    } else {
      
    }
  };
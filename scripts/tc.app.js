var environment = {

}

var app = {
    Y:null,
    selector:'#app',
    name:'Type/Code',
    version:0.1
  }
  
  app.initialize = function(Y){
    console.log('app.initialize');
    app.Y = Y;
    app.Y.Node.one('title').setContent(app.name+" - "+app.version);
    app.setupevents();
    
    console.log(app.Y.Node.one('#splash-mini'))

  }
  
  app.setupevents = function(){
    console.log('app.setupevents');
    app.Y.augment(app,app.Y.EventTarget);
  }

  
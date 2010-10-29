if(!tc){ var tc = {}; }

(function(tc){
  if(!tc.util){ tc.util = {}; }
  
  tc.util.log = function(msg){
    if (typeof console != "undefined" && typeof console.debug != "undefined") {
      console.info(msg);
    }
  }
  
  tc.util.getRGBFromHex = function(index,hex){
    if(index.toLowerCase() == "r"){
      return parseInt((tc.util.cutHex(hex)).substring(0,2),16);
    } else if(index.toLowerCase() == "g"){
      return parseInt((tc.util.cutHex(hex)).substring(2,4),16);
    } else if(index.toLowerCase() == "b"){
      return parseInt((tc.util.cutHex(hex)).substring(4,6),16);
    }
  }
  
  tc.util.cutHex = function(h){
    return (h.charAt(0)=="#") ? h.substring(1,7) : h;
  }
  
  tc.util.rand = function(l,u){
    return Math.floor((Math.random() * (u-l+1))+l);
  }
  
})(tc);
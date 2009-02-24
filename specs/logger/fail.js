Fail = _.clone({
  platforms: {
    "Ubuntu": (function() {
      var numbers = navigator.userAgent.match(/Ubuntu\/([\d]+\.[\d]+)/);
      return {
        platform: 'ubuntu'
        ,version: numbers[1]
      };
    })()
    
    ,"Firefox": (function() {
      var numbers = navigator.userAgent.match(/Firefox\/([\d]+\.[\d]+\.[\d]+)/);
      return {
        platform: 'firefox'
        ,version: numbers[1]
      };
    })()
  }
  
  ,ua: navigator.userAgent

  ,spec: function() {
    return prettyPrintOne(this.fnString).replace(/^[\s]+/,'');
  }
  
  ,sniff_platforms: function() {
    var sniffed = []
      ,slot;
      
    for(slot in this.platforms) {
      if(this.ua.match(slot)) {
        sniffed.push(this.platforms[slot]);
      }
    }
    
    return sniffed;    
  }
  
  ,to_html: function() {
    return _.template('fail', this);
  }
});


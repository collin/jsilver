Fail = _.clone({
  platforms: {
    "Ubuntu": 'ubuntu'
    ,"Firefox": 'firefox'
    ,"MSIE": 'msie'
  }
  
  ,ua: navigator.userAgent
  
  ,sniff_platforms: function() {
    var sniffed = []
      ,slot;
      
    for(slot in this.platforms)
      if(this.ua.match(slot)) sniffed.push(this.platforms[slot]);

    return sniffed;    
  }
  
  ,to_html: function() {
    return _.template('fail', {
      platforms: this.sniff_platforms()
    });
  }
});


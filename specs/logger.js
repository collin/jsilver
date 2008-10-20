(function(_) {
  _.logger = {};

  _(function(){
    _('head').append("\
<style>\
 .platform {\
  width: 32px;\
  height: 32px;\
  border: 1px outset;\
  background-repeat: no-repeat;\
  background-position: center;\
  padding: 10px; }\
  .platform.ubuntu {\
    background-image: url(/public/icons/ubuntu.png); }\
  .platform.firefox {\
    background-image: url(/public/icons/firefox.png); }\
  .platform.msie {\
    background-image: url(/public/icons/msie.png); }\
</style>\
");
  });

_.template('platform', "\
<div class='platform #{platform}'></div>\
");

_.template('fail', "\
<div class='fail'>\
  =[platform||platform<-sniff_platforms]\
</div>\
");

_.template('run', "\
<div class='run' name='#{id}'>\
  <ul>\
    <li>\
      ={fail:runnables}\
    </li>\
  </ul>\
</div>\
");

_(function() {  
  stomp.onmessageframe = function(frame) {
    var payload = JSON.parse(frame.body);
    console.log('Message Frame: ', payload);
    console.dir(payload);
    fails = ""
    _(payload).each(function(){
      Run.connect(Fail.clone(this));
    });
  };
});


Run = _.clone({
  all: {}
  
  ,runnables: []
  
  ,to_html: function() {
    console.log(this)
    return _.template('run', this);
  }
  
  ,connect: function(runnable) {
    var run;
    if(Run.all[runnable.run]) {
      runnable.run = run = Run.all[runnable.run];
      this.runnables.push(runnable);
    }
    else {
      run = this.clone({
        runnables: [runnable]
        ,id: runnable.run
      });
      Run.all[run.id] = run;
    }
    run.display();
  }
  
  ,display: function() {
    var el = this.element();
    console.log(el)
    if(el.length) el.replaceWith(this.to_html());
    else _('body').append(this.to_html());
  }
  
  ,element: function() {
    return _('[name="'+this.id+'"]');
  }
});


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


})(jQuery);

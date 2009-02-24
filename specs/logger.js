(function(_) {
  _.logger = {};

  _(function(){
    _('head').append("\
<style>\
   .fails {\
  clear: both; }\
  .fails li {\
    list-style: none; }\
    .fails li .meta p, .fails li .meta h2 {\
      float: left; }\
    .fails li .meta h2 {\
      opacity: 0.5; }\
    .fails li .meta p {\
      margin-top: 28px;\
      margin-left: 16px; }\
    .fails li .meta .meat {\
      padding-left: 142px;\
      clear: both; }\
      .fails li .meta .meat code {\
        padding-left: -50px; }\
      .fails li .meta .meat .message {\
        padding-top: 10px;\
        color: red; }\
\
.platform {\
  width: 32px;\
  height: 32px;\
  background-repeat: no-repeat;\
  background-position: center;\
  padding: 10px;\
  float: left;\
  position: relative; }\
  .platform span {\
    font-size: 10px;\
    font-family: sans-serif;\
    color: white;\
    background-color: black;\
    opacity: 0.5;\
    position: absolute;\
    bottom: 0px;\
    left: 0px;\
    padding: 0 3px; }\
  .platform.ubuntu {\
    background-image: url(/public/icons/ubuntu.png); }\
  .platform.firefox {\
    background-image: url(/public/icons/firefox.png); }\
  .platform.msie {\
    background-image: url(/public/icons/msie.png); }\
 .fails {\
  clear: both; }\
  .fails li {\
    list-style: none; }\
    .fails li .meta p, .fails li .meta h2 {\
      float: left; }\
    .fails li .meta h2 {\
      opacity: 0.5; }\
    .fails li .meta p {\
      margin-top: 28px;\
      margin-left: 16px; }\
    .fails li .meta .meat {\
      padding-left: 142px;\
      clear: both; }\
      .fails li .meta .meat code {\
        padding-left: -50px; }\
      .fails li .meta .meat .message {\
        padding-top: 10px;\
        color: red; }\
\
.platform {\
  width: 32px;\
  height: 32px;\
  background-repeat: no-repeat;\
  background-position: center;\
  padding: 10px;\
  float: left; }\
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
<div class='platform #{platform}'>\
  <span>\
    #{version}\
  </span>\
</div>\
");

_.template('fail', "\
={platform:sniff_platforms}\
<div class='meta'>\
  <h2>It</h2>\
  <p>\
    #{it}\
  </p>\
  <div class='meat'>\
    <code class='prettyprint'>\
      #{spec}\
    </code>\
    <div class='message'>\
      #{error}\
    </div>\
  </div>\
</div>\
");

_.template('run', "\
<div class='run' name='#{id}'>\
  <ul class='fails'>\
    <li>\
      ={fail:runnables}\
    </li>\
  </ul>\
</div>\
");

_(function() {  
  stomp.onmessageframe = function(frame) {
    var payload = JSON.parse(frame.body);
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
    if(el.length) el.replaceWith(this.to_html());
    else _('body').append(this.to_html());
  }
  
  ,element: function() {
    return _('[name="'+this.id+'"]');
  }
});


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


})(jQuery);

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

 = _.template('platform', "\
<div class='platform #{platform}'></div>\
");

 = _.template('fail', "\
<div class='fail'>\
  =[platform || platform <- platforms]\
</div>\
");

_(function() {
  stomp.onmessageframe = function(frame) {
    var payload = JSON.parse(frame.body);
    console.log('Message Frame: ', payload);
    console.dir(payload);
  };
  
});

})(jQuery);

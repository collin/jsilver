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

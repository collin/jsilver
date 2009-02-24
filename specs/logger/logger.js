_(function() {  
  stomp.onmessageframe = function(frame) {
    var payload = JSON.parse(frame.body);
    fails = ""
    _(payload).each(function(){
      Run.connect(Fail.clone(this));
    });
  };
});

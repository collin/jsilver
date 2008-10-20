_(function() {
  stomp.onmessageframe = function(frame) {
    var payload = JSON.parse(frame.body);
    console.log('Message Frame: ', payload);
    console.dir(payload);
  };
  
  _('body').append(_.logger.platform.clone().addClass('ubuntu'));
});

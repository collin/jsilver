console.log('hello world!!');
console.log(parent)
parent.stomp.send("OMG", "$CHANNEL_2");
setTimeout(function() {
  jQuery(parent.document.body).find('iframe').remove();
}, 100);

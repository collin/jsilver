console.log("Sending Message:");
parent.stomp.send("FUCK YES", "$CHANNEL_2", "");
setTimeout(function() {
  jQuery(parent.document.body).find('iframe').remove();
}, 100);

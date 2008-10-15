console.log("Loaded Test");
document.domain = document.domain;

Screw.Unit(function() {
  describe('Sample', function() {
    it("does equality", function() {
      expect(0).to(equal, 1);
    });
    it("does equality", function() {
      expect([1,2,4]).to(equal, [4,5,6]);
    });
  });
  
  after(function() {  
    console.error("figure out custom loggers");
    
    setTimeout(function(){
      var msgs = "";
      jQuery('.it').each(function(){
        var it = jQuery(this)
          ,_name = it.children(':first').text()
          ,msg = it.find('.error').text()
          ;/*,payload = JSON.stringify({
            it: _name
            ,msg: msg
          });*/
          msgs += "\nFAIL: "+_name+'. '+msg;
      });
      
      parent.stomp.send(navigator.userAgent+msgs, "$CHANNEL_2");
    
      jQuery(parent.document.body).find('iframe').remove();
    }, 250);
  });
});



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

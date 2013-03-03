/*global describe:false, it:false, assert:false,
beforeEach:false, afterEach:false, before:false, after:false */

describe('jquery.dragncrop.js', function() {

  beforeEach(function() {
    $('#sandbox').append($('<div style="width: 200px; height: 200px">\
                         <img src="350x250.gif" id="imgv" /></div>'));
    $('#sandbox').append($('<div style="width: 200px; height: 200px">\
                         <img src="250x350.gif" id="imgh"/></div>'));
  });

  afterEach(function() {
    $('#sandbox').html('');
  });

  it('is a jquery plugin', function() {
    assert.isFunction($.fn.dragncrop);
  });

  it('returns the object', function() {
    var el = $('#imgv');
    assert.equal(el, el.dragncrop());
  });

  describe('after initialization', function() {

    it('is an instance of jquery.ui.draggable', function() {
      var el = $('#imgv').dragncrop().imagesLoaded(function(){
        // if is not an instance, will throw error
        el.draggable('widget');
      });
    });

    it('adds class to the parent container if it is not present', function() {
      var el = $('#imgv').dragncrop();
      assert.isTrue(el.parent().hasClass('dragncrop'));
    });

    it('applies a class on the element in function of proportion', function(done) {
      $('#imgv').dragncrop();
      $('#imgh').dragncrop();
      $('#sandbox img').imagesLoaded(function() {
        assert.isTrue($('#imgv').hasClass('dragncrop-horizontal'));
        assert.isTrue($('#imgh').hasClass('dragncrop-vertical'));
        done();
      });
    });

    it('resizes img to container', function(done) {
      $('#imgv').dragncrop();
      $('#imgh').dragncrop();
      $('#sandbox img').imagesLoaded(function() {
        assert.equal($('#imgv').height(), 200);
        assert.equal($('#imgh').width(), 200);
        done();
      });
    });

  });

  describe('destroy method', function() {

    it('removes draggable widget', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();

      el.imagesLoaded(function() {
        el.dragncrop('destroy');
        try {
          el.draggable('widget');
        }
        catch (e){
          err = e;
        }
        assert.isNotNull(err, 'Catched error');
        done();
      });
    });

    it('returns element inner html to the initial state', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();
      var before = el.parent().children();
      el.imagesLoaded(function() {
        var after = el.dragncrop('destroy').parent().children();
        assert.equal(before.length, after.length);
        done();
      });
    });

    it('cleans up classes from container', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();
      var before = el.parent().attr('class');
      el.imagesLoaded(function() {
        var after = el.dragncrop('destroy').parent().attr('class');
        assert.equal(before, after);
        done();
      });
    });

    it('cleans up classes from element', function(done) {
      var err = null;
      var el = $('#imgv').dragncrop();
      var before = el.attr('class') || '';
      el.imagesLoaded(function() {
        var after = el.dragncrop('destroy').attr('class');
        assert.equal(before, after);
        done();
      });
    });

  });

});
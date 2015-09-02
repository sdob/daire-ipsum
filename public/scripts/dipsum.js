function goGet() {
  var numParas = +($('#input-paras').val());
  var factor = +($('#input-factor').val());
  $('#result').html('');
  $.ajax('/api/paragraphs/' + numParas + '?factor='  + factor)
  .done(function (data) {
    var paras = data.map(function (p) {
      return $('<p/>').html(p);
    });
    $('#result').html(paras);
  });
}

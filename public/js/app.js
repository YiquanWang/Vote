$(document).ready(function () {

  // confirmations
  $('.confirm').submit(function (e) {
    e.preventDefault();
    var self = this;
    var msg = 'Are you sure?';
    bootbox.confirm(msg, 'cancel', 'Yes! I am sure', function (action) {
      if (action) {
        $(self).unbind('submit');
        $(self).trigger('submit');
      }
    });
  });

  $('#tags').tagsInput({
    'height':'60px',
    'width':'280px'
  });

  $('input:checkbox').each(function(){
    $(this).click(function(){
      $('[name="'+ $(this).attr('name')+'"]:text').attr('disabled',true);
      $('[name="'+ $(this).attr('name')+'"]:checkbox:checked').each(function(){
        $('#txt-'+$(this).attr('id')).attr('disabled',false);
      })
      $('[name="'+ $(this).attr('name')+'"]:checkbox').not('[name="'+ $(this).attr('name')+'"]:checkbox:checked').each(function(){
        $('#txt-'+$(this).attr('id')).val('');
      })
    })
  })
});

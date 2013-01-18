 $(function() {
  $('[name="name"]').val('#{vote.name}');
  $('[name="team"]').val('#{vote.team}');
  $('[name="sex"][value="#{vote.sex}"]').attr('checked','checked');
  $('[name="tel"]').val('#{vote.tel}');
  $('[name="qs1"][value="#{vote.qs1}"]').attr('checked','checked');

  $('[name="qs2"]').each(function(){
    if('#{vote.qs2}'.indexOf($(this).val()) >=0){
      $(this).attr('checked','checked');
    }
  })

  $('[name="qs3"]').each(function(){
    if('#{vote.qs3}'.indexOf($(this).val()) >=0){
      $(this).attr('checked','checked');
      if($(this).val() == '其他'){
        $("#txt-qs3-4").removeAttr('disabled');
        $("#txt-qs3-4").val('#{vote.qs3}'.split(':')[1]);
      }

    }

  })

  $('[name="qs4"]').each(function(){
    if('#{vote.qs4}'.indexOf($(this).val()) >=0){
      $(this).attr('checked','checked');
      var ansarry = '#{vote.qs4}'.split(', ');

      if($(this).val() == 'QQ'){
        $("#txt-qs4-1").removeAttr('disabled');
        for(var ans in ansarry){
          if(ansarry[ans].indexOf('QQ') >=0){
            $("#txt-qs4-1").val(ansarry[ans].split(':')[1]);
          }
        }             
      }
      if($(this).val() == '邮箱'){
        $("#txt-qs4-2").removeAttr('disabled');
        for(var ans in ansarry){
          if(ansarry[ans].indexOf('邮箱') >=0){
            $("#txt-qs4-2").val(ansarry[ans].split(':')[1]);
          }
        } 
      }
      if($(this).val() == 'MSN'){
        $("#txt-qs4-3").removeAttr('disabled');
        for(var ans in ansarry){
          if(ansarry[ans].indexOf('MSN') >=0){
            $("#txt-qs4-3").val(ansarry[ans].split(':')[1]);
          }
        } 
      }
      if($(this).val() == '其他'){
        $("#txt-qs4-4").removeAttr('disabled');
        for(var ans in ansarry){
          if(ansarry[ans].indexOf('其他') >=0){
            $("#txt-qs4-4").val(ansarry[ans].split(':')[1]);
          }
        } 
      }
    }
  })


  $('[name="qs5"]').val('#{vote.qs5}');
  $('[name="qs6"]').val('#{vote.qs6}');
  $('[name="qs7"]').val('#{vote.qs7}');
})
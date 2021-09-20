
$(function()
{
 

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

                    $.ajax({
                type: "POST",
                url: 'handler.php',
                data: $form.serialize(),
                success: 'after_form_submitted',
                dataType: 'json' 
            });        
        
      });	
});

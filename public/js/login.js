$(document.forms['login-form']).on('submit', function() {
    var form = $(this);

    $('.error', form).html('');
    $(":submit", form).button("loading");

    $.ajax({
        url: "/",
        method: "POST",
        data :form.serialize(),
        complete: function () {
            $(":submit", form).buton("reset");
        },
        statusCode: {
            200: function() {
                form.html("Ви увійшли на сайт").addClass('alert-success');
                window.location.href = "/";
            },
            403: function(jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
});
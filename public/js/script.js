$(document).ready(function() {
    $('#message').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Кнопка, що викликає модаль
        var recipient = button.data('whatever') // Витягування інфи з атрибутів data-*
        // Якщо необхідно, ви можете створювати тут AJAX-запит (а потім здійснювати оновлення в callback).
        // Оновлення вмісту модалі. Ми будемо використовувати тут jQuery, але ви можете використовувати бібліотеку data binding або інші методи.
        var modal = $(this)
        modal.find('.modal-title').text('Нове повідомлення для ' + recipient)
        modal.find('.modal-body #recipient-name').val(recipient)
    });

    $('.logIn-btn').click(function (req, res, next) {
        $('input[type="text"], input[type="password"]').removeAttr('style');
        $('.noMail, .noPass').addClass('hidden');
        var mail = $('#mail').val();
        var password = $('#password').val();
        if (mail == '') {
            $('.noMail').removeClass('hidden');
            $('input[type="text"]').css({"border": "2px solid red", "box-shadow": "0 0 3px red"});
        } else if (password == '') {
            $('.noPass').removeClass('hidden');
            $('input[type="password"]').css({"border": "2px solid red", "box-shadow": "0 0 3px red"});
        } else {
            $.ajax({
                method: "POST",
                url: "/login",
                data: {mail: mail, password: password},
                success: function (result) {
                    if (result == "errLogin") {
                        $('.errMail').removeClass('hidden');
                        $('input[type="text"]').css({"border": "2px solid red", "box-shadow": "0 0 3px red"});
                        $('.errPass').removeClass('hidden');
                        $('input[type="password"]').css({"border": "2px solid red", "box-shadow": "0 0 3px red"});
                    } else {
                        $('.logedOut').addClass('hidden');
                        $('#user').html(result);
                        $('.logedIn').removeClass('hidden');
                        $('.adm').removeClass('hidden');
                    }
                }
            });

        }
    });

    $('.logOut-btn').click(function (req, res, next) {
        $.ajax({
            method: "POST",
            url: "login",
            success: function (result) {
                if (result == "logedOut") {
                    $('.logedIn').addClass('hidden');
                    $('.logedOut').removeClass('hidden');
                    $('.adm').addClass('hidden');
                }
            }
        });
    });

    $('.summernote').summernote({
            lang: 'uk-UA' // default: 'en-US'
    });
    $('.send').click(function(){
        var title = $('.summernote').eq(0).summernote('code');
        var descrip = $('.summernote').eq(1).summernote('code');
        var news = $('.summernote').eq(2).summernote('code');
        $.ajax({
            method: "POST",
            url: "add",
            data:{title: title, descrip: descrip, news: news, action: "addNew"}
        });
    });

});

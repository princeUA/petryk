$(document).ready(function() {
    //Modal form
    $('#message').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Кнопка, що викликає модаль
        var recipient = button.data('whatever') // Витягування інфи з атрибутів data-*
        // Якщо необхідно, ви можете створювати тут AJAX-запит (а потім здійснювати оновлення в callback).
        // Оновлення вмісту модалі. Ми будемо використовувати тут jQuery, але ви можете використовувати бібліотеку data binding або інші методи.
        var modal = $(this)
        modal.find('.modal-title').text('Нове повідомлення для ' + recipient)
        modal.find('.modal-body #recipient-name').val(recipient)
    });
    //Login
    $('.logIn').submit(function () {
        $('input[type="email"], input[type="password"]').removeAttr('style');
        $('.noMail, .noPass').addClass('hidden');
        var mail = $('#mail').val();
        var password = $('#password').val();
        if (mail == '') {
            $('.noMail').removeClass('hidden');
            $('input[type="email"]').css({"border": "2px solid red", "box-shadow": "0 0 3px red"});
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
                        $('input[type="mail"]').css({"border": "2px solid red", "box-shadow": "0 0 3px red"});
                        $('.errPass').removeClass('hidden');
                        $('input[type="password"]').css({"border": "2px solid red", "box-shadow": "0 0 3px red"});
                    } else {
                        $('.logedOut').addClass('hidden');
                        $('#user').html(result.login);
                        $('#img').html('<img class="img-responsive img-rounded loginImg" src="'+ result.image + ' ">');
                        $('.logedIn').removeClass('hidden');
                        $('.adm').removeClass('hidden');
                    }
                }
            });

        }
    });
    //Logout
    $('.logOut-btn').click(function () {
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
    // Add new
    $('.add').click(function(){
        var title = $('.summernote').eq(0).summernote('code');
        var descrip = $('.summernote').eq(1).summernote('code');
        var news = $('.summernote').eq(2).summernote('code');
        $.ajax({
            method:"POST",
            url: "add",
            data:{title: title, descrip: descrip, news: news, action: "addNew"}
        })
        .done(function(result){
            if(result == "done"){
                window.location = "/news";
            }
            else if(result == "403"){
                $('.main').html('Вибачте, сталася помилка<br>403<br>Доступ заборонено');
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            $('.main').html('Вибачте, сталася помилка<br>' + textStatus + '<br>' + errorThrown);
        });
    });
    //Edit new
    $('.edit').click(function(){
        var title = $('.summernote').eq(0).summernote('code');
        var descrip = $('.summernote').eq(1).summernote('code');
        var news = $('.summernote').eq(2).summernote('code');
        $.ajax({
            method:"POST",
            url: "edit",
            data:{title: title, descrip: descrip, news: news, action: "editNew"}
        })
        .done(function(result){
             if(result == "done"){
                 window.location = "/news";
             }
             else if(result == "403"){
                 $('.main').html('Вибачте, сталася помилка<br>403<br>Доступ заборонено');
             }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            $('.main').html('Вибачте, сталася помилка<br>' + textStatus + '<br>' + errorThrown);
        });
    });
    //Edit main page
    $('.editmain').click(function(){
        var main = $('.summernote').eq(0).summernote('code');
        $.ajax({
            method:"POST",
            url: "editmain",
            cache: false,
            data:{main:main, action: "editMain"}
        })
        .done(function(result){
            if(result == "done"){
                window.location = "/";
            }
            else if(result == "403"){
                $('.main').html('Вибачте, сталася помилка<br>403<br>Доступ заборонено');
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            $('.main').html('Вибачте, сталася помилка<br>' + textStatus + '<br>' + errorThrown);
        });
    });
    //Add new album
    $('.addAlbum').click(function(){
        var title = $('.summernote').eq(0).summernote('code');
        var photo = $('.summernote').eq(1).summernote('code');
        $.ajax({
            method:"POST",
            url: "addalbum",
            cache: false,
            data:{title:title, photo:photo, action: "addAlbum"}
        })
            .done(function(result){
                if(result == "done"){
                    window.location = "/photos";
                }
                else if(result == "403"){
                    $('.main').html('Вибачте, сталася помилка<br>403<br>Доступ заборонено');
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown){
                $('.main').html('Вибачте, сталася помилка<br>' + textStatus + '<br>' + errorThrown);
            });
    });
    $(".editPhotos-btn").click(function(){
        $(".photos").addClass("hidden");
        $(".editPhotos").addClass("show");
    });
    $(".conf-btn").click(function(){
        var photos = $('.summernote').summernote('code');
        $.post("photo", {photos: photos, action: "editPhotos", id: 24})
            .done(function(result){
                if(result == "403"){
                    $('.main').html('Вибачте, сталася помилка<br>403<br>Доступ заборонено');
                } else if(result == "done") {
                    $(".editPhotos").addClass("hidden");
                    $(".photoRow").html("<div>photos</div>")
                }             
            })
            .fail(function(jqXHR, textStatus, errorThrown){
                $('.main').html('Вибачте, сталася помилка<br>' + textStatus + '<br>' + errorThrown);
            });
    });
});


var options = {
    "username": Storage.get("username"),
    "password": Storage.get("password"),
    "is_loginpass_ok": Storage.get("is_loginpass_ok")
};

function optionsInit(){
    $('#username').val(options.username);
    $('#password').val(options.password);
    $('#save').click(save);
    $('#username,#password').keypress(function(ev){
        if (ev.which==13) {
            save();
        }
    });
}

function save() {
    var data = {
        'username': $('#username').val(),
        'password': $('#password').val()
    };

    status('Проверяю...');

    $.post(API_CHECK_LOGINPASS_URL, data, function(json) {
        
        if (json.new_messages == undefined) {
            status('Oops, неверный логин или пароль.', true);
        } else {
            status('Сохранил :)', true);

                //<br/><a href="javascript:window.close();">Закрыть</a>

            Storage.set('username', data.username);
            Storage.set('password', data.password);

            Storage.set('is_loginpass_ok', IS_LOGINPASS_OK);

            chrome.extension.getBackgroundPage().onLoggedIn();
        }

    }, 'json').error(function(o, type, text) {
        status('Черт, шибка сервера, попробуйте чуть позже ('+type+': '+text+')', true);
    });
}

function status(text, autoHide){
    $('#status span').text(text).fadeIn();

    if (autoHide != undefined){
        setTimeout(function(){
            $('#status span').fadeOut();
        }, 5000);
    }
}
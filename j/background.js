var requestFailureCount = 0;

function setBadgeUnreadCount(count) {
    unreadCount = count;
    if (count == 0) {
        count = "";
    }
    setBadgeText(count);
}

function checkMail() {
    var data = {
        'username': Storage.get('username'),
        'password': Storage.get('password')
    };

    setBadgeText('...');
    setBadgeBg(COLOR_LOADING);

    $.post(API_CHECK_EMAIL_URL, data, function(json) {

        if (json.new_messages != undefined) {
            requestFailureCount = 0;

            setBadgeUnreadCount(json.new_messages);
            setBadgeBg(COLOR_UNREAD);

        //if (badge > 0) {
        //    chrome.browserAction.setTitle('Есть новые письма');
        //}
        } else {
            ++requestFailureCount;
            setBadgeText('fail');
            setBadgeBg(COLOR_FAIL);
        }
    }, 'json').error(function(){
        setBadgeText('fail');
        setBadgeBg(COLOR_FAIL);
    });
}

// from Google Mail Checker
function scheduleRequest() {
    var randomness = Math.random() * 2;
    var exponent = Math.pow(2, requestFailureCount);
    var delay = Math.min(randomness * POLL_INTERVAL_MIN * exponent, POLL_INTERVAL_MAX);
    delay = Math.round(delay);

    window.setTimeout(checkMail, delay);
}

function goToInbox() {
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
        for (var i = 0, tab; tab = tabs[i]; i++) {
            if (tab.url && isInboxUrl(tab.url)) {
                chrome.tabs.update(tab.id, {
                    selected: true
                });
                return;
            }
        }
        chrome.tabs.create({
            url: BROWSER_INBOX_URL
        });
    });
}

function isInboxUrl(url) {
    return url == BROWSER_INBOX_URL;
}

function onLoggedIn() {
    setIcon('48');
    checkMail();
    scheduleRequest();
}

function backgroundInit() {
    if (isLoggedIn()) {
        setIcon('48');
        checkMail();
    } else {
        chrome.tabs.create({
            url: chrome.extension.getURL('/v/options.html')
        });
    }
}
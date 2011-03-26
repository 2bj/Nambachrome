/**
 * Nambachrome
 * @author 2BJ / dev2bj+gmail
 */

const API_RESULT_FORMAT = 'json';
const API_URL = 'http://api.namba.kg/';
const API_CHECK_EMAIL_URL = API_URL + 'getNewMailCount.php?outputType=' + API_RESULT_FORMAT;
const API_CHECK_LOGINPASS_URL = API_CHECK_EMAIL_URL;
const BROWSER_INBOX_URL = 'http://mail.namba.kg/inbox.php';

const POLL_INTERVAL_MIN = 1000 * 60;  // 1 minute
const POLL_INTERVAL_MAX = POLL_INTERVAL_MIN * 60;  // 1 hour

const COLOR_UNREAD = [255, 0, 0, 255];
const COLOR_FAIL = [0, 0, 0, 255];
const COLOR_LOADING = [255, 247, 0, 255];

const IS_LOGINPASS_OK = 'o_O';

var unreadCount = -1;

var Storage = {
    get: function(key) {
        return localStorage[key] || null;
    },
    set: function(key, value) {
        localStorage[key] = value;
    }
};

function isLoggedIn() {
    return Storage.get('is_loginpass_ok') == IS_LOGINPASS_OK;
}

function setBadgeText(text) {
    chrome.browserAction.setBadgeText({
        text: text.toString()
    });
}

function setIcon(icon) {
    chrome.browserAction.setIcon({
        path: "/i/"+icon+".png"
    });
}

function setBadgeBg(color) {
    chrome.browserAction.setBadgeBackgroundColor({
        color: color
    });
}
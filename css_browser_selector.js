/*
 CSS Browser Selector 0.7
 Originally written by Rafael Lima (http://rafael.adm.br)
 http://rafael.adm.br/css_browser_selector
 License: http://creativecommons.org/licenses/by/2.5/

 Co-maintained by:
 https://github.com/verbatim/css_browser_selector
 https://github.com/ridjohansen/css_browser_selector

 */
var showLog = true ,
    css_browser_selector_result = '';

function log(m) {
    if (window.console && showLog) {
        console.log(m);
    }
}

function css_browser_selector(u) {
    var uaInfo = {},
        screens = [0, 768, 980, 1200],
        allScreens = screens.length,
        ua = u.toLowerCase(),
        is = function (t) {
            return RegExp(t, "i").test(ua);
        },
        version = function (p, n) {
            n = n.replace(".", "_");
            var i = n.indexOf('_'),
                ver = "";
            while (i > 0) {
                ver += " " + p + n.substring(0, i);
                i = n.indexOf('_', i + 1);
            }
            ver += " " + p + n;
            return ver;
        },
        g = 'gecko',
        w = 'webkit',
        c = 'chrome',
        f = 'firefox',
        s = 'safari',
        o = 'opera',
        m = 'mobile',
        a = 'android',
        bb = 'blackberry',
        lang = 'lang_',
        dv = 'device_',
        html = document.documentElement,
        b = [

            // browser
            (!(/opera|webtv/i.test(ua)) && /msie\s(\d+)/.test(ua)) ? ('ie ie' + (/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
                :is('firefox/') ? g + " " + f + (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + f + RegExp.$2 + ' ' + f + RegExp.$2 + "_" + RegExp.$4 : '')

                :is('gecko/') ? g

                :is('opera') ? o + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + o + RegExp.$2 + ' ' + o + RegExp.$2 + "_" + RegExp.$4 : (/opera(\s|\/)(\d+)\.(\d+)/.test(ua) ? ' ' + o + RegExp.$2 + " " + o + RegExp.$2 + "_" + RegExp.$3 : ''))

                :is('konqueror') ? 'konqueror'

                :is('blackberry') ? (bb + (/Version\/(\d+)(\.(\d+)+)/i.test(ua) ? " " + bb + RegExp.$1 + " " + bb + RegExp.$1 + RegExp.$2.replace('.', '_') : (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) ? ' ' + bb + RegExp.$2 + (RegExp.$3 ? ' ' + bb + RegExp.$2 + RegExp.$3 : '') : ''))) // blackberry

                :is('android') ? (a + (/Version\/(\d+)(\.(\d+))+/i.test(ua) ? " " + a + RegExp.$1 + " " + a + RegExp.$1 + RegExp.$2.replace('.', '_') : '') + (/Android (.+); (.+) Build/i.test(ua) ? ' ' + dv + ((RegExp.$2).replace(/ /g, "_")).replace(/-/g, "_") : '')) //android

                :is('chrome') ? w + ' ' + c + (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + c + RegExp.$2 + ((RegExp.$4 > 0) ? ' ' + c + RegExp.$2 + "_" + RegExp.$4 : '') : '')

                :is('iron') ? w + ' iron'

                :is('applewebkit/') ? (w + ' ' + s + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + s + RegExp.$2 + " " + s + RegExp.$2 + RegExp.$3.replace('.', '_') : (/ Safari\/(\d+)/i.test(ua) ? ((RegExp.$1 == "419" || RegExp.$1 == "417" || RegExp.$1 == "416" || RegExp.$1 == "412") ? ' ' + s + '2_0' : RegExp.$1 == "312" ? ' ' + s + '1_3' : RegExp.$1 == "125" ? ' ' + s + '1_2' : RegExp.$1 == "85" ? ' ' + s + '1_0' : '') : ''))) //applewebkit

                :is('mozilla/') ? g : ''

            // mobile
            ,
            is("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk") ? m : ''

            // os/platform
            ,
            is('j2me') ? 'j2me'

                :is('ipad|ipod|iphone') ? (
                (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua) ? 'ios' + version('ios', RegExp.$2) : '') + ' ' + (/(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : "")) //'iphone'
                //:is('ipod')?'ipod'
                //:is('ipad')?'ipad'
                :is('playbook') ? 'playbook'

                :is('kindle|silk') ? 'kindle'

                :is('playbook') ? 'playbook'

                :is('mac') ? 'mac' + (/mac os x ((\d+)[.|_](\d+))/.test(ua) ? (' mac' + (RegExp.$2) + ' mac' + (RegExp.$1).replace('.', "_")) : '')

                :is('win') ? 'win' + (is('windows nt 6.2') ? ' win8'

                :is('windows nt 6.1') ? ' win7'

                :is('windows nt 6.0') ? ' vista'

                :is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp'

                :is('windows nt 5.0') ? ' win_2k'

                :is('windows nt 4.0') || is('WinNT4.0') ? ' win_nt' : '')

                :is('freebsd') ? 'freebsd'

                : (is('x11|linux')) ? 'linux' : ''

            // user agent language
            ,
            (/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua)) ? (lang + RegExp.$2).replace("-", "_") + (RegExp.$3 != '' ? (' ' + lang + RegExp.$1).replace("-", "_") : '') : ''

            // beta: test if running iPad app
            ,
            (is('ipad|iphone|ipod') && !is('safari')) ? 'ipad_app' : ''


        ];

    function screenSize() {
        var w = (window.outerWidth || html.clientWidth) - 34;
        var h = window.outerHeight || html.clientHeight;
        var full = 9999;
        uaInfo.orientation = ((w < h) ? "portrait" : "landscape");
        // remove previous min-width, max-width, client-width, client-height, and orientation
        html.className = html.className.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "");
        css_browser_selector_result = css_browser_selector_result.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "");

        for (var i = (allScreens - 1); i >= 0; i--) {
            if (w >= screens[i]) {

                uaInfo.minw = screens[(i)];

                if (i <= 2) {
                    uaInfo.maxw = screens[(i) + 1] - 1;
                } else {
                    uaInfo.maxw = full;
                }

                break;
            }
        }
        widthClasses = "";
        for (var info in uaInfo) {
            widthClasses += " " + info + "_" + uaInfo[info]
        };
        html.className = (html.className + widthClasses);
        css_browser_selector_result += widthClasses;
        return widthClasses;
    } // screenSize


    window.onresize = screenSize;
    screenSize();


    // dataURI Selector - Início
    var data = new Image();
    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    var div = document.createElement("div");
    div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
    var isIeLessThan9 = (div.getElementsByTagName("i").length == 1);
    data.onload = data.onerror = function(){
        if(this.width != 1 || this.height != 1 || isIeLessThan9) {
            html.className += " no-datauri";
            css_browser_selector_result += ' no-datauri';
        }
        else {
            html.className += " datauri";
            css_browser_selector_result += ' datauri';
        }
    }
    // dataURI Selector - Fim


    // hidpi Selector - Início
    function getDevicePixelRatio() {
        if(window.devicePixelRatio === undefined) return 1; // No pixel ratio available. Assume 1:1.
        return window.devicePixelRatio;
    }
    if (getDevicePixelRatio() > 1) {
        html.className += ' hidpi';
        css_browser_selector_result += ' hidpi';
    }
    else {
        html.className += ' no-hidpi';
        css_browser_selector_result += ' no-hidpi';
    }
    if (getDevicePixelRatio() > 1 && getDevicePixelRatio() < 2) {
        html.className += ' retina_1x';
        css_browser_selector_result += ' retina_1x';
    } else if (getDevicePixelRatio() >= 2) {
        html.className += ' retina_2x';
        css_browser_selector_result += ' retina_2x';
    }
    // hidpi Selector - Fim


    var cssbs = (b.join(' ')) + " js ";
    html.className = (cssbs + html.className.replace(/\b(no[-|_]?)?js\b/g, "")).replace(/^ /, "").replace(/ +/g, " ");
    css_browser_selector_result = (cssbs + css_browser_selector_result.replace(/\b(no[-|_]?)?js\b/g, "")).replace(/^ /, "").replace(/ +/g, " ");

    return cssbs;
}

css_browser_selector(navigator.userAgent);

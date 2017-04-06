/**
 * ETRIBE - Device Check Util
 */

/* 브라우저 및 모바일OS Enum */
var DEVICE = {
    IOS: {name: 'iOS', minimumVersion: 7.1},
    ANDROID: {name: 'Android', minimumVersion: 4.2},
    IE: {name: 'InternetExplorer', minimumVersion: 11},
    CHROME: {name: 'Chrome', minimumVersion: 51.0},
    SAFARI: {name: 'Safari', minimumVersion: 7.1},
    FIREFOX: {name: 'Firefox', minimumVersion: 31.3}
};

/* 접속한 사용자의 UserAgent 값 */
var deviceUserAgent = navigator.userAgent.toLowerCase();

/* 디바이스  */
var DeviceCheckUtil = {
    isRestrictedDevice: function() {
        var result = false;
        var deviceType = '';

        console.log('userAgent : ' + deviceUserAgent);

        /* Device 체크 */
        deviceType = this.checkDeviceType();

        /* 버전제한 체크 */
        result = this.checkRestrict(deviceType);

        console.log('check result : ' + result);

        return result;
    },

    checkDeviceType: function() {
        if ( this.isMobile() ) {
            console.log('[mobile]');

            /* iOS 체크 */
            if ( this.isiOS() ) {
                return DEVICE.IOS;

            /* Android 체크 */
            } else if ( this.isAndroid() ) {
                return DEVICE.ANDROID;
            } else {
                return 'unknownDevice';
            }
        } else {
            console.log('[pc]');
            /* IE 체크 */
            if ( this.isIE() ) {
                return DEVICE.IE;

            /* Chrome 체크 */
            } else if ( this.isChrome() ) {
                return DEVICE.CHROME;

            /* Safari 체크 */
            } else if ( this.isSafari() ) {
                return DEVICE.SAFARI;

            /* Firefox 체크 */
            } else if ( this.isFirefox() ) {
                return DEVICE.FIREFOX;
            } else {
                return 'unknownDevice';
            }
        }
    },

    checkRestrict: function( deviceType ) {
        console.log('deviceType : ' + deviceType.name);
        console.log('minimumVersion : ' + deviceType.minimumVersion);
        console.log('version : ' + this.getVersion( deviceType ));

        return this.getVersion( deviceType ) < deviceType.minimumVersion;
/*
        switch ( deviceType ) {
            case DEVICE.IOS:
                return this.getVersion( deviceType ) < DEVICE.IOS.minimumVersion;
                break;

            case DEVICE.ANDROID:
                return this.getVersion( deviceType ) < DEVICE.ANDROID.minimumVersion;
                break;

            case DEVICE.IE:
                return this.getVersion( deviceType ) < DEVICE.IE.minimumVersion;
                break;

            case DEVICE.CHROME:
                return this.getVersion( deviceType ) < DEVICE.CHROME.minimumVersion;
                break;

            case DEVICE.SAFARI:
                return this.getVersion( deviceType ) < DEVICE.SAFARI.minimumVersion;
                break;

            case DEVICE.FIREFOX:
                return this.getVersion( deviceType ) < DEVICE.FIREFOX.minimumVersion;
                break;

            default:
                break;
        }
*/
    },

    getVersion: function( deviceType ) {
        switch ( deviceType ) {
            case DEVICE.IOS:
                return this.getiOSVersion();
                break;

            case DEVICE.ANDROID:
                return this.getAndroidVersion();
                break;

            case DEVICE.IE:
                return this.getIEVersion();
                break;

            case DEVICE.CHROME:
                return this.getChromeVersion();
                break;

            case DEVICE.SAFARI:
                return this.getSafariVersion();
                break;

            case DEVICE.FIREFOX:
                return this.getFirefoxVersion();
                break;

            default:
                break;
        }
    },

    getiOSVersion: function() {
        return deviceUserAgent.substr(deviceUserAgent.indexOf('os') + 3, 3).replace('_', '.');
    },

    getAndroidVersion: function() {
        return deviceUserAgent.substr(deviceUserAgent.indexOf('android') + 8, 3);
    },

    getIEVersion: function() {
        var msie = deviceUserAgent.indexOf('msie');

        if ( msie > 0 ) {
            return parseInt(deviceUserAgent.substring(msie + 5, deviceUserAgent.indexOf('.', msie)), 10);
        }

        var trident = deviceUserAgent.indexOf('trident/');

        if ( trident > 0 ) {
            var rv = deviceUserAgent.indexOf('rv:');

            return parseInt(deviceUserAgent.substring(rv + 3, deviceUserAgent.indexOf('.', rv)), 10);
        }

        var edge = deviceUserAgent.indexOf('edge/');

        if ( edge > 0 ) {
            return parseInt(deviceUserAgent.substring(edge + 5, deviceUserAgent.indexOf('.', edge)), 10);
        }
    },

    getChromeVersion: function() {
        return deviceUserAgent.substr(deviceUserAgent.lastIndexOf('chrome/') + 7, 4);
    },

    getSafariVersion: function() {
        return deviceUserAgent.substring(deviceUserAgent.indexOf("version")).split(" ")[0].split("/")[1].substr(0, 3);
    },

    getFirefoxVersion: function() {
        return deviceUserAgent.substr(deviceUserAgent.lastIndexOf('firefox/') + 8, 5);
    },

    isMobile: function() {
        return (/android|webos|iphone|ipad|ipod|blackberry/.test(deviceUserAgent));
    },

    isiOS: function() {
        return (/ip(hone|od|ad)/.test(deviceUserAgent));
    },

    isAndroid: function() {
        return (/android/.test(deviceUserAgent));
    },

    isIE: function() {
        return (/msie|trident|edge/.test(deviceUserAgent));
    },

    isChrome: function() {
        return (/chrome/.test(deviceUserAgent));
    },

    isSafari: function() {
        return (/safari/.test(deviceUserAgent));
    },

    isFirefox: function() {
        return (/firefox/.test(deviceUserAgent));
    }
}
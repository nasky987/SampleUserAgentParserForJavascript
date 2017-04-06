/**
 * ETRIBE - Device Check Util
 */

/* 로거 설정 */
const DEBUG_MODE = true;

const logger = function () {
    var oldConsoleLog = null;
    var newConsoleLog = {};

    newConsoleLog.enableLogger =  function enableLogger() {
        if ( oldConsoleLog == null ) {
            return;
        }

        window['console']['log'] = oldConsoleLog;
    };

    newConsoleLog.disableLogger = function disableLogger() {
        oldConsoleLog = console.log;

        window['console']['log'] = function() {};
    };

    newConsoleLog.setEnable = function ( enableStatus ) {
        if ( enableStatus ) {
            newConsoleLog.enableLogger();
        } else {
            newConsoleLog.disableLogger();
        }
    };

    return newConsoleLog;
} ();

/* 브라우저 및 모바일OS Enum */
const DEVICE = {
    IOS: {name: 'iOS', minimumVersion: 7.1},
    ANDROID: {name: 'Android', minimumVersion: 4.2},
    IE: {name: 'InternetExplorer', minimumVersion: 11},
    CHROME: {name: 'Chrome', minimumVersion: 51.0},
    SAFARI: {name: 'Safari', minimumVersion: 7.1},
    FIREFOX: {name: 'Firefox', minimumVersion: 31.3},
    UNKNOWN: {name: 'Unknown Device', minimumVersion: 0}
};

/* 접속한 사용자의 UserAgent 값 */
var deviceUserAgent = navigator.userAgent.toLowerCase();

/* 디바이스 체크 유틸 */
var DeviceCheckUtil = {
    /* 제한된 디바이스 여부 체크 */
    isRestrictedDevice: function() {
        logger.setEnable(DEBUG_MODE);

        var result = false;
        var deviceType = '';

        console.log('userAgent : ' + deviceUserAgent);

        deviceType = this.checkDeviceType();

        result = this.checkRestrict(deviceType);

        console.log('check result : ' + result);

        return result;
    },

    /* 디바이스 타입 체크 */
    checkDeviceType: function() {
        if ( this.isMobile() ) {
            console.log('[mobile]');

            /* iOS 체크 */
            if ( this.isiOS() ) {
                return DEVICE.IOS;

            /* Android 체크 */
            } else if ( this.isAndroid() ) {
                return DEVICE.ANDROID;

            /* 예외 처리 */
            } else {
                return DEVICE.UNKNOWN;
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

            /* 예외 처리 */
            } else {
                return DEVICE.UNKNOWN;
            }
        }
    },

    /* 버전제한 체크 */
    checkRestrict: function( deviceType ) {
        console.log('deviceType : ' + deviceType.name);
        console.log('minimumVersion : ' + deviceType.minimumVersion);
        console.log('version : ' + this.getVersion( deviceType ));

        return this.getVersion( deviceType ) < deviceType.minimumVersion;
    },

    /* 버전 정보 획득 */
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

            case DEVICE.UNKNOWN:
                return DEVICE.UNKNOWN.minimumVersion;
                break;

            default:
                break;
        }
    },

    getiOSVersion: function() {
        return deviceUserAgent.match(/os\s([0-9]+_[0-9]+)/)[1].replace('_', '.');
    },

    getAndroidVersion: function() {
        return deviceUserAgent.match(/android\s([0-9]+\.[0-9]+)/)[1];
    },

    getIEVersion: function() {
        var msie = deviceUserAgent.indexOf('msie');

        if ( msie > 0 ) {
            return deviceUserAgent.match(/msie\s([0-9]+)/)[1];
        }

        var trident = deviceUserAgent.indexOf('trident/');

        if ( trident > 0 ) {
            var rv = deviceUserAgent.indexOf('rv:');

            return deviceUserAgent.match(/rv:([0-9]+)/)[1];
        }

        var edge = deviceUserAgent.indexOf('edge/');

        if ( edge > 0 ) {
            return deviceUserAgent.match(/edge\/([0-9]+)/)[1];
        }
    },

    getChromeVersion: function() {
        return deviceUserAgent.match(/chrom(e|ium)\/([0-9]+\.[0-9]+)/)[2];
    },

    getSafariVersion: function() {
        return deviceUserAgent.match(/version\/([0-9]+\.[0-9]+)/)[1];
    },

    getFirefoxVersion: function() {
        return deviceUserAgent.match(/firefox\/([0-9]+\.[0-9]+)/)[1];
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
        return (/chrom(e|ium)/.test(deviceUserAgent));
    },

    isSafari: function() {
        return (/safari/.test(deviceUserAgent));
    },

    isFirefox: function() {
        return (/firefox/.test(deviceUserAgent));
    }
};
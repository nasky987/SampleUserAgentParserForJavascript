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
    /*
    DEVICE: {
        IOS: {name: 'iOS', minimumVersion: 7.1},
        ANDROID: {name: 'Android', minimumVersion: 4.2},
        IE: {name: 'InternetExplorer', minimumVersion: 11},
        CHROME: {name: 'Chrome', minimumVersion: 51.0},
        SAFARI: {name: 'Safari', minimumVersion: 7.1},
        FIREFOX: {name: 'Firefox', minimumVersion: 31.3}
    },

    userAgent: navigator.userAgent.toLowerCase(),
*/
    isRestrictedDevice: function() {
        var result = false;
        var deviceType = '';

        console.log('start');

        /* Device 체크 */
        deviceType = this.checkDeviceType();

        /* 버전제한 체크 */
        result = this.checkRestrict(deviceType);

        console.log(result);

        return result;
    },

    checkDeviceType: function() {
        console.log('checkDeviceType()');

        if ( this.isMobile() ) {
            console.log('mobile');

            /* iOS 체크 */
            if ( this.isiOS() ) {
                console.log('iOS');
                return DEVICE.IOS;

            /* Android 체크 */
            } else if ( this.isAndroid() ) {
                console.log('Android');
                return DEVICE.ANDROID;
            }
        } else {
            console.log('pc');
            /* IE 체크 */
            if ( this.isIE() ) {
                console.log('ie');
                return DEVICE.IE;

            /* Chrome 체크 */
            } else if ( this.isChrome() ) {
                console.log('chrome');
                return DEVICE.CHROME;

            /* Safari 체크 */
            } else if ( this.isSafari() ) {
                console.log('safari');
                return DEVICE.SAFARI;

            /* Firefox 체크 */
            } else if ( this.isFirefox() ) {
                console.log('firefox');
                return DEVICE.FIREFOX;
            }
        }
    },

    checkRestrict: function( deviceType ) {
        console.log('checkRestrict() : ' + deviceType.name);
        console.log('userAgent : ' + deviceUserAgent);
        console.log('version : ' + this.getVersion( deviceType ));

        switch ( deviceType ) {
            case DEVICE.IOS:
                console.log('A1');
                return this.getVersion( deviceType ) < DEVICE.IOS.minimumVersion;
                break;

            case DEVICE.ANDROID:
                console.log('A2');
                return this.getVersion( deviceType ) < DEVICE.ANDROID.minimumVersion;
                break;

            case DEVICE.IE:
                console.log('A3');
                return this.getVersion( deviceType ) < DEVICE.IE.minimumVersion;
                break;

            case DEVICE.CHROME:
                console.log('A4');
                return this.getVersion( deviceType ) < DEVICE.CHROME.minimumVersion;
                break;

            case DEVICE.SAFARI:
                console.log('A5');
                console.log('version : ' + this.getVersion( deviceType ));
                console.log('min version : ' + DEVICE.SAFARI.minimumVersion);
                console.log('compare : ' + (this.getVersion( deviceType ) < DEVICE.SAFARI.minimumVersion));
                return this.getVersion( deviceType ) < DEVICE.SAFARI.minimumVersion;
                break;

            case DEVICE.FIREFOX:
                console.log('A6');
                return this.getVersion( deviceType ) < DEVICE.FIREFOX.minimumVersion;
                break;

            default:
                console.log('A7');
                break;
        }
    },

    getVersion: function( deviceType ) {
        switch ( deviceType ) {
            case DEVICE.IOS:
                console.log('B1 - ' + this.getiOSVersion());
                return this.getiOSVersion();
                break;

            case DEVICE.ANDROID:
                console.log('B2 - ' + this.getAndroidVersion());
                return this.getAndroidVersion();
                break;

            case DEVICE.IE:
                console.log('B3 - ' + this.getIEVersion());
                return this.getIEVersion();
                break;

            case DEVICE.CHROME:
                console.log('B4 - ' + this.getChromeVersion());
                //return Liferay.Browser.getVersion();
                return this.getChromeVersion();
                break;

            case DEVICE.SAFARI:
                console.log('B5 - ' + this.getSafariVersion());
                return this.getSafariVersion();
                break;

            case DEVICE.FIREFOX:
                console.log('B6 - ' + this.getFirefoxVersion());
                return this.getFirefoxVersion();
                break;

            default:
                console.log('B7');
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

        /*
                var trident = userAgent.match(/trident\/(\d.\d)/);

                if ( trident != null ) {
                        if ( trident[1] == '7.0' ) {
                                return 11;
                        } else if ( trident[1] == '6.0' ) {
                                return 10;
                        } else if ( trident[1] == '5.0' ) {
                                return 9;
                        } else if ( trident[1] == '4.0' ) {
                                return 8;
                        } else {
                                return 7;
                        }
                } else if ( userAgent.indexOf('edge/12.0') >= 0 ) {
                        return 12;
                } else {
                        return 7;
                }
        */
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
        //return Liferay.Browser.isMobile();
        return (/android|webos|iphone|ipad|ipod|blackberry/.test(deviceUserAgent));
    },

    isiOS: function() {
        //return Liferay.Browser.isIphone() || userAgent.match(/ip(hone|od|ad)/);
        return (/ip(hone|od|ad)/.test(deviceUserAgent));
    },

    isAndroid: function() {
        return (/android/.test(deviceUserAgent));
    },

    isIE: function() {
        //return Liferay.Browser.isIe();
        return (/msie|trident|edge/.test(deviceUserAgent));
    },

    isChrome: function() {
        //return Liferay.Browser.isChrome();
        return (/chrome/.test(deviceUserAgent));
    },

    isSafari: function() {
        //return Liferay.Browser.isSafari();
        return (/safari/.test(deviceUserAgent));
    },

    isFirefox: function() {
        //return Liferay.Browser.isFirefox();
        return (/firefox/.test(deviceUserAgent));
    }
}
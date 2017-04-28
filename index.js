'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var ua = navigator.userAgent.toLowerCase().replace(/trident.* rv/, 'msie');
	var mobileDevice = (/ip(?:hone|ad|od)|android|blackberry|windows phone/.exec(ua) + '').replace(/ /g, '-') || 'other';

	var browser = {
		browser: /msie|firefox|opera|chrome|safari/.exec(ua) || 'other',
		version: (/(version|chrome|firefox|msie)[\/ :]([\d.]+)/.exec(ua) || [])[2] || '0',
		mobile: /mobile/.test(ua)
	};

	browser[browser.browser] = true;

	if (/webkit/.test(ua)) {
		browser.webkit = true;
	}

	// determine mobile in 'desktop' mode
	if (!browser.mobile && 'matchMedia' in window && ('DeviceOrientationEvent' in window || 'orientation' in window) && window.matchMedia('only screen and (min-device-width : 320px) and (max-device-width : 667px)').matches) {
		browser.mobile = true;
	}

	if (browser.mobile) {
		browser.device = mobileDevice;

		if (browser.device === 'other' && /linux/.test(ua)) {
			browser.device = 'android';
		}

		if (browser.device === 'other' && /macintosh|mac os/.test(ua)) {
			browser.device = 'iphone';
		}

		if (browser.device === 'ipad' || browser.device === 'android' && Math.min(screen.width, screen.height) > 600) {
			browser.tablet = true;
		}

		browser[browser.device] = true;

		if (!browser.tablet && (browser.iphone || browser.ipod || browser.android || browser['windows-phone'])) {
			browser.phone = true;
		}
	}

	// is weak browser, flag for turn off some ftrs
	if (browser.msie && browser.version < 10 || browser.mobile || !(window.history && history.pushState)) {
		browser.isWeak = true;
	}

	var classList = [browser.browser, browser.browser + '_' + browser.version];

	browser.version.split('.').reduce(function (res, num) {
		classList.push(browser.browser + '_' + res);
		return res + '.' + num;
	});

	if (browser.webkit) {
		classList.push('webkit');
	}

	if (browser.mobile) {
		classList.push('mobile');
		classList.push('mobile-' + browser.device);

		if (browser.tablet) {
			classList.push('tablet');
		}
	} else {
		classList.push('desktop');
	}

	var html = document.getElementsByTagName('html')[0];
	classList.forEach(function (className) {
		return html.classList.add(className);
	});

	return browser;
}();
define(["controller/Modernizr"], function (Modernizr) {

	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	return Modernizr.webgl && !iOS;
});
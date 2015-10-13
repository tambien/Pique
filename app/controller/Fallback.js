define(["jquery", "fallback.scss"], function($, fallbackStyle){

	$("body").addClass("NoSupport");

	var width = Math.min(560, $("body").width());

	var fallbackVid = $("<iframe width='"+width+"' height='315' src='https://www.youtube.com/embed/M4Mjh2TceYo' frameborder='0' allowfullscreen></iframe>");

	fallbackVid.appendTo("body");

	$("<div>", {
		"text" : "We don't support your device. :(",
		"id" : "Text"
	}).appendTo("body");


});
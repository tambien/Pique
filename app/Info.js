define(["jquery", "info.scss"], function ($, infoStyle) {

	var infoContainer = $("<div>", {
		"id" : "Info"
	}).appendTo("body");

	$("<div>", {
		"id" : "Question",
	}).appendTo(infoContainer)
		.on("click", function(){
			infoContainer.toggleClass("Expanded");
		});

	$("<div>", {
		"id" : "Content"
	}).html("<span id='Title'>pique</span><br><span id='By'>by</span><br><a href='http://famecult.com/'>FAME CULT</a><br><span id='Site'>site:</span><br><a href='http://yotammann.info'>Yotam Mann</a>")
		.appendTo(infoContainer);

});
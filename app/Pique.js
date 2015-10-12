require(["jquery", "video/Loading"], function($, Loading){

	console.log("PIQUE");

	$(function(){

		Loading.load(function(){
			//first load the background
			require(["graphics/Background", "video/Controls"], function(Background, Controls){
				//then load the videos
				require(["video/Videos"], function(Videos){

				});
			});
		});
	});
});
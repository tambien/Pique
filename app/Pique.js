require(["jquery", "video/Loading", "controller/Support", "Info"], 
	function($, Loading, Support, Info){

	console.log("PIQUE");

	$(function(){

		if (!Support){
			require(["controller/Fallback"], function(){
				Loading.resolve();
			});
		} else {
			Loading.load(function(){
				//first load the background
				require(["graphics/Background", "video/Controls"], function(Background, Controls){
					//then load the videos
					require(["video/Videos"], function(Videos){

					});
				});
			});
		}
	});

});
// Islands
( function() { 
	var island_one = new Island( sourceImage, 'one' );
	var island_two = new Island( sourceImage, 'two' );
	var island_three = new Island( sourceImage, 'three' );
	
	var layer = Game.getLayer( 'background' );
	island_one.attach( layer );
	island_two.attach( layer );
	island_three.attach( layer );
	
	var backgroundImage = new Image();
	backgroundImage.src = 'images/1945.water.gif';
	
	/*
	var canvas = layer.getCanvas();
	var context = layer.getContext();
	var pattern = context.createPattern( backgroundImage, 'repeat' );

	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = pattern;
	context.fill();
	*/
})();
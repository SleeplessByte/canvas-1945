var FPS_Logic = function( stage, layer ) {

	// Add FPS text
	var text = new Kinetic.Text({
		width: stage.getWidth() - 11,
		y: 10,
		text: '?? FPS',
		fontSize: 8,
		fontFamily: 'Arial',
		fill: 'white',
		align: 'right'
	});
	
	layer.add( text );

	var frameCount = 0;
	var frameRate = 0;
	var time = 0;
	
	this.update = function( frame ) {	
		if ( ( time += frame.timeDiff ) >= 1000 ) {
			frameRate = frameCount;
			frameCount = 0;
			time -= 1000;
			text.setText( frameRate + ' FPS' );
		}
		frameCount++;
	};
};
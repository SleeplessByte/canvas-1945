var FPS_Logic = function( stage, layer ) {

	// Add FPS text
	this.text = new Kinetic.Text({
		width: stage.getWidth() - 11,
		y: 10,
		text: '60 FPS',
		fontSize: 8,
		fontFamily: 'Arial',
		fill: 'white',
		align: 'right'
	});
	layer.add( this.text );

	this.frameCount = 0;
	this.frameRate = 0;
	this.time = 0;
	
	// Create animation loop
	var context = this;
	this.animation = new Kinetic.Animation( function( frame ) {
		context.update( frame );
	}, layer);
	
	this.animation.start();
};

FPS_Logic.prototype = {

	// Once a second updates the FPS counter
	update : function( frame ) {	
		if ( ( this.time += frame.timeDiff ) >= 1000 ) {
			this.frameRate = this.frameCount;
			this.frameCount = 0;
			this.time -= 1000;
			this.text.setText( this.frameRate + ' FPS' );
		}
		this.frameCount++;
	}
};
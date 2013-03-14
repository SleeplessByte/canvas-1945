var PlayerPlane = function ( srcimg ) {
    BasicPlane.call( this, srcimg, 'player' );
}

PlayerPlane.prototype = Object.deepExtend( 
	Object.create( BasicPlane.prototype ),
	{ 
		// Add animations (frame positions)
		getFramePositions : function() {
			return { 
				idle : {
					player : { x: 4,	y: 400  },
				}
			};
		},
		
		// The size of each animation frame
		getFrameSize : function() {
			return { w: 65, h: 65 }
		},
	}
);
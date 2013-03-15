var PlayerPlane = function ( srcimg ) {
    Sprite.call( this, srcimg, 'player' );

	var health = 100;
	
	// Returns the planes speed
	this.getSpeed = function() {
		return Game.getSpeed();
	};
	
	// Returns the planes health
	this.getHealth = function() {
		return health;
	};
}

PlayerPlane.prototype = Object.deepExtend( 
	Object.create( Sprite.prototype ),
	{ 
		// Add animations (frame positions)
		getFramePositions : function() {
			return { 
				idle : {
					player : { x: 4,	y: 400  },
				},
				
				explode : {
					player : { x: 4,	y: 301	},
				}
			};
		},
		
		// The animation length (number of frames)
		getFrameLength : function() {
			return { 
				idle : { x: 3, y: 1 },
				explode : { x: 7, y: 1 },
			}
		},
		
		// The size of each animation frame
		getFrameSize : function() {
			return { w: 65, h: 65 }
		},
	}
);
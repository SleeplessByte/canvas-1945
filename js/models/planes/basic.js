var BasicPlane = function( srcimg, type ) {
	Sprite.call( this, srcimg, type );
	
	var speed = 100;
	var health = 100;
		
	// Returns the planes speed
	this.getSpeed = function() {
		return speed;
	};
	
	// Returns the planes health
	this.getHealth = function() {
		return health;
	};

}

BasicPlane.prototype = Object.deepExtend( 
	Object.create( Sprite.prototype ),
	{ 
		// The starting position of the animation
		getFramePositions : function() {
			return { 
				idle : {
					green 	: { x: 4, 	y: 466 	},
					orange	: { x: 4, 	y: 499 	},
					white	: { x: 103,	y: 466 	},
					olive	: { x: 202,	y: 466 	},
					blue	: { x: 301,	y: 466 	}
				}
			};
				
		},
	
		// The animation length (number of frames)
		getFrameLength : function() {
			return { idle : { x: 3, y: 1 } }
		},
	
		// The size of each animation frame
		getFrameSize : function() {
			return { w: 32, h: 32 }
		}
	}
);
var Island = function( srcimg, type, y ) {
	Sprite.call( this, srcimg, type );
		
	// Returns the planes speed
	this.getSpeed = function() {
		return Game.getSpeed();
	};
	
	// Returns the planes health
	this.getHealth = function() {
		return health;
	};
	
	// Move it to a location
	this.getRandomX = function() {
		return this.getWidth() / 2 + Math.random() * 
			( Game.getStage().getWidth() - this.getWidth() );
	};
	
	this.setPosition( this.getRandomX(), { one: 320, two: 120, three: -50 }[type] );
	this.updatePosition( true );
}

Island.prototype = Object.deepExtend( 
	Object.create( Sprite.prototype ),
	{ 
		// The starting position of the animation
		getFramePositions : function() {
			return { 
				idle : {
					one 	: { x: 103, y: 499 	},
					two		: { x: 168, y: 499 	},
					three	: { x: 233,	y: 499 	},
				}
			};
				
		},
	
		// The animation length (number of frames)
		getFrameLength : function() {
			return { idle : { x: 1, y: 1 } }
		},
	
		// The size of each animation frame
		getFrameSize : function() {
			return { w: 64, h: 65 }
		},
		
		// Frame renewal
		update : function( frame ) {
			var delta = this.getSpeed() * frame.timeDiff / 1000;
			this.deltaPosition( 0, delta );
			if ( this.getPosition().y > Game.getStage().getHeight() )
				this.deltaPosition( 
					this.getRandomX() - this.getPosition().x, 
					-Game.getStage().getHeight() - this.getHeight() 
				);
				
			this.updatePosition();
		}
	}
);
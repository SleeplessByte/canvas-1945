var BasicPlane = function( srcimg, type ) {

	var type = type;
	var sprite = new Kinetic.Sprite({
	  x: 0,
	  y: 0,
	  image: srcimg,
	  animation: 'idle',
	  frameRate: 30
	});
	
	// Gets the type
	this.getType = function() {
		return type;
	};
	
	// Gets the sprite
	this.getSprite = function() {
		return sprite;
	};

	this.getSprite().setAnimations( this.getFrames() );
}

BasicPlane.prototype = {	

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
	},
	getFrameGap : function() {
		return { x: 1, y: 1  }
	},

	// Creates an array with all the frames for a type
	getFrames : function( ) {
	
		var positions = this.getFramePositions();
		var animations = { };
		for ( animation in positions ) {
			animations[ animation ] = [];
			
			var frame_position = positions[ animation ][ this.getType() ];
			var frame_lengths = this.getFrameLength();
			var frames = frame_lengths[ animation ].x * frame_lengths[ animation ].y;
			var frame_size = this.getFrameSize();
			var frame_gap = this.getFrameGap();
			
			for ( var i = 0; i < frames; i++ ) {
				animations[ animation ].push( {
					x: frame_position.x + ( i % frame_lengths[ animation ].x ) * ( frame_size.w + frame_gap.x ),
					y: frame_position.y + Math.floor( i / frame_lengths[ animation ].x ) * ( frame_size.h + frame_gap.y ),
					width: frame_size.w,
					height: frame_size.h, } );
			}
		}

		return animations;
	},
	
	getWidth : function() {
		return this.getFrameSize().w;
	},
	
	getHeight : function() {
		return this.getFrameSize().h;
	},
	
	getPosition : function() {
		return this.getSprite().getPosition();
	},
	
	setPosition : function( x, y ) {
		this.getSprite().setPosition( x, y );
	},
	
	// Attaches this to a layer
	attach : function( layer ) {
		var sprite = this.getSprite();
		layer.add( sprite );
		sprite.start();
	},
	
	// Sets the animation
	setAnimation : function( animation ) {
		var sprite = this.getSprite();
		sprite.setAnimation( animation );
		//sprite.frameRate = BasicPlane.frame_rate[ animation ]; // TODO
	}
};
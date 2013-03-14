var BasicPlane = function( srcimg, type ) {

	this.proto = BasicPlane;
	this.type = type;
	this.sprite = new Kinetic.Sprite({
	  x: 0,
	  y: 0,
	  image: srcimg,
	  animation: 'idle',
	  animations: this.getFrames(),
	  frameRate: 30
	});
}

// Cached animation arrays
BasicPlane.frame_animations = { };

// The animation length (number of frames)
BasicPlane.frame_length = {
    idle : 3,
    turn : 8,
},

// The starting position of the animation
BasicPlane.frame_positions = { 
	
    idle : {
        green 	: { x: 4, 	y: 466 	},
        orange	: { x: 4, 	y: 499 	},
        white	: { x: 103,	y: 466 	},
        olive	: { x: 202,	y: 466 	},
        blue	: { x: 301,	y: 466 	},
    },
    
    turn : {
        orange	: { x: 4,	y: 4	},
        blue	: { x: 4,	y: 37	},
        olive	: { x: 4,	y: 70	},
        white	: { x: 4,	y: 103	},
        green	: { x: 4,	y: 136	},
    }
},
	
// The size of each animation frame
BasicPlane.frame_size = { w: 32, h: 32 },
BasicPlane.frame_gap = { x: 1, y: 1  },
    
BasicPlane.prototype = {	

	// Creates an array with all the frames for a type
	getFrames : function( ) {
	
		if ( this.proto.frame_animations[ this.type ] !== undefined )
			return this.proto.frame_animations[ this.type ];
			
		var animations = { };
		for ( animation in this.proto.frame_positions ) {
			animations[ animation ] = [];
			var frame_position = this.proto.frame_positions[ animation ][ this.type ];
			for ( var i = 0; i < this.proto.frame_length[ animation ]; i++ ) {
			
				animations[ animation ].push( {
					x: frame_position.x,
					y: frame_position.y,
					width: this.proto.frame_size.w,
					height: this.proto.frame_size.h, } );
					
				frame_position.x += this.proto.frame_size.w + this.proto.frame_gap.x;
			}
		}
		
		this.proto.frame_animations[ this.type ] = animations;
		return animations;
	},
	
	// Returns the inner Kintetic sprite
	getSprite : function( ) {
		return this.sprite;
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
		//sprite.frameRate = this.proto.frame_rate[ animation ]; // TODO
	}
};
var BasicPlane = function( srcimg, type ) {

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
	
		if ( BasicPlane.frame_animations[ this.type ] !== undefined )
			return BasicPlane.frame_animations[ this.type ];
			
		var animations = { };
		for ( animation in BasicPlane.frame_positions ) {
			animations[ animation ] = [];
			var frame_position = BasicPlane.frame_positions[ animation ][ this.type ];
			for ( var i = 0; i < BasicPlane.frame_length[ animation ]; i++ ) {
				animations[ animation ].push( {
					x: frame_position.x,
					y: frame_position.y,
					width: BasicPlane.frame_size.w,
					height: BasicPlane.frame_size.h, } );
					
				frame_position.x += BasicPlane.frame_size.w + BasicPlane.frame_gap.x;
			}
		}
		
		BasicPlane.frame_animations[ this.type ] = animations;
		return animations;
	},
	
	getSprite : function( ) {
		return this.sprite;
	},
	
	attach : function( layer ) {
		level.add( this.getSprite() );
		this.getSprite().start();
	}
};
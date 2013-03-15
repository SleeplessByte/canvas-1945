var Sprite = function( srcimg, type ) {

	var type = type;
	var sprite = new Kinetic.Sprite({
	  x: 0,
	  y: 0,
	  image: srcimg,
	  animation: 'idle',
	  frameRate: 30
	});
	sprite[ 'tag' ] = this;
	
	var position = { x: 0, y: 0 };
	var positionInView = true;
	
	// Gets the type
	this.getType = function() {
		return type;
	};
	
	// Gets the sprite
	this.getSprite = function() {
		return sprite;
	};
	
	// Get the position of the plane
	this.getPosition = function() {
		return position;
	};
	
	// Set the sprite position of the plane
	this.setPosition = function( x, y ) {
		position.x = x;
		position.y = y;
		
		positionInView = this.isInView();
		return this;
	};
	
	// Updates the position by a delta value
	this.deltaPosition = function( dx, dy ) {
		position.x = position.x + dx;
		position.y = position.y + dy;
		
		positionInView = this.isInView();
		return this;
	};
	
	// Returns if position was in view last time it was set
	this.wasInView = function() { 
		return positionInView;
	}
		
	this.getSprite().setAnimations( this.getFrames() );
	
}

Sprite.prototype = {

	getFramePositions : function() { return { } },
	getFrameLength : function() { return { } },
	
	// The size of each animation frame
	getFrameSize : function() {
		return { w: 0, h: 0 }
	},

	// The size of the gap between the frames
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
	
	// Get the width of the plane
	getWidth : function() {
		return this.getFrameSize().w;
	},
	
	// Get the height of the plane
	getHeight : function() {
		return this.getFrameSize().h;
	},
	
	// Attaches this to a layer
	attach : function( layer ) {
		var sprite = this.getSprite();
		layer.add( sprite );
		sprite.start();
		
		Game.add( this.id(), this );
		return this;
	},
	
	// Sets the animation
	setAnimation : function( animation ) {
		var sprite = this.getSprite();
		sprite.setAnimation( animation );
		//sprite.frameRate = BasicPlane.frame_rate[ animation ]; // TODO
		return this;
	},
	
	afterAnimation : function( func ) {
		var sprite = this.getSprite();
		var frames = this.getFrameLength()[ sprite.getAnimation() ];
		sprite.afterFrame( frames.x * frames.y - 1, func );
	},
	
	update : function( frame ) {
		this.updatePosition();
	},
	
	// Takes care of actually moving the plane to pixel values only
	updatePosition : function( override ) {
		if ( !this.wasInView() && !override )
			return;
			
		this.getSprite().setPosition( Math.round( this.getPosition().x, 0 ), Math.round( this.getPosition().y, 0 ) );
	},
	
	// Checks if this object is in view
	isInView : function() {
		var position = this.getPosition();
		if ( position.x < -this.getWidth() )
			return false;
		if ( position.x > Game.getStage().getWidth() )
			return false;
		if ( position.y < -this.getHeight() )
			return false;
		return position.y < Game.getStage().getHeight();
	},
	
	// Destroys this sprite
	destroy : function() {
		this.getSprite().hide(); 
		this.getSprite().destroy();
		this.getSprite().stop(); 
		
		Game.remove( this.id() );
	}
};


// Add Unique Ids
(function() {
    var id = 0;

    function generateId() { return id++; };
    Sprite.prototype.id = function() {
        var newId = generateId();
        this.id = function() { return newId; };
        return newId;
    };
})();
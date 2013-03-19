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
	
	//
	this.damage = function( dmg ) {
		health -= dmg;
		if ( health <= 0 ) {
			this.explode();
		}
	}
	
	//
	this.isSolid = function() {
		return this.getSprite().getAnimation() != 'explode';
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
		
		// Exploded
		explode : function() {
			this.setAnimation( 'explode' );			
			// Hide when it's done.
			this.afterAnimation( this.afterExplode );				
		},
		
		// After explosion
		afterExplode : function() {
			this.destroy();
		},
		
		update : ( function() {
		
			// Tests collision between two sprites
			var testCollision = function( context, test ) {
				
				var tpos = test.getPosition();
				var tsize = test.getFrameSize();
				var cpos = context.getPosition();
				var csize = context.getFrameSize();
				
				return !(
					tpos.x > cpos.x + csize.w
					|| tpos.x + tsize.w < cpos.x
					|| tpos.y > cpos.y + cpos.h
					|| tpos.y + tsize.h < cpos.y 
				);
			};
		
			// Update collision
			var updateCollisions = function( context ) {
			
				var sprites = Game.getLayer( 'level' ).getChildren();
				for ( var sprite in sprites ) {
					console.info( 'sprite: ' + sprite );
					if ( context == sprites[sprite].tag 
						|| !sprites[sprite].tag.isSolid() 
					) {
						continue;
						
					// Planes on Player
					} else if ( sprites[sprite].tag instanceof BasicPlane ) {
						if ( testCollision( context, sprites[sprite].tag ) ) {
							context.onCollision( sprites[sprite].tag );
							sprites[sprite].tag.onCollision( context );
						}
				
					// Bullets on Planes
					} else if ( sprites[sprite].tag instanceof BasicBullet ) {
					
						var subsprites = Game.getLayer( 'level' ).getChildren();
						console.info( sprites[sprite] );
						for ( var subsprite in subsprites ) {
							console.info( sprites[sprite] );
							console.info( 'subsprite: ' + subsprite );
							if ( sprites[sprite].tag == subsprites[subsprite].tag 
								|| !subsprites[subsprite].tag.isSolid() 
							) {
								continue;
							} else if ( testCollision( subsprites[subsprite].tag, sprites[sprite].tag ) ) {
								//subsprites[subsprite].tag.onCollision( sprites[sprite].tag );
								//sprites[sprite].tag.onCollision( subsprites[subsprite].tag );
							}
						}
					}
				}
			};
			
			return function ( frame ) {
				updateCollisions( this );
				this.updatePosition();
			}
		})(),
		
		//
		onCollision : function( collidee ) {
			
			if( collidee instanceof BasicPlane )
				this.damage( 20 );
			
			//if( collidee instanceof EnemyBullet )
			//	this.damage( collidee.getDamage() );
		}
	}
);

// Ammend update
/*var original = PlayerPlane.prototype.update;
PlayerPlane.prototype.update = function( frame ) {
	original.call( this, frame );
};*/
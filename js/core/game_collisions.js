var GameCollisions = new function() {
	var gridsize = 40;
	var items = [];
	
	var grid = { };
	var debug = { };
		
	// Broadphase
	for( var x_ = 0; x_ < Game.width + gridsize; x_ += gridsize ) {
		grid[ x_ ] = { };
		debug[ x_ ] = { };
		for ( var y_ = 0; y_ < Game.height + gridsize; y_ += gridsize ) {
			grid[ x_ ][ y_ ] = [];
			/*debug[ x_ ][ y_ ] = new Kinetic.Text({
				x: x_,
				y: y_,
				text: x_ + ':' + y_,
				fontSize: 10,
				fontFamily: 'Calibri',
				fill: 'white',
				offset : {
					x : -gridsize / 2 + 5,
					y : -gridsize / 2 + 5
				}
			  }
			);*/
		}
	}
	
	this.attach = function( layer ) {
		for ( var x in debug ) {
			
			if ( !debug.hasOwnProperty( x ) )
				continue;
			
			for ( var y in debug[ x ] ) {
				if ( !debug[ x ].hasOwnProperty( y ) )
					continue;
				//layer.add( debug[ x ][ y ] );
			}
		}
	}
	
	this.add = function( item ) {
		items.push( item );
		
		//console.log( 'now checking collisions for ' );
		//console.log( item.getObject() );
	};
	
	this.remove = function( item ) {
		var index = items.indexOf( item );
		if ( index !== false && item !== null )
			items.splice( index, 1 ); 
		//console.log( 'no longer checking for ' );
		//console.log( item.getObject() );
		//console.log( items );
	};
	
	this.step = function( ) {
		var index;

		for ( var i = 0; i < items.length; i++ ) {
			
			var item = items[i];
			if ( !item.isActive() ) {
				this.remove( item );
				continue;
			}
			
			var position = item.getPosition();
			var size = item.getSize();
			
			var x = position.x;
			var y = position.y;
			
			// Item item in all boxes where 
			for ( var dx = 0; dx < size.w + gridsize; dx += gridsize ) {
			
				var gridx = Math.floor( ( x + dx ) / gridsize ) * gridsize;	
				if ( grid[ gridx ] === undefined )
					continue;
					
				for ( var dy = 0; dy < size.h + gridsize; dy += gridsize ) {
					
					var gridy = Math.floor( ( y + dy ) / gridsize ) * gridsize;
					if ( grid[ gridx ][ gridy ] === undefined )
						continue;
						
					grid[ gridx ][ gridy ].push( item );
				}
			}
		}
		
		// Reset grid
		for ( var x in grid ) {
			
			if ( !grid.hasOwnProperty( x ) )
				continue;
			
			
			for ( var y in grid[ x ] ) {
				if ( !grid[ x ].hasOwnProperty( y ) )
					continue;
				
				//console.info( y );
				var subgrid = grid[ x ][ y ];
				
				if ( debug[ x ][ y ] !== undefined ) { 	debug[ x ][ y ].setText( 
						//x + ':' + y +  '\n[' +
						subgrid.length //+ ']'
					);
				}
				
				if ( subgrid.length ) {
					//console.info( 'x: ' + x + ', y: ' + y + ' i:' + subgrid.length );
					for ( var i = 0; i < subgrid.length; i++ ) {
						for ( var j = i + 1; j < subgrid.length; j++) {
							if ( i === j )
								continue;
							
							if ( testCollision( subgrid[i], subgrid[j] ) ) {
								// collision
							}
						}
					}
						
					grid[ x ][ y ] = [];
				}
			}
		}

	};
	
	// Tests collision between two rects
	var testCollision = function( a, b ) {
		
		var tpos = a.getPosition();
		var tsize = a.getSize();
		var cpos = b.getPosition();
		var csize = b.getSize();
		
		return !(
			tpos.x > cpos.x + csize.w
			|| tpos.x + tsize.w < cpos.x
			|| tpos.y > cpos.y + cpos.h
			|| tpos.y + tsize.h < cpos.y 
		);
	};
};
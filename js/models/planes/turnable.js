var TurnablePlane = function ( srcimg, type ) {
    BasicPlane.call( this, srcimg, type );
}

TurnablePlane.prototype = Object.deepExtend( 
	Object.create( BasicPlane.prototype ),
	{ 
		// Add animations (frame positions)
		getFramePositions : function() {
			return Object.extend( 
				{ 
					turn : {
						orange	: { x: 4,	y: 4	},
						blue	: { x: 4,	y: 37	},
						olive	: { x: 4,	y: 70	},
						white	: { x: 4,	y: 103	},
						green	: { x: 4,	y: 136	}
					}
				},
				
				Object.getPrototypeOf( this ).getFramePositions()
			);
		},
		
		// Add animations (frame lengths)
		getFrameLength : function() {
			return Object.extend(
				{
					  turn : { x: 8, y: 1 }
				},
				
				Object.getPrototypeOf( this ).getFrameLength()
			);
		}
	}
);
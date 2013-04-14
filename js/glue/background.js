// Islands
( function() { 
	var island_one = new Island( sourceImage, 'one' );
	var island_two = new Island( sourceImage, 'two' );
	var island_three = new Island( sourceImage, 'three' );
	
	var layer = Game.getLayer( 'background' );
	island_one.attach( layer );
	island_two.attach( layer );
	island_three.attach( layer );	
})();
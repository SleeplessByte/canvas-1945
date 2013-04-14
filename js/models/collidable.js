var Collidable = function( object, f_position, f_size ) {

	var active = true;
	
	this.getObject = function() { return object; }
	this.getPosition = f_position;
	this.getSize = f_size;
	
	this.stop = function() { active = false; };
	this.isActive = function() { return active; };
}

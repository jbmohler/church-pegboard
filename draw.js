
// 27.5 ft
// 13 ft
//
//
var ft_height = 3.5 + 8 + .6;

var full_width = 1600;
var full_height = full_width / 27.5 * ft_height;

function clx(x) {
	var result = x/27.5 * full_width;
	return Math.floor(result);
}

function crx(x) {
	var result = x/27.5 * full_width;
	result = full_width - result;
	return Math.floor(result);
}

function cty(y) {
	var result = y/13 * full_height;
	return Math.floor(result);
}

function cby(y) {
	var result = y/13 * full_height;
	result = full_height - result;
	return Math.floor(result);
}

function prep_canvas() {
	var c = document.getElementById("myCanvas");
	c.width = full_width;
	c.height = full_height;

	var c = document.getElementById("btn_valley");
	c.addEventListener('click', set_valley);
	var c = document.getElementById("btn_random");
	c.addEventListener('click', set_random);
}

function set_valley() {
	var values = [8, 7, 6, 5, 6, 7, 8];
	for (var i=1; i<=7; i++ ) {
		var c = document.getElementById("b"+i);
		c.value = values[i-1];
	}

	redraw_boards();
}

function set_random() {
	for (var i=1; i<=7; i++ ) {
		var c = document.getElementById("b"+i);
		var x = Math.random()*3 + 5;
		if ( i === 1 || i === 7 ) {
			x = Math.random()*.4 + 7.6;
			x = 8.;
		}
		if ( i >= 2 && i <= 6 ) {
			x = Math.random()*2.75 + 4;
		}
		c.value = Math.round(x*10) / 10;
	}

	redraw_boards();
}

function get_board_height(index) {
	var c = document.getElementById("b"+index);
	return  Number(c.value);

}

function redraw_boards() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.clearRect(0, 0, c.width, c.height);

	// Create gradient

	// Fill with gradient
	ctx.fillStyle = 'gray';
	// ctx.fillRect(clx(27.5/2-6), cty(0), clx(12), cby(6.75)-cty(0));
	ctx.fillRect(clx(7.5), cty(0), crx(7.5)-clx(7.5), cby(6.75)-cty(0));

	var endwidths = (27.5 - 5 * 4) / 2;
	var hoffsets = [
		0,
		0*4+endwidths,
		1*4+endwidths,
		2*4+endwidths,
		3*4+endwidths,
		4*4+endwidths,
		5*4+endwidths,
		5*4+2*endwidths];

	for( var i = 1; i <= 7; i++ ) {
		var height = get_board_height(i);

		ctx.fillStyle = "black";
		var bwidth = clx(hoffsets[i]) - clx(hoffsets[i-1]);
		var bheight = cty(height);
		ctx.fillRect(clx(hoffsets[i-1])+10, cby(height), bwidth-15, bheight);
		
		var hl_x = clx(1/12);
		var hl_y = cty(1/12);
		var hl_rad_x = clx(1/48 / 2);
		var hl_rad_y = cty(1/48 / 2);
		console.log(hl_rad_x);
		console.log(hl_rad_y);

		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.ellipse(clx(hoffsets[i-1])+10, cby(height)+10, hl_rad_x, hl_rad_y, 0, 0, 2*Math.PI);
		ctx.fill();
	}
}

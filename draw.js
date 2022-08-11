
// 27.5 ft
// 13 ft
//
//

var columns = 8;

var ft_height = 11.5 + 4;

var full_width = 1000;
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
	var result = (y+4)/ft_height * full_height;
	return Math.floor(result);
}

function cby(y) {
	var result = y/ft_height * full_height;
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
	for (var i=1; i<=columns; i++ ) {
		var c = document.getElementById("b"+i);
		c.value = values[i-1];
	}

	redraw_boards();
}

function set_random() {
	for (var i=1; i<=columns; i++ ) {
		var c = document.getElementById("b"+i);
		var x = Math.random()*3 + 5;
		var early = [1, 2][Math.floor(Math.random()*2)];
		var later = [columns -1, columns][Math.floor(Math.random()*2)];
		if ( i <= 2 || i >= columns - 1 ){
			if( i == early || i == later ) {
				x = 10.;
			}else {
				x = Math.random()*2 + 8;
			}
		}
		if ( i >= 3 && i <= 6 ) {
			x = Math.random()*.75 + 6;
		}
		c.value = Math.round(x*10) / 10;
	}

	redraw_boards();
}

function get_show_dots() {
	return false;
	var c = document.getElementById("chk_show_dots");
	return c.value;
}

function get_board_height(index) {
	var c = document.getElementById("b"+index);
	return  Number(c.value);
}

function redraw_boards() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.clearRect(0, 0, c.width, c.height);

	// paint the ceiling lines
	ctx.beginPath();
	ctx.moveTo(clx(0), cty(0));
	ctx.lineTo(clx(27.5/2), cty(-4));
	ctx.lineTo(clx(27.5), cty(0));
	ctx.stroke();

	// Fill with gradient
	ctx.fillStyle = 'lightgray';
	// ctx.fillRect(clx(27.5/2-6), cty(0), clx(12), cby(6.75)-cty(0));
	ctx.fillRect(clx(7.5), cty(-1.8), crx(7.5)-clx(7.5), cby(6.75)-cty(-1.8));

	ctx.fillStyle = 'black';
	ctx.textAlign="center"; 
	ctx.textBaseline = "middle";
	var text = 'Praise God from \n whom all blessings flow \n Praise Him all \n creatures here below';
	var lines = text.split(' \n ');
	for ( let i = 0; i < lines.length; i++ ) {
		ctx.fillText(lines[i] , clx(27.5 / 2), cby(9.5)+(i-2)*25);
	}


	var base_width = 28 / 8;
	var endwidths = (27.5 - 6 * base_width) / 2;
	var hoffsets = [
		0,
		0*base_width+endwidths,
		1*base_width+endwidths,
		2*base_width+endwidths,
		3*base_width+endwidths,
		4*base_width+endwidths,
		5*base_width+endwidths,
		6*base_width+endwidths,
		6*base_width+2*endwidths];

	for( var i = 1; i <= columns; i++ ) {
		var height = get_board_height(i);

		ctx.fillStyle = "black";
		var bwidth = clx(hoffsets[i]) - clx(hoffsets[i-1]);
		var bheight = cty(height);
		ctx.fillRect(clx(hoffsets[i-1])+1, cby(height), bwidth-1, bheight);

		if ( get_show_dots() ) {
			var hl_x = clx(1/12);
			var hl_y = cty(1/12);
			//var hl_rad_x = clx(1/48 / 2);
			//var hl_rad_y = cty(1/48 / 2);

			var xdots = Math.floor((hoffsets[i] - hoffsets[i-1]) * 12);
			var ydots = Math.floor(height * 12);

			ctx.fillStyle = "white";
			for ( var dx = 0; dx < xdots; dx++ ) {
				for ( var dy = 0; dy < ydots; dy++ ) {
					ctx.beginPath();
					ctx.ellipse(clx(hoffsets[i-1]+(dx+.5)/12), cby((dy+.5)/12), 1, 1, 0, 0, 2*Math.PI);
					ctx.fill();
				}
			}
		}
	}
}

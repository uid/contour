// Marching squares implementation by mbostock, adapted for use
// independent of d3.  Originally from:
// https://github.com/d3/d3-plugins/tree/master/geom/contour

(function(exports) {

function fromCanvas(canvas, threshold, start) {
  var cw = canvas.width,
      ch = canvas.height,
      ctx = canvas.getContext("2d"),
      imgData = ctx.getImageData(0, 0, cw, ch),
      data = imgData.data,
      t = threshold | 0,
      s = start || d3_geom_contourStart(nonTransparent, Math.max(cw, ch));
  function nonTransparent(x, y) {
    return data[(y * cw + x) * 4 + 3] > t;
  }
  return s ? fromCallback(nonTransparent, s) : [];
}

function fromCallback(grid, start) {
  var s = start || d3_geom_contourStart(grid), // starting point
      c = [],    // contour polygon
      x = s[0],  // current x position
      y = s[1],  // current y position
      dx = 0,    // next x direction
      dy = 0,    // next y direction
      pdx = NaN, // previous x direction
      pdy = NaN, // previous y direction
      i = 0;

  do {
    // determine marching squares index
    i = 0;
    if (grid(x-1, y-1)) i += 1;
    if (grid(x,   y-1)) i += 2;
    if (grid(x-1, y  )) i += 4;
    if (grid(x,   y  )) i += 8;

    // determine next direction
    if (i === 6) {
      dx = pdy === -1 ? -1 : 1;
      dy = 0;
    } else if (i === 9) {
      dx = 0;
      dy = pdx === 1 ? -1 : 1;
    } else {
      dx = d3_geom_contourDx[i];
      dy = d3_geom_contourDy[i];
    }

    // update contour polygon
    if (dx != pdx && dy != pdy) {
      c.push([x, y]);
      pdx = dx;
      pdy = dy;
    }

    x += dx;
    y += dy;
  } while (s[0] != x || s[1] != y);

  return c;
}

// lookup tables for marching directions
var d3_geom_contourDx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN],
    d3_geom_contourDy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN];

function d3_geom_contourStart(grid, limit) {
  var x = 0,
      y = 0;

  // search for a starting point; begin at origin
  // and proceed along outward-expanding diagonals
  while (true) {
    if (grid(x,y)) {
      return [x,y];
    }
    if (x === 0) {
      x = y + 1;
      y = 0;
      if (x > limit) {
        return null;
      }
    } else {
      x = x - 1;
      y = y + 1;
    }
  }
}

exports.Contour = {
  fromCanvas: fromCanvas,
  fromCallback: fromCallback,
};

})(window);

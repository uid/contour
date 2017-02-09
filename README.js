# Contour Plots

Original Source <https://github.com/d3/d3-plugins/tree/master/geom/contour>

Demo: <http://bl.ocks.org/4241134>

Computes a contour for a given *grid function* using the [marching squares](http://en.wikipedia.org/wiki/Marching_squares) algorithm. Returns the contour polygon as an array of points. The grid function takes two arguments, *x* and *y*, and returns true if the specified point is inside the contour, and false for points outside the contour. The contour plugin can also take an optional starting point [x, y] on the grid.

Usage:
```
<script src="https://rawgit.com/uid/contour/master/contourjs"></script>

...

// Returns a path of coordinates [[x, y], ...] around nontransparent pixels.
path = Contour.fromCanvas(canvas);

// Callback is true for opaque coordinates. Never terminates if never true.
path = Contour.fromCallback(function(x, y) { return (x*x+y*y) > 100; });
```

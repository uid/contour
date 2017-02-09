# Contour Plots

Original Source <https://github.com/d3/d3-plugins/tree/master/geom/contour>

Demo: <http://bl.ocks.org/4241134>

Usage:
```
<script src="https://rawgit.com/uid/contour/master/contour.js"></script>
```


```
// Callback is true for opaque coordinates. Never terminates if never true.
path = Contour.fromCallback(function(x, y) { return (x*x+y*y) > 100; });
```

Computes a contour for a given *grid function* using the [marching squares](http://en.wikipedia.org/wiki/Marching_squares) algorithm. Returns the contour polygon as an array of points. The grid function takes two arguments, *x* and *y*, and returns true if the specified point is inside the contour, and false for points outside the contour. The fromCallback function can also take an optional starting point [x, y] on the grid.

```
// Returns a path of coordinates [[x, y], ...] around nontransparent pixels.
var path = Contour.fromCanvas(canvas);
```

Computes a contour around the nontransparent pixels of a canvas. The fromCanvas function can also take an optional threshold value defining the level of alpha treated as transparent.

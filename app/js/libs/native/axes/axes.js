/**
 * Main Application Entry Point
 */
define([
], function() {
  var Axes = function() {
    return {

      /**
       * Draws coordinate origin axes.
       */
      drawAxes: function( length ) {
        var
          axes        = new THREE.Object3D();
        axes.add( this.drawAxis( new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false ) );    // +X
        axes.add( this.drawAxis( new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xA73C32, false) );    // -X
        axes.add( this.drawAxis( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false ) );    // +Y
        axes.add( this.drawAxis( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x6C8338, false ) );   // -Y
        axes.add( this.drawAxis( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false ) );    // +Z
        axes.add( this.drawAxis( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x3D87AA, false ) );   // -Z
        return axes;
      },

      /**
       * Draw coordinate origin axis.
       */
      drawAxis: function( src, dst, color ) {
        var
          geometry        = new THREE.Geometry(),
          material        = new THREE.LineBasicMaterial({ linewidth: 2, color: color });
        geometry.vertices.push(src.clone());
        geometry.vertices.push(dst.clone());
        geometry.computeLineDistances();
        return new THREE.Line(geometry, material, THREE.LineSegments);
      },

      /**
       * Draw graph lines.
       */
      drawAxesGraphLines: function( length, origin ) {
        var
          color         = 0x979281,
          axes          = new THREE.Object3D();
        for (var i = 1; i <= length; i++) {

          // X
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(origin, i, origin), new THREE.Vector3(length, i, origin), color ) );
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(origin, i, origin), new THREE.Vector3(-length, i, origin), color ) );
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(origin, -i, origin), new THREE.Vector3(length, -i, origin), color ) );
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(origin, -i, origin), new THREE.Vector3(-length, -i, origin), color ) );

          // Y
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(i, origin, origin), new THREE.Vector3(i, length, origin), color ) );
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(i, origin, origin), new THREE.Vector3(i, -length, origin), color ) );
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(-i, origin, origin), new THREE.Vector3(-i, length, origin), color ) );
          axes.add( this.drawAxesGraphLine( new THREE.Vector3(-i, origin, origin), new THREE.Vector3(-i, -length, origin), color ) );
        }
        return axes;
      },

      /**
       * Draw graph line.
       */
      drawAxesGraphLine: function( src, dst, color ) {
        var
          geometry        = new THREE.Geometry(),
          material;
        geometry.vertices.push(src.clone());
        geometry.vertices.push(dst.clone());
        geometry.computeLineDistances();
        material = new THREE.LineBasicMaterial({linewidth: 1, color: color});
        return new THREE.Line(geometry, material, THREE.LineSegments);
      }
    };
  };

  return new Axes;
});

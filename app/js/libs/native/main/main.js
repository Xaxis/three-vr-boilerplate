/**
 * Application Entry Point
 */
define([
  'underscore',
  'jquery',
  'axes',
  'promise-polyfill',
  'three',
  'vr-polyfill',
  'vr-controls',
  'vr-effect',
  'vr-manager'
], function(_, $, Axes) {
  var Main = function() {
    var main = {

      /**
       * Initialization method.
       *
       * @param options {Object}
       */
      initialize: function( options ) {
        var
          win_w             = window.innerWidth,
          win_h             = window.innerHeight,
          view_angle        = 60,
          aspect            = win_w / win_h,
          near              = 0.00001,
          far               = 10000,
          axes_radius       = options.axes_radius || 24;

        WebVRConfig = {

          /*
           * webvr-polyfill configuration
           */

          // Forces availability of VR mode.
          //FORCE_ENABLE_VR: true, // Default: false.
          // Complementary filter coefficient. 0 for accelerometer, 1 for gyro.
          //K_FILTER: 0.98, // Default: 0.98.
          // How far into the future to predict during fast motion.
          //PREDICTION_TIME_S: 0.040, // Default: 0.040 (in seconds).
          // Flag to disable touch panner. In case you have your own touch controls
          //TOUCH_PANNER_DISABLED: true, // Default: false.
          // Enable yaw panning only, disabling roll and pitch. This can be useful for
          // panoramas with nothing interesting above or below.
          //YAW_ONLY: true, // Default: false.

          /*
           * webvr-boilerplate configuration
           */

          // Forces distortion in VR mode.
          //FORCE_DISTORTION: true, // Default: false.
          // Override the distortion background color.
          //DISTORTION_BGCOLOR: {x: 1, y: 0, z: 0, w: 1}, // Default: (0,0,0,1).
          // Prevent distortion from happening.
          //PREVENT_DISTORTION: true, // Default: false.
          // Show eye centers for debugging.
          //SHOW_EYE_CENTERS: true, // Default: false.
        };

        // Create GL renderer, camera, and scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        // Set renderer pixel ratio
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Set clear color to black with full opacity
        this.renderer.setClearColor(0x000000, 1);

        // Append element to DOM
        $('body').append(this.renderer.domElement);

        // Initialize renderer
        this.renderer.setSize(win_w, win_h);

        // Initialize camera position
        this.camera.position.set(0, 0, 4);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Apply VR headset positional data to camera.
        this.vrcontrols = new THREE.VRControls(this.camera);

        // Apply VR stereo rendering to renderer.
        this.vreffect = new THREE.VREffect(this.renderer);
        this.vreffect.setSize(win_w, win_h);

        // Create a VR manager helper to enter and exit VR mode.
        this.manager = new WebVRManager(this.renderer, this.vreffect, {
          hideButton: false,
          isUndistorted: false
        });

        // Enable debugging axis lines
        if (options.axes) {

          // Initialize controls
          //this.controls = new THREE.TrackballControls(this.camera);
          //this.controls.rotateSpeed = 1.0;
          //this.controls.zoomSpeed = 0.2;
          //this.controls.panSpeed = 0.8;
          //this.controls.noZoom = false;
          //this.controls.noPan = false;
          //this.controls.staticMoving = true;
          //this.controls.dynamicDampingFactor = 0.3;

          // Build graph lines
          var lines = Axes.drawAxesGraphLines(axes_radius, 0);
          this.scene.add(lines);

          // Build origin axes
          var axes = Axes.drawAxes(axes_radius);
          this.scene.add(axes);
        }

        // Begin rendering
        this.render();
      },

      /**
       * Rendering loop.
       */
      render: function() {
        requestAnimationFrame(main.render);
        main.vrcontrols.update();
        main.manager.render(main.scene, main.camera);
      }
    };
    return main;
  };

  return Main;
});

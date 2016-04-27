/**
 * Application Entry Point
 */
define([
  'underscore',
  'axes',
  'promise-polyfill',
  'three',
  'three.trackballcontrols',
  'vr-controls',
  'vr-effect',
  //'vr-polyfill',
  'vr-manager'
], function(_, Axes) {
  var Main = function() {
    var main = {

      /**
       * Initialization method.
       *
       * @param options {Object}
       */
      initialize: function( options ) {
        var
          self              = this,
          win_w             = window.innerWidth,
          win_h             = window.innerHeight,
          view_angle        = 70,
          aspect            = win_w / win_h,
          near              = 0.00001,
          far               = 10000,
          axes_radius       = options.axes_radius || 24;

        /*
         * Debug parameters.
         */
        window.WebVRConfig = {
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

          // Enable the deprecated version of the API (navigator.getVRDevices).
          //ENABLE_DEPRECATED_API: true, // Default: false.

          // Scales the recommended buffer size reported by WebVR, which can improve
          // performance. Making this very small can lower the effective resolution of
          // your scene.
          BUFFER_SCALE: 0.5, // default: 1.0

          // Allow VRDisplay.submitFrame to change gl bindings, which is more
          // efficient if the application code will re-bind it's resources on the
          // next frame anyway.
          // Dirty bindings include: gl.FRAMEBUFFER_BINDING, gl.CURRENT_PROGRAM,
          // gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING,
          // and gl.TEXTURE_BINDING_2D for texture unit 0
          // Warning: enabling this might lead to rendering issues.
          //DIRTY_SUBMIT_FRAME_BINDINGS: true // default: false
        };

        // Create GL renderer, camera, and scene
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);

        // Set renderer pixel ratio
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Append element to DOM
        document.body.appendChild(this.renderer.domElement);

        // Set clear color to black with full opacity
        this.renderer.setClearColor(0x000000, 1);

        // Initialize renderer
        this.renderer.setSize(win_w, win_h);

        // Initialize camera position
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Apply VR headset positional data to camera.
        this.vrcontrols = new THREE.VRControls(this.camera);

        // Apply VR stereo rendering to renderer.
        this.vreffect = new THREE.VREffect(this.renderer);
        this.vreffect.setSize(win_w, win_h);

        // Initialize non-VR controls
        this.controls = new THREE.TrackballControls(this.camera);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 0.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        // Enable debugging axis lines
        if (options.axes) {

          // Build graph lines
          var lines = Axes.drawAxesGraphLines(axes_radius, 0);
          this.scene.add(lines);

          // Build origin axes
          var axes = Axes.drawAxes(axes_radius);
          this.scene.add(axes);
        }

        // Create a VR manager helper to enter and exit VR mode.
        this.manager = new WebVRManager(this.renderer, this.vreffect, {
          hideButton: false,
          isUndistorted: false
        });

        // Handle resizing of viewport
        this.onResize = function(e) {
          self.vreffect.setSize(window.innerWidth, window.innerHeight);
          self.camera.aspect = window.innerWidth / window.innerHeight;
          self.camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', this.onResize, true);
        window.addEventListener('vrdisplaypresentchange', this.onResize, true);

        //
        // DEMO CODE
        //

        // Add a repeating grid as a skybox.
        var boxWidth = 5;
        var loader = new THREE.TextureLoader();
        loader.load('../node_modules/webvr-boilerplate/img/box.png', onTextureLoaded);

        function onTextureLoaded(texture) {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(boxWidth, boxWidth);
          var geometry = new THREE.BoxGeometry(boxWidth, boxWidth, boxWidth);
          var material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0x01BE00,
            side: THREE.BackSide
          });

          var skybox = new THREE.Mesh(geometry, material);
          self.scene.add(skybox);
        }

        // Create 3D objects.
        var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        var material = new THREE.MeshNormalMaterial();
        main.cube = new THREE.Mesh(geometry, material);

        // Position cube mesh
        main.cube.position.z = -1;

        // Add cube mesh to your three.js scene
        this.scene.add(main.cube);

        // Begin rendering
        this.render(performance ? performance.now() : Date.now());
      },


      /**
       * Last render timestamp
       */
      lastRender: 0,

      /**
       * Rendering loop.
       */
      render: function( timestamp ) {

        // Apply rotation to cube mesh
        var delta = Math.min(timestamp - main.lastRender, 500);
        main.cube.rotation.y += delta * 0.0006;

        // Update render instance
        main.lastRender = timestamp;
        main.controls.update();
        main.vrcontrols.update();
        main.manager.render(main.scene, main.camera, timestamp);
        requestAnimationFrame(main.render);
      }
    };
    return main;
  };

  return Main;
});

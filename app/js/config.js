/**
 * Require.js initialization
 */
(function(window, require) {

  /**
   * Configure require.js
   */
  require.config({
    baseUrl: 'js',
    paths: {

      // Vendor
      jquery:                           'libs/vendor/npm/jquery/dist/jquery.min',
      text:                             'libs/vendor/npm/requirejs-text/text',
      underscore:                       'libs/vendor/npm/underscore/underscore',
      backbone:                         'libs/vendor/npm/backbone/backbone',
      'promise-polyfill':               'libs/vendor/bower/promise-polyfill/Promise.min',

      // Three.js
      three:                            'libs/vendor/bower/threejs/build/three.min',
      'three.orbitcontrols':            'libs/vendor/bower/threejs/examples/js/controls/OrbitControls',
      'three.trackballcontrols':        'libs/vendor/bower/threejs/examples/js/controls/TrackballControls',

      // WebVR
      'vr-controls':                    'libs/vendor/bower/threejs/examples/js/controls/VRControls',
      'vr-effect':                      'libs/vendor/bower/threejs/examples/js/effects/VREffect',
      'vr-polyfill':                    'libs/vendor/bower/webvr-polyfill/build/webvr-polyfill',
      'vr-manager':                     'libs/vendor/bower/webvr-boilerplate/build/webvr-manager',

      // Native modules
      util:                             'libs/native/Util/Util',
      axes:                             'libs/native/Axes/Axes',
      main:                             'libs/native/Main/Main'
    },
    shim: {
      'three.orbitcontrols': {
        deps: ['three']
      },
      'three.trackballcontrols': {
        deps: ['three']
      },
      'vr-controls': {
        deps: ['three']
      },
      'vr-effect': {
        deps: ['three']
      },
      'vr-polyfill': {
        deps: ['three']
      },
      'vr-manager': {
        deps: ['three']
      }
    }
  });

  /**
   * Bootstrap app JavaScript
   */
  require(['init'], function(Init) {
    var app = new Init();
    app.initialize();
  });

})(window, require);

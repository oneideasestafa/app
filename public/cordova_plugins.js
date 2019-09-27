cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-universal-clipboard.Clipboard",
      "file": "plugins/cordova-universal-clipboard/www/clipboard.js",
      "pluginId": "cordova-universal-clipboard",
      "clobbers": [
        "cordova.plugins.clipboard"
      ]
    },
    {
      "id": "cordova-instagram-plugin.InstagramPlugin",
      "file": "plugins/cordova-instagram-plugin/www/CDVInstagramPlugin.js",
      "pluginId": "cordova-instagram-plugin",
      "clobbers": [
        "Instagram"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-universal-clipboard": "0.1.0",
    "cordova-instagram-plugin": "0.5.8",
    "cordova-plugin-camera": "4.1.0",
    "cordova-plugin-whitelist": "1.3.4"
  };
});
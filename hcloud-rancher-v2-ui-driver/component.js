"use strict";

define("nodes/components/driver-hetzner/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjaWYgbmVlZEFQSVRva2VufX0KICA8Zm9ybT4KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgci1tYjIwIj4KICAgICAgPHNwYW4+QWNjb3VudCBBY2Nlc3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+QVBJIFRva2VuKjwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMTAiPgogICAgICAgIHt7aW5wdXQgdHlwZT0icGFzc3dvcmQiIHZhbHVlPW1vZGVsLmhldHpuZXJDb25maWcuYXBpVG9rZW4gY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBwbGFjZWhvbGRlcj0iWW91ciBIZXR6bmVyIENsb3VkIEFQSSBUb2tlbiJ9fQogICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj5DcmVhdGUgaXQgYnkgc3dpdGNoaW5nIGludG8gdGhlCiAgICAgICAgICA8YSB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIiBocmVmPSJodHRwczovL2NvbnNvbGUuaGV0em5lci5jbG91ZCI+SGV0em5lciBDbG91ZCBDb25zb2xlPC9hPiwgY2hvb3NpbmcgYSBwcm9qZWN0LCBnbyB0byBBY2Nlc3MgJnJhcnI7IFRva2VucyBhbmQgY3JlYXRlIGEgbmV3IEFQSSB0b2tlbiB0aGVyZS48L3A+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICA8ZGl2IGNsYXNzPSJmb290ZXItYWN0aW9ucyI+CiAgICAgIHt7I2lmIGdldHRpbmdEYXRhfX0KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJnLXByaW1hcnkgYnRuLWRpc2FibGVkIj4KICAgICAgICA8aSBjbGFzcz0iaWNvbiBpY29uLXNwaW5uZXIgaWNvbi1zcGluIj48L2k+IHt7dCAnZ2VuZXJpYy5sb2FkaW5nJ319PC9idXR0b24+CiAgICAgIHt7ZWxzZX19CiAgICAgIDxidXR0b24ge3thY3Rpb24gImdldERhdGEiIH19IGNsYXNzPSJidG4gYmctcHJpbWFyeSIgZGlzYWJsZWQ9e3tub3QgbW9kZWwuaGV0em5lckNvbmZpZy5hcGlUb2tlbn19PkNvbmZpZ3VyZSBTZXJ2ZXI8L2J1dHRvbj4KICAgICAge3svaWZ9fQogICAgICA8YnV0dG9uIHt7YWN0aW9uICJjYW5jZWwifX0gY2xhc3M9ImJ0biBiZy10cmFuc3BhcmVudCI+e3t0ICdnZW5lcmljLmNhbmNlbCd9fTwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9mb3JtPgogIHt7ZWxzZX19CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KICAgIHt7IS0tIFRoaXMgcGFydGlhbCBjb250YWlucyB0aGUgcXVhbnRpdHksIG5hbWUsIGFuZCBkZXNjcmlwdGlvbiBmaWVsZHMgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+CiAgICAgIDxzcGFuPnt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fTwvc3Bhbj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0ib3Zlci1ociByLW10MjAgci1tYjIwIj4KICAgICAgPHNwYW4+U2V0dGluZ3M8L3NwYW4+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+UmVnaW9uPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0xMCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IG1vZGVsLmhldHpuZXJDb25maWcuc2VydmVyTG9jYXRpb24pIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAge3sjZWFjaCByZWdpb25DaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5uYW1lfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLnNlcnZlckxvY2F0aW9uIGNob2ljZS5uYW1lfX0+e3tjaG9pY2UuY2l0eX19PC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBmb3JtLWdyb3VwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+SW1hZ2U8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTQiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBtb2RlbC5oZXR6bmVyQ29uZmlnLmltYWdlSWQpIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAge3sjZWFjaCBpbWFnZUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLmlkfX0gc2VsZWN0ZWQ9e3tlcSBtb2RlbC5oZXR6bmVyQ29uZmlnLmltYWdlSWQgY2hvaWNlLmlkfX0+e3tjaG9pY2UuZGVzY3JpcHRpb259fTwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj5TaXplPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC00Ij4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwuaGV0em5lckNvbmZpZy5zZXJ2ZXJUeXBlKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIiB9fT4KICAgICAgICAgIHt7I2VhY2ggc2l6ZUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLm5hbWV9fSBzZWxlY3RlZD17e2VxIG1vZGVsLmhldHpuZXJDb25maWcuc2VydmVyVHlwZSBjaG9pY2UubmFtZX19Pnt7Y2hvaWNlLmRlc2NyaXB0aW9ufX0gLSB7e2Nob2ljZS5tZW1vcnl9fUdCIE1lbW9yeSAtIHt7Y2hvaWNlLmRpc2t9fUdCIERpc2sgc3BhY2U8L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93IGZvcm0tZ3JvdXAiPgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtMiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJmb3JtLWNvbnRyb2wtc3RhdGljIj4KICAgICAgICAgIDxhIGhyZWY9Imh0dHBzOi8vY2xvdWRpbml0LnJlYWR0aGVkb2NzLmlvL2VuL2xhdGVzdC90b3BpY3MvZXhhbXBsZXMuaHRtbCIgdGFyZ2V0PSJfYmxhbmsiIHJlbD0ibm9vcGVuZXIgbm9yZWZlcnJlciI+Q2xvdWQtaW5pdCBDb25maWd1cmF0aW9uPC9hPiAob3B0aW9uYWwpCiAgICAgICAgPC9sYWJlbD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbC1tZC0xMCI+CiAgICAgICAgPHRleHRhcmVhIHZhbHVlPXt7bW9kZWwuaGV0em5lckNvbmZpZy51c2VyRGF0YX19IG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwuaGV0em5lckNvbmZpZy51c2VyRGF0YSkgdmFsdWU9InRhcmdldC52YWx1ZSIgfX0gcm93cz0iMyIgc3R5bGU9IndpZHRoOiAxMDAlOyByZXNpemU6IHZlcnRpY2FsIj48L3RleHRhcmVhPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iZm9ybS1jb250cm9sLXN0YXRpYyI+TmV0d29ya3MgKEJldGEsIG9wdGlvbmFsLiBZb3UgaGF2ZSB0byBjcmVhdGUgdGhlc2UgTmV0d29ya3MgaW4gdGhlIDxhIGhyZWY9Imh0dHBzOi8vY29uc29sZS5oZXR6bmVyLmNsb3VkIiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5IZXR6bmVyIENsb3VkIENvbnNvbGU8L2E+KTwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wtbWQtNCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAnbW9kaWZ5TmV0d29ya3MnIH19IG11bHRpcGxlPSJ0cnVlIj4KICAgICAgICAgIHt7I2VhY2ggbmV0d29ya0Nob2ljZXMgYXMgfG5ldHdvcmt8fX0KICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tuZXR3b3JrLmlkfX0gc2VsZWN0ZWQ9e3thcnJheS1pbmNsdWRlcyBtb2RlbC5oZXR6bmVyQ29uZmlnLm5ldHdvcmtzIG5ldHdvcmsuaWR9fT57e25ldHdvcmsubmFtZX19ICh7e25ldHdvcmsuaXBfcmFuZ2V9fSk8L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sLW1kLTIiPgogICAgICAgIDxkaXYgY2xhc3M9ImNoZWNrYm94Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj57e2lucHV0IHR5cGU9ImNoZWNrYm94IiBjaGVja2VkPW1vZGVsLmhldHpuZXJDb25maWcudXNlUHJpdmF0ZU5ldHdvcmt9fQogICAgICAgICAgICBVc2UgcHJpdmF0ZSBuZXR3b3JrIChmaXJzdCBwcml2YXRlIG5ldHdvcmsgd2hpY2ggaXMgYXR0YWNoZWQgd2lsbCBiZSB1c2VkIGZvciBjb21tdW5pY2F0aW9uKQogICAgICAgICAgPC9sYWJlbD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICAgICB7eyEtLSBUaGlzIGZvbGxvd2luZyBjb250YWlucyB0aGUgTmFtZSwgTGFiZWxzIGFuZCBFbmdpbmUgT3B0aW9ucyBmaWVsZHMgLS19fQogICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uIG1vZGVsPW1vZGVsIG5hbWVSZXF1aXJlZD10cnVlfX0KICAgICB7e2Zvcm0tdXNlci1sYWJlbHMgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscyBzZXRMYWJlbHM9KGFjdGlvbiAnc2V0TGFiZWxzJykgZXhwYW5kQWxsPWV4cGFuZEFsbCBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikgfX0KICAgICB7e2Zvcm0tZW5naW5lLW9wdHMgbWFjaGluZT1tb2RlbCBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwgfX0KICAgICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyBlcnJvcnMgcHJvZHVjZWQgYnkgdmFsaWRhdGUoKSBpbiB0aGUgY29tcG9uZW50IC0tfX0KICAgICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAgICAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogICAgIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpfX0KICA8L2Rpdj4KICB7ey9pZn19Cjwvc2VjdGlvbj4K";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'hetzner',
    needAPIToken: true,
    config: alias('model.hetznerConfig'),
    app: service(),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-hetzner/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },
    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'hetznerConfig',
        serverType: 'cx21',
        serverLocation: 'nbg1',
        imageId: "168855",
        userData: '',
        networks: [],
        usePrivateNetwork: false
      });
      set(this, 'model.hetznerConfig', config);
    },
    validate: function validate() {
      this._super();

      if (!this.get('model.hetznerConfig.networks')) {
        this.set('model.hetznerConfig.networks', []);
      }

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },
    actions: {
      getData: function getData() {
        this.set('gettingData', true);
        var that = this;
        Promise.all([this.apiRequest('/v1/locations'), this.apiRequest('/v1/images'), this.apiRequest('/v1/server_types'), this.apiRequest('/v1/networks')]).then(function (responses) {
          that.setProperties({
            errors: [],
            needAPIToken: false,
            gettingData: false,
            regionChoices: responses[0].locations,
            imageChoices: responses[1].images.map(function (image) {
              return _objectSpread({}, image, {
                id: image.id.toString()
              });
            }),
            sizeChoices: responses[2].server_types,
            networkChoices: responses[3].networks.map(function (network) {
              return _objectSpread({}, network, {
                id: network.id.toString()
              });
            })
          });
        }).catch(function (err) {
          err.then(function (msg) {
            that.setProperties({
              errors: ['Error received from Hetzner Cloud: ' + msg.error.message],
              gettingData: false
            });
          });
        });
      },
      modifyNetworks: function modifyNetworks(select) {
        var options = _toConsumableArray(select.target.options).filter(function (o) {
          return o.selected;
        }).map(function (o) {
          return o.value;
        });

        this.set('model.hetznerConfig.networks', options);
      }
    },
    apiRequest: function apiRequest(path) {
      return fetch('https://api.hetzner.cloud' + path, {
        headers: {
          'Authorization': 'Bearer ' + this.get('model.hetznerConfig.apiToken')
        }
      }).then(function (res) {
        return res.ok ? res.json() : Promise.reject(res.json());
      });
    }
  });
});;
"use strict";

define("ui/components/driver-hetzner/component", ["exports", "nodes/components/driver-hetzner/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
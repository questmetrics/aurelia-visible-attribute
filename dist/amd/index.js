define('aurelia-content-size-attribute', ['exports', 'tslib', 'aurelia-templating', 'aurelia-pal'], function (exports, tslib_1, aureliaTemplating, aureliaPal) { 'use strict';

  var Visible_1;
  exports.Visible = Visible_1 = class Visible {
      constructor(element) {
          this.element = element;
      }
      /**
       * @internal
       */
      static inject() {
          return [aureliaPal.DOM.Element];
      }
      /**
       * @internal
       */
      bind() {
          this.observer = new Visible_1.IntersectionObserver((entries) => {
              this.isVisible = entries[0].isIntersecting;
              this.visibility = entries[0].intersectionRatio;
          });
          this.observer.observe(this.element);
      }
      /**
       * @internal
       */
      unbind() {
          this.observer.disconnect();
          this.observer = undefined;
      }
  };
  tslib_1.__decorate([
      aureliaTemplating.bindable({
          primaryProperty: true,
          defaultBindingMode: 'fromView'
      }),
      tslib_1.__metadata("design:type", Boolean)
  ], exports.Visible.prototype, "isVisible", void 0);
  tslib_1.__decorate([
      aureliaTemplating.bindable({
          defaultBindingMode: 'fromView'
      }),
      tslib_1.__metadata("design:type", Number)
  ], exports.Visible.prototype, "visibility", void 0);
  exports.Visible = Visible_1 = tslib_1.__decorate([
      aureliaTemplating.customAttribute('visible'),
      tslib_1.__metadata("design:paramtypes", [HTMLElement])
  ], exports.Visible);

  function configure(fxconfig, plgCfg) {
      exports.Visible.IntersectionObserver = plgCfg && plgCfg.intersectionObserver || aureliaPal.PLATFORM.global.IntersectionObserver;
      fxconfig.globalResources(exports.Visible);
  }

  exports.configure = configure;

  Object.defineProperty(exports, '__esModule', { value: true });

});

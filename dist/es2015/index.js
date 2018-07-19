import { __decorate, __metadata } from 'tslib';
import { bindable, customAttribute } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';

var Visible_1;
let Visible = Visible_1 = class Visible {
    constructor(element) {
        this.element = element;
    }
    /**
     * @internal
     */
    static inject() {
        return [DOM.Element];
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
__decorate([
    bindable({
        primaryProperty: true,
        defaultBindingMode: 'fromView'
    }),
    __metadata("design:type", Boolean)
], Visible.prototype, "isVisible", void 0);
__decorate([
    bindable({
        defaultBindingMode: 'fromView'
    }),
    __metadata("design:type", Number)
], Visible.prototype, "visibility", void 0);
Visible = Visible_1 = __decorate([
    customAttribute('visible'),
    __metadata("design:paramtypes", [HTMLElement])
], Visible);

function configure(fxconfig, plgCfg) {
    Visible.IntersectionObserver = plgCfg && plgCfg.intersectionObserver || PLATFORM.global.IntersectionObserver;
    fxconfig.globalResources(Visible);
}

export { Visible, configure };

import { PLATFORM } from 'aurelia-pal';
import { Visible } from './visible';

export { Visible };

export function configure(fxconfig: { globalResources(rs: Function): any }, plgCfg?: { intersectionObserver?: IntersectionObserver }): void {
  Visible.IntersectionObserver = plgCfg && plgCfg.intersectionObserver || PLATFORM.global.IntersectionObserver;
  fxconfig.globalResources(Visible);
}

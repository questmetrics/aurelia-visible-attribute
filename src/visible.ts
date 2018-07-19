import { bindable, customAttribute } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';

export interface IIntersectionObserverConstructor {
  new(cb: IntersectionObserverCallback): IntersectionObserver;
}

@customAttribute('visible')
export class Visible {
  /**
   * Intersection observer implementation that will be used to observe visiblity of elements
   * Assigning new implementation will have no effect on existing bound visible attributes
   */
  // tslint:disable-next-line:variable-name
  public static IntersectionObserver: IIntersectionObserverConstructor;

  /**
   * @internal
   */
  public static inject(): any[] {
    return [DOM.Element];
  }

  @bindable({
    primaryProperty: true,
    defaultBindingMode: 'fromView'
  })
  public isVisible: boolean;

  @bindable({
    defaultBindingMode: 'fromView'
  })
  public visibility: number;

  /**
   * @internal
   */
  private element: HTMLElement;
  /**
   * @internal
   */
  private observer: IntersectionObserver | undefined;

  constructor(
    element: HTMLElement
  ) {
    this.element = element;
  }

  /**
   * @internal
   */
  public bind(): void {
    this.observer = new Visible.IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
      this.visibility = entries[0].intersectionRatio;
    });
    this.observer.observe(this.element);
  }

  /**
   * @internal
   */
  public unbind(): void {
    this.observer!.disconnect();
    this.observer = undefined;
  }
}

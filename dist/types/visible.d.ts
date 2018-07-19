export interface IIntersectionObserverConstructor {
    new (cb: IntersectionObserverCallback): IntersectionObserver;
}
export declare class Visible {
    /**
     * Intersection observer implementation that will be used to observe visiblity of elements
     * Assigning new implementation will have no effect on existing bound visible attributes
     */
    static IntersectionObserver: IIntersectionObserverConstructor;
    isVisible: boolean;
    visibility: number;
    constructor(element: HTMLElement);
}

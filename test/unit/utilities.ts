export class AppViewModel {

  public readonly el: HTMLElement;
  public readonly divVisible: boolean;
}

export function wait(time: number = 100): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

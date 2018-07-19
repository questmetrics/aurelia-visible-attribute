import { PLATFORM, Aurelia } from 'aurelia-framework';

export async function configure(au: Aurelia): Promise<void> {
  au.use.standardConfiguration();

  if (PLATFORM.global.debug) {
    au
      .use
      .developmentLogging()
      .plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  au
    .use
    .feature(PLATFORM.moduleName('resources/index'));
  // .plugin();

  await au.start();

  const host = document.querySelector('[aurelia-app]');

  await au.setRoot(PLATFORM.moduleName('app'), host);
}

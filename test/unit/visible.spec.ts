import { AppViewModel, wait } from './utilities';
import { configure, Visible } from '../../src';
import { configure as configureTemplatingBinding } from 'aurelia-templating-binding';
import { configure as configureTemplatingResources } from 'aurelia-templating-resources';
import { StageComponent, ComponentTester } from 'aurelia-testing';
import { Aurelia } from 'aurelia-framework';
import { WebpackLoader } from 'aurelia-loader-webpack';
import ResizeObserver from 'resize-observer-polyfill';

// Important: Before assertion in each tech, there needs to be a small waiting time
// for browser to finialize layouting / painting / rendering
// Without this waiting time, the test suite will be non deterministic

describe('[content-size]', () => {
  let aurelia: Aurelia;
  let component: ComponentTester<Visible>;
  let view: string;
  const waitTime = 80;
  const originalConfigure = ComponentTester.prototype.configure;
  // const flushTaskQueue = () => (aurelia.container.get(TaskQueue) as TaskQueue).flushTaskQueue();
  // const flushMicroTaskQueue = () => (aurelia.container.get(TaskQueue) as TaskQueue).flushMicroTaskQueue();

  beforeAll(() => {
    ComponentTester.prototype.configure = au =>
      au
        .use
        .plugin(configureTemplatingBinding)
        .plugin(configureTemplatingResources)
        .plugin(configure, { resizeObserver: ResizeObserver });
  });

  afterAll(() => {
    ComponentTester.prototype.configure = originalConfigure;
  });

  beforeEach(() => {
    aurelia = new Aurelia(new WebpackLoader());

    component = StageComponent.withResources();
  });

  afterEach(() => {
    component.dispose();
  });

  it('binds', done => {
    const app = new AppViewModel();
    view = '<div visible.bind="divVisible" style="width: 100px; height: 100px;"></div>';
    component
      .inView(view)
      .boundTo(app)
      .create(cfg => cfg(aurelia))
      .then(() => wait(waitTime))
      .then(() => {
        expect(app.divVisible).toBe(true, 'It should be visible');
        done();
      })
      .catch(e => {
        expect(e).toBeFalsy('It should have created the view and bind');
      });
  });

  describe('handles changes', () => {

    // it('when size doesnot change', done => {
    //   const app = new AppViewModel();
    //   view = '<div ref="el" content-size.ref="contentSizeNotifier" content-size.bind="divSize" style="width: 100px; height: 100px;"></div>';
    //   component
    //     .inView(view)
    //     .boundTo(app)
    //     .create(cfg => cfg(aurelia))
    //     .then(() => wait(waitTime))
    //     .then(() => {
    //       expect(app.divSize).toBeDefined();
    //       const oldDivSize = app.divSize;
    //       app.el.style.width = '100px';
    //       setTimeout(() => {
    //         expect(oldDivSize).toBe(app.divSize, 'It should not update the value when size hasnt been changed.');
    //         done();
    //         // tslint:disable-next-line:align
    //       }, waitTime / 2);
    //     })
    //     .catch(e => {
    //       expect(e).toBeFalsy('It should have created the view and bind');
    //     });
    // });

    // it('when size does change', done => {
    //   const app = new AppViewModel();
    //   view = '<div ref="el" content-size.bind="divSize" style="width: 100px; height: 100px;"></div>';
    //   component
    //     .inView(view)
    //     .boundTo(app)
    //     .create(cfg => cfg(aurelia))
    //     .then(() => wait(waitTime))
    //     .then(() => {
    //       expect(app.divSize).toBeDefined();
    //       const oldDivSize = app.divSize;
    //       app.el.style.width = '150px';
    //       setTimeout(() => {
    //         expect(oldDivSize).not.toBe(app.divSize, 'It should update the value when size has been changed.');
    //         expect(app.divSize.width).toBe(150);
    //         done();
    //         // tslint:disable-next-line:align
    //       }, waitTime / 2);
    //     })
    //     .catch(e => {
    //       expect(e).toBeFalsy('It should have detected the changes');
    //     });
    // });

    // it('when size does change because its content size changed', done => {
    //   const app = new AppViewModel();
    //   view = '<div ref="el" content-size.bind="divSize" style="display: inline-block;"><div style="width: 100px; height: 100px;"></div></div>';
    //   component
    //     .inView(view)
    //     .boundTo(app)
    //     .create(cfg => cfg(aurelia))
    //     .then(() => wait(waitTime))
    //     .then(() => {
    //       expect(app.divSize).toBeDefined();
    //       (app.el.firstElementChild as HTMLElement).style.width = '150px';
    //       setTimeout(() => {
    //         expect(app.divSize.width).toBe(150);
    //         done();
    //         // tslint:disable-next-line:align
    //       }, waitTime / 2);
    //     })
    //     .catch(e => {
    //       expect(e).toBeFalsy('It should have detected the changes');
    //     });
    // });

    // it('when size does change because of new content', done => {
    //   const app = new AppViewModel();
    //   view = '<div ref="el" content-size.bind="divSize" style="display: inline-block;"><div style="width: 100px; height: 100px;"></div></div>';
    //   component
    //     .inView(view)
    //     .boundTo(app)
    //     .create(cfg => cfg(aurelia))
    //     .then(() => wait(waitTime))
    //     .then(() => {
    //       expect(app.divSize).toBeDefined();
    //       expect(app.divSize.height).toBe(100);
    //       app.el.insertAdjacentHTML('beforeend', '<div>asdasds</div>');
    //       setTimeout(() => {
    //         expect(app.divSize.height).toBeGreaterThan(100);
    //         done();
    //         // tslint:disable-next-line:align
    //       }, waitTime / 2);
    //     })
    //     .catch(e => {
    //       expect(e).toBeFalsy('It should have detected the changes');
    //     });
    // });
  });
});

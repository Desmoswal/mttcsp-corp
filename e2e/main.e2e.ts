import {expect} from 'chai';
import {SpectronClient} from 'spectron';

import commonSetup from './common-setup';
import { app } from 'electron';

describe('angular-electron App', function () {
  commonSetup.apply(this);

  let browser: any;
  let client: SpectronClient;

 beforeEach(function (done) {
    client = this.app.client;
    browser = client as any;
    done();
  });

  /*it('should display message saying App works !', async function () {
    const text = await browser.getText('app-home h1');
    expect(text).to.contain('App works !');
  });*/

  it('creates initial windows', async function () {
    const count = await client.getWindowCount();
    expect(count).to.equal(1);
  });

});

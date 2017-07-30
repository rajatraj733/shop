import { ShopUiPage } from './app.po';

describe('shop-ui App', () => {
  let page: ShopUiPage;

  beforeEach(() => {
    page = new ShopUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

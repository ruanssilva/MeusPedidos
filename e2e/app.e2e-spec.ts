import { MeusPedidosPage } from './app.po';

describe('meus-pedidos App', function() {
  let page: MeusPedidosPage;

  beforeEach(() => {
    page = new MeusPedidosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

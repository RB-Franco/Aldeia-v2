import { CatalogoDetalheModule } from './catalogo-detalhe.module';

describe('CatalogoModule', () => {
  let catalogoDetalheModule: CatalogoDetalheModule;

  beforeEach(() => {
    catalogoDetalheModule = new CatalogoDetalheModule();
  });

  it('should create an instance', () => {
    expect(catalogoDetalheModule).toBeTruthy();
  });
});

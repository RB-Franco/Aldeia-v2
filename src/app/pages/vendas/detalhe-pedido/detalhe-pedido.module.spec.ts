import { DetalhePedidoModule } from './detalhe-pedido.module';

describe('DetalhePedidoModule', () => {
  let detalhePedidoModule: DetalhePedidoModule;

  beforeEach(() => {
    detalhePedidoModule = new DetalhePedidoModule();
  });

  it('should create an instance', () => {
    expect(detalhePedidoModule).toBeTruthy();
  });
});

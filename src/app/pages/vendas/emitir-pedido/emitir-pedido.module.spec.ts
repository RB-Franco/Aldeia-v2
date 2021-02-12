import { EmitirPedidoModule } from './emitir-pedido.module';

describe('EmitirPedidoModule', () => {
  let emitirPedidoModule: EmitirPedidoModule;

  beforeEach(() => {
    emitirPedidoModule = new EmitirPedidoModule();
  });

  it('should create an instance', () => {
    expect(emitirPedidoModule).toBeTruthy();
  });
});

import { ConsultaPedidoModule } from './consulta-pedido.module';

describe('ConsultaPedidoModule', () => {
  let consultaPedidoModule: ConsultaPedidoModule;

  beforeEach(() => {
    consultaPedidoModule = new ConsultaPedidoModule();
  });

  it('should create an instance', () => {
    expect(consultaPedidoModule).toBeTruthy();
  });
});

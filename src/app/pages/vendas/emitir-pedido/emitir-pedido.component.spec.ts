import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitirPedidoComponent } from './emitir-pedido.component';

describe('EmitirPedidoComponent', () => {
  let component: EmitirPedidoComponent;
  let fixture: ComponentFixture<EmitirPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmitirPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmitirPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDetalheComponent } from './catalogo-detalhe.component';

describe('CatalogoComponent', () => {
  let component: CatalogoDetalheComponent;
  let fixture: ComponentFixture<CatalogoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

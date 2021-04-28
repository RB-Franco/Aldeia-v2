export interface ListaInfiniteScrollColunasHelper {
  valor?: (value) => any;
  width?: number;
  propriedade: string;
  nosortable?: boolean;
  titulo: string;
  centralizarHeader?: boolean;
  centralizarValor?: boolean;
  visibilidade?: boolean;
  footer: {tipo: string, formatacao: string};
  editavel?: boolean;
}

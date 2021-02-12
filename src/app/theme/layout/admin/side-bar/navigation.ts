import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navegação',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'begin',
        title: 'Inicio',
        type: 'item',
        url: '/begin/inicio',
        icon: 'feather icon-home'                        
      },
      {
        id: 'cadastro',
        title: 'Cadastro',
        type: 'collapse',
        icon: 'feather icon-file',
        children: [         
          {
            id: 'usuario',
            title: 'Usuario',
            type: 'item',
            url: '/cadastro/usuario'
          },
          {
            id: 'empresa',
            title: 'Empresa',
            type: 'item',
            url: '/cadastro/empresa'
          },
          {
            id: 'fornecedor',
            title: 'Fornecedor',
            type: 'item',
            url: '/cadastro/fornecedor'
          },
          {
            id: 'catalogo',
            title: 'Catalogo',
            type: 'item',
            url: '/cadastro/catalogo'
          },
          {
            id: 'cliente',
            title: 'Cliente',
            type: 'item',
            url: '/cadastro/cliente'
          },
          {
            id: 'produto',
            title: 'Produto',
            type: 'item',
            url: '/cadastro/produto'
          }
        ]
      },
      {
        id: 'venda',
        title: 'Venda',
        type: 'collapse',
        icon: 'feather icon-trending-up',
        children: [         
          {
            id: 'consultar-pedido',
            title: 'Consultar pedido',
            type: 'item',
            url: '/venda/consultar-pedido'
          },
          {
            id: 'emitir-pedido',
            title: 'Emitir novo pedido',
            type: 'item',
            url: '/venda/emitir-pedido'
          }
        ]
      }
    ]
  },  
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}

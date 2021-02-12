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
            id: 'catalogo',
            title: 'Catalogo',
            type: 'item',
            url: '/pages/cadastros/catalogo'
          },      
           {
             id: 'usuario',
             title: 'Usuario',
             type: 'item',
             url: '/pages/cadastros/usuario'
           },
           {
             id: 'empresa',
             title: 'Empresa',
             type: 'item',
             url: '/pages/cadastros/empresa'
           },
           {
             id: 'fornecedor',
             title: 'Fornecedor',
             type: 'item',
             url: '/pages/cadastros/fornecedor'
           },          
           {
             id: 'cliente',
             title: 'Cliente',
             type: 'item',
             url: '/pages/cadastros/cliente'
           },
           {
             id: 'produto',
             title: 'Produto',
             type: 'item',
             url: '/pages/cadastros/produto'
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

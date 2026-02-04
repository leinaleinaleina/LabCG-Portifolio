import React from 'react'; //chama a biblioteca central de React

declare module 'react' { //declara um módulo que vai ser em react
  namespace JSX { //configuração JSX
    interface IntrinsicElements { //lista de todos os elementos HTML do react
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        //este comando todo indica que vai se comportar como HTML com mais "vantagens"
        //atributos especificos que podem ser aceitos
        src?: string;
        'ios-src'?: string;
        alt?: string;
        ar?: boolean;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'shadow-intensity'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        poster?: string;
        loading?: 'auto' | 'lazy' | 'eager';
        reveal?: 'auto' | 'manual';
        //'ref' precisa ser tipado explicitamente para Web Components no React
        //permite que o React pegue o elemento pra manipular ele por meio da programação
        ref?: React.MutableRefObject<any>; 
        [key: string]: any; 
      }, HTMLElement>;
    }
  }
}
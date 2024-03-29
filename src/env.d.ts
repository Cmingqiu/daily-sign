/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'uview-plus' {
  import { App } from 'vue';
  const Component = (app: App) => unknown;
  global {
    interface Uni {
      $u: {
        config: {
          unit: string;
        };
      };
    }
  }
  export default Component;
}

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

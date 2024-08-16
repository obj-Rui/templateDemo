import { defineAsyncComponent, type App } from 'vue'

export default function registerGlobalComponents(app: App<Element>) {
  const components = import.meta.glob('./*/*.vue')
  console.log('[ components ]-5', components)

  for (const path in components) {
    const componentName = path.split('/').pop()?.replace(/.\w+$/, '') || ''
    app.component(componentName, defineAsyncComponent((components as Recordable)[path]))
  }
}

export const storage = {
  get(key: string) {
    const item = localStorage.getItem(key)
    if (!item) return undefined
    const storages = JSON.parse(item)
    if (new Date().getTime() > storages[key].expires) {
      //存在但过期
      this.remove(key)
      return null
    }
    return storages[key].value
  },
  set(key: string, value: string) {
    localStorage.setItem(key, value)
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}

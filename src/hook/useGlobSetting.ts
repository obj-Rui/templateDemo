export interface GlobConfig {
  apiUrl: string
  urlPrefix: string
}
export const useGlobSetting = () => {
  const ENV = import.meta.env
  const { VITE_API_URL, VITE_API_URL_PREFIX } = ENV
  console.log('[ ENV ]-3', ENV)

  return {
    apiUrl: VITE_API_URL,
    urlPrefix: VITE_API_URL_PREFIX
  }
}

export const GA_TRACKING_ID = 'G-824K1F74H1'

export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

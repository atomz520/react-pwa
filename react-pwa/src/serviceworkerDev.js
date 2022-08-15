export default function serviceworkerDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`
  navigator.serviceWorker.register(swUrl)
    .then((respoonse) => {
      console.warn('response', response)
    })
}
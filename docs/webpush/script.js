/** @type {HTMLInputElement} */
const subscribeEndpointInput = document.querySelector('input[name="subscribe-endpoint"]')
const enableNotifsBtn = document.getElementById('enable-notifs')
/** @type {HTMLInputElement} */
const serverPublicKey = document.querySelector('input[name="public-key"]')

/**
 * @param {ServiceWorkerRegistration} worker The service worker
 */
async function subscribeToNotifications (worker) {
  const status = await Notification.requestPermission()
  if (status !== 'granted') return console.error('Permission not granted')

  const headers = { 'Content-Type': 'application/json' }
  const details = await worker.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: serverPublicKey.value })
  const body = JSON.stringify({ subscription: details.toJSON(), groups: ['_test'] })
  const response = await fetch(subscribeEndpointInput.value, { headers, body, method: 'POST' })

  console.log(response)
}

async function addSubscribeListener () {
  if (!('serviceWorker' in navigator)) return console.error('Cannot register service worker')

  const worker = await navigator.serviceWorker.register('./service-worker.js')
  if (!('Notification' in window)) return console.error('Notification not supported')
  if (await worker.pushManager.getSubscription()) return console.log('Already subscribed')

  enableNotifsBtn.addEventListener('click', () => subscribeToNotifications(worker))
}
addSubscribeListener()

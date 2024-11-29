/* eslint-disable no-undef */
form.addEventListener('submit', event => {
  event.preventDefault()
  output.innerHTML += content.value
  form.hidden = true
  document.body.addEventListener('contextmenu', () => { form.hidden = false })
})

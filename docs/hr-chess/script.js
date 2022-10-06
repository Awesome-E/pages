const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', e => {
  const instructions = document.getElementById('instructions')
  instructions.remove()
})

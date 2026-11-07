document.body.onpointerup = () => {}

/** @type {HTMLDivElement} */
const answer = document.querySelector('.answer')
answer.dataset.start = ''
/**
 * Handles pointer movement on the answer text
 * @param {TouchEvent} event The pointer move event
 */
function handlePointerMove (event) {
  const { clientX: x, clientY: y } = event.targetTouches[0]
  const rect = answer.getBoundingClientRect()

  if (y < rect.y || y > rect.y + rect.height) return answer.dataset.start = '-'
  if (!answer.dataset.start) return answer.dataset.start = x
  const difference = Math.abs(x - parseInt(answer.dataset.start))
  if (difference > 50) {
    answer.dataset.start = '-'
    NumberInput.deleteChar(false)
  }
}
answer.addEventListener('touchmove', handlePointerMove)
answer.addEventListener('touchend', e => {
  answer.dataset.start = ''
})

const Values = {
  currentStr: '0',
  current: 0
}

const NumberInput = {
  text: '0',
  value: 0,
  buttons: document.querySelectorAll('.button.number'),
  /**
   * Updates the current number
   */
  updateValue: function () {
    this.value = Number(this.text)
    answer.innerText = this.text
  },
  /**
   * 
   * @param {string} digit The digit to append the current value
   */
  addDigit: function (digit) {
    if (this.text === '0' && digit !== '.') this.text = ''
    if (this.text.includes('.') && digit === '.') return
    if (this.text.replace('.', '').length === 12) return
    if (/\.\d{6}/.test(this.text)) return
  
    this.text += digit
    this.updateValue()
  },
  deleteChar: function (clear) {
    this.text = (clear ? '' : this.text.replace(/.$/, '')) || '0'
    this.updateValue()
  },
  /**
   * Handles a keydown
   * @param {KeyboardEvent} event The keydown event
   */
  handleKeydown: function (event) {
    if (event.key === 'Tab' || event.code.match(/^Key[A-Z]/)) return
  
    event.preventDefault()
    document.activeElement?.blur()
    switch (true) {
      case /^[0-9.]$/.test(event.key): return NumberInput.addDigit(event.key)
      case event.key === 'Backspace': return NumberInput.deleteChar(event.ctrlKey || event.metaKey)
    }
  },
  init: function () {
    this.buttons.forEach(button => {
      // Only the first character, since browsers like Safari sometimes add new lines
      const digit = button.innerText[0]
      button.addEventListener('pointerup', () => this.addDigit(digit))
    })
  }
}
NumberInput.init()

document.body.addEventListener('keydown', NumberInput.handleKeydown)


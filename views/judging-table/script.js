function generateJudgingTable (judges, perProject) {
  const judgeCount = judges.length

  const unique = []
  function hasCombo (arr) {
    return !!unique.find(a => {
      return a.includes(arr[0]) && a.includes(arr[1]) && a.includes(arr[2])
    })
  }
  function shuffle (arr) {
    arr.sort((a, b) => {
      return Math.random() < 0.5 ? -1 : 1
    })
  }

  for (let i = judgeCount ** perProject; i < 2 * judgeCount ** perProject; i++) {
    let b7str = i.toString(judgeCount).slice(1)
    const b7arr = [...b7str].map(char => String(Number(char) + 1))
    b7str = b7arr.join('')

    if (new Set(b7arr).size < perProject) continue
    if (hasCombo(b7arr)) continue
    shuffle(b7arr)
    unique.push(b7arr)
  }
  shuffle(unique)

  const lines = unique.map(nums => {
    return nums.map(n => judges[n - 1]).join('\t')
  }).join('\n')
  return lines
}

document.getElementById('generate-btn').addEventListener('click', () => {
  const judges = document.getElementById('judge-names-input').value.replace(/^\n|\n$/, '').split('\n')
  const perProject = parseInt(document.getElementById('per-project-input').value)
  const table = generateJudgingTable(judges, perProject)
  document.getElementById('output').innerText = table
})

document.querySelector('.fa-copy').addEventListener('click', () => {
  const output = document.getElementById('output')
  const range = document.createRange()
  range.selectNode(output)
  window.getSelection().removeAllRanges() // clear current selection
  window.getSelection().addRange(range) // to select text
  document.execCommand('copy')
})

// Happy Path
/**
 * User use this calculator with normal order:
 * 1. A number key (0 - 9)
 * 2. An operator key ( +, -, *, /)
 * 3. The decimal key
 * 4. The equal key
 * 5. The clear key
 */

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1, operator, n2) => {
  let result = ''

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType

    if (!action) {
      console.log('number key!') // Test Number

      if (displayedNum === '0' || previousKeyType === 'operator') {
        // Replace Number '0' or operator with clicked number
        display.textContent = keyContent
      } else {
        // Append clicked number if displayedNum is not '0'
        display.textContent = displayedNum + keyContent
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      console.log('operator key!') // Test Operator

      // Highligth clicked operator
      key.classList.add('is-depressed')

      // Tell the previous key is operator key
      calculator.dataset.previousKeyType = 'operator'

      // set displayedNum as firstValue
      calculator.dataset.fisrtValue = displayedNum

      // set action as operator
      calculator.dataset.operator = action
    }

    if (action === 'decimal') {
      console.log('decimal key!') // Test Decimal

      // Append decimal after displayedNum
      display.textContent = displayedNum + '.'
    }

    if (action === 'clear') {
      console.log('clear key!') // Test Clear
    }

    if (action === 'calculate') {
      console.log('equal key!') // Test Equal

      // get firstvalue from previous set
      const firstValue = calculator.dataset.fisrtValue

      // get operator from previous set
      const operator = calculator.dataset.operator

      // set displayedNum as second Value
      const secondValue = displayedNum

      // display answer by call calculate()
      display.textContent = calculate(firstValue, operator, secondValue)
    }

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove('is-depressed')
    )
  }
})

// Edge Cases
/**
 * User use this calculator with any order:
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
      // console.log('number key!') // Test Number

      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        // console.log(previousKey + ' ' + previousKeyType)

        // Replace Number '0' or operator with clicked number
        display.textContent = keyContent
      } else {
        // console.log('Append number')

        // Append clicked number if displayedNum is not '0'
        display.textContent = displayedNum + keyContent
      }

      // set number as previousKey
      calculator.dataset.previousKeyType = 'number'
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      // console.log('operator key!') // Test Operator

      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      // Note: It's sufficient to check for firstValue and operator because secondValue always exists
      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ) {
        // get answer by call calculate()
        const calcValue = calculate(firstValue, operator, secondValue)

        // set calcvalue as display content
        display.textContent = calcValue

        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum
      }

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
      // console.log('decimal key!') // Test Decimal

      // Do nothing if string has a decimal
      if (!displayedNum.includes('.')) {
        // Append decimal after displayedNum
        display.textContent = displayedNum + '.'
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        // set display as '0.' if previousKeyType is operator
        display.textContent = '0.'
      }

      // set decimal as previousKey
      calculator.dataset.previousKeyType = 'decimal'
    }

    if (action === 'clear') {
      // console.log('clear key!') // Test Clear

      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }
      display.textContent = 0

      // set clear as previousKeyType
      calculator.dataset.previousKeyType = 'clear'
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }

    if (action === 'calculate') {
      // console.log('equal key!') // Test Equal

      // get firstvalue from previous set
      let firstValue = calculator.dataset.fisrtValue

      // get operator from previous set
      const operator = calculator.dataset.operator

      // set displayedNum as second Value
      let secondValue = displayedNum

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum
          secondValue = calculator.dataset.modValue
        }

        // display answer by call calculate()
        display.textContent = calculate(firstValue, operator, secondValue)
      }

      // Set modValue attribute
      calculator.dataset.modValue = secondValue

      // set calculate as previousKeyType
      calculator.dataset.previousKeyType = 'calculate'
    }

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove('is-depressed')
    )
  }
})

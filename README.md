# calculator

TO-DO

<!-- Set Display to n decimal places -->
<!-- Implement +/- button and functionality -->
<!-- Allow spamming of = button to apply last number and operator to result -->
Implement keyboard operation

Pseudocode

func negativeCheck(num)
  if (negativeFlag)
    num = (+num * -1).toString()
    negativeFlag = false
  return num

Improve display output

  display will have 10 characters

  check to see if result is < 0
    <!-- if true set flag for negativeNum and remove - from 0 index -->
    set flag to true
    call negativeCheck
    set flag to true again

  if num.length < 8
    if (negativeNum)
      num = (+num * -1).toString()
      negativeNum = false
    return num

  let exponent;  

  check if num includes char 'e'
    if true slice num from e to end of string and set to exponent

  let decimalCheck = num.slice(0, 7)

  else if charAt(8) === '.' || decimalCheck.includes('.')
    if (negativeNum)
      num = (+num * -1).toString()
      negativeNum = false
    return num.slice(0, 8);

  
  let int = charAt(0)
  let decPlaces = charAt(1) + charAt(2)

  if (!exponent)
    if num.includes('.')
      exponent = `e+${indexOf('.') - 1}`
    else
      exponent = `e+${num.length - 1}`

  num = `${int}.${decPlaces}${exponent}`
  return negativeCheck(num)
    



  
  
  

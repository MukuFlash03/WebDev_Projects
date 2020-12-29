// https://codepen.io/tutsplus/pen/KjegXE
// https://webdesign.tutsplus.com/courses/3-javascript-projects-for-beginners/lessons/the-calculator-starter-file

var operations = {
    ADD: 'add',
    SUBTRACT: 'subtract',
    MULTIPLY: 'multiply',
    DIVIDE: 'divide'
  },
  numbers = {
    TOTAL: 'total',
    CURRENT: 'current'
  };
  
  var total = undefined,
      currentNumber = undefined,
      operation = undefined,
      startNew = true,
      editing = numbers.TOTAL;
  
  var $btnOperation = $('[data-operation]'),
      $btnNumber = $('[data-type="number"]'),
      $btnClear = $('#btn-clear'),
      $btnEquals = $('#btn-equals'),
      $btnPositiveNegative = $('#btn-positive-negative'),
      $txtDisplay = $('#txt-display');
  
  $btnNumber.on('click', function() {
    var newDigit = $(this).text();
    
    if (editing == numbers.TOTAL) {
      if (startNew) {
        total = newDigit;
        startNew = false;
      } else {
        if (newDigit != '.' || (newDigit == '.' && total.indexOf('.') == -1)) {
          total = total + newDigit;
        }
      }
      $txtDisplay.val(total);
    } else { // if editing currentNumber
      if (startNew) {
        currentNumber = newDigit;
        startNew = false;
      } else {
        if (newDigit != '.' || (newDigit == '.' && currentNumber.indexOf('.') == -1)) {
          currentNumber = currentNumber + newDigit;
        }
      }
      $txtDisplay.val(currentNumber);
    }
  });
  
  $btnOperation.on('click', function() {
    if (operation != undefined && currentNumber != undefined) {
      calcTotal();
    }
    operation = $(this).data('operation');
    editing = numbers.CURRENT;
    startNew = true;
  });
  
  $btnClear.on('click', function() {
    startNew = true;
    total = undefined;
    currentNumber = undefined;
    editing = numbers.TOTAL;
    operation = undefined;
    $txtDisplay.val('0');
  });
  
  $btnPositiveNegative.on('click', function() {
    if (editing == numbers.TOTAL) {
      if (total != undefined) {
        total = parseFloat(total) * -1;
        $txtDisplay.val(total);
      }
    } else { // editing numbers.CURRENT
      if (currentNumber != undefined) {
        currentNumber = parseFloat(currentNumber) * -1;
        $txtDisplay.val(currentNumber);
      }
    }
  });
  
  $btnEquals.on('click', function() {
    calcTotal();
    startNew = true;
  });
  
  function calcTotal() {
    switch (operation) {
      case operations.ADD:
        total = parseFloat(total) + parseFloat(currentNumber);
        break;
      case operations.SUBTRACT:
        total = parseFloat(total) - parseFloat(currentNumber);
        break;
      case operations.MULTIPLY:
        total = parseFloat(total) * parseFloat(currentNumber);
        break;
      case operations.DIVIDE:
        total = parseFloat(total) / parseFloat(currentNumber);
        break;
    }
    currentNumber = undefined;
    $txtDisplay.val(total);
  }
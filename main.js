function isDigit(char) {
  switch (char) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9": {
      return true;
    }
    default:
      return false;
  }
}

function isLetter(char) {
  switch (char) {
    case "a":
    case "A":
    case "b":
    case "B":
    case "c":
    case "C":
    case "d":
    case "D":
    case "e":
    case "E":
    case "f":
    case "F":
    case "g":
    case "G":
    case "h":
    case "H":
    case "i":
    case "I":
    case "j":
    case "J":
    case "k":
    case "K":
    case "l":
    case "L":
    case "m":
    case "M":
    case "n":
    case "N":
    case "o":
    case "O":
    case "p":
    case "P":
    case "q":
    case "Q":
    case "r":
    case "R":
    case "s":
    case "S":
    case "t":
    case "T":
    case "u":
    case "U":
    case "v":
    case "V":
    case "w":
    case "W":
    case "x":
    case "X":
    case "y":
    case "Y":
    case "Z":
    case "Z": {
      return true;
    }
    default: {
      return false;
    }
  }
}

function isSpace(char) {
  if (char == " ") {
    return true;
  }
  return false;
}

function isOperator(char) {
  switch (char) {
    case "=":
    case "+":
    case "-":
    case "*":
    case "/":
    case ">":
    case "<":
    case ">=":
    case "<=":
    case "!=":
    case "==": {
      return true;
    }
    default: {
      return false;
    }
  }
}

function isSemicolon(char) {
  if (char == ";") {
    return true;
  }
  return false;
}

function isDecimal(char) {
  if (char == ".") {
    return true;
  }
}

function isLeftParen(char) {
  if (char == "(") {
    return true;
  }
  return false;
}

function isRightParen(char) {
  if (char == ")") {
    return true;
  }
  return false;
}

function isLeftBracket(char) {
  if (char == "{") {
    return true;
  }
  return false;
}

function isRightBracket(char) {
  if (char == "}") {
    return true;
  }
  return false;
}

function lexer(input) {
  let inputArr = input.split("");
  let output = [];

  inputArr.forEach(el => {
    if (isDigit(el)) {
      output.push(el);
    }
    if (isLetter(el)) {
      output.push(el);
    }
    if (isSpace(el)) {
      output.push(el);
    }
    if (isOperator(el)) {
      output.push(el);
    }
    if (isSemicolon(el)) {
      output.push(el);
    }
    if (isLeftParen(el)) {
      output.push(el);
    }
    if (isRightParen(el)) {
      output.push(el);
    }
    if (isLeftBracket(el)) {
      output.push(el);
    }
    if (isRightBracket(el)) {
      output.push(el);
    }
  });
  return output;
}

const testInput = "1 + 2 = 3;";

console.log(lexer(testInput));

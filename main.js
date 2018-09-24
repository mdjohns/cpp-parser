class Token {
  constructor() {
    this.kind = "";
    this.spelling = "";
  }
}

class Keyword extends Token {
  constructor() {
    this.kind = "Keyword";
    this.spelling = "";
  }
}

const keywords = [
  "auto",
  "break",
  "case",
  "char",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extern",
  "float",
  "for",
  "goto",
  "if",
  "int",
  "long",
  "register",
  "return",
  "short",
  "signed",
  "sizeof",
  "static",
  "struct",
  "switch",
  "typedef",
  "union",
  "unsigned",
  "void",
  "volatile",
  "while"
];

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
  return false;
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

function isLeftCurly(char) {
  if (char == "{") {
    return true;
  }
  return false;
}

function isRightCurly(char) {
  if (char == "}") {
    return true;
  }
  return false;
}

function isLeftBracket(char) {
  if (char == "[") {
    return true;
  }
  return false;
}

function isRightBracket(char) {
  if (char == "]") {
    return true;
  }
  return false;
}

function isKeyword(word) {
  keywords.forEach(keyword => {
    if (word == keyword) {
      return true;
    }
  });
}

function scanner(input) {
  let inputArr = input.split("");
  let output = [];

  for (let i = 0; i < inputArr.length; i++) {
    if (isDigit(inputArr[i])) {
      let chunkDigits = new Token();
      chunkDigits.kind = "Integer";
      while (isDigit(inputArr[i]) || isDecimal(inputArr[i])) {
        chunkDigits.spelling += inputArr[i];
        i++;
      }
      output.push(chunkDigits);
    } else if (isLetter(inputArr[i])) {
      let chunkLetters = "";
      while (isLetter(inputArr[i])) {
        chunkLetters += inputArr[i];
        i++;
      }
      if (isKeyword(chunkLetters)) {
        let key = new Keyword();
        key.spelling = chunkLetters;
        output.push(key);
      } else {
        output.push(chunkLetters);
      }
    } else if (isSpace(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isOperator(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isSemicolon(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isLeftParen(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isRightParen(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isLeftBracket(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isRightBracket(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isLeftCurly(inputArr[i])) {
      output.push(inputArr[i]);
    } else if (isRightCurly(inputArr[i])) {
      output.push(inputArr[i]);
    }
  }

  return output;
}

function main() {
  let testInput = "int a = 12;";
  return scanner(testInput);
}

console.log(main());

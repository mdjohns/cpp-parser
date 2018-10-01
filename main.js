//TODO: Can we find a way to add default values to Tokens if no parameter values are passed?
class Token {
  constructor(kind, spelling) {
    this.kind = kind;
    this.spelling = spelling;
  }
}
const Semicolon = new Token("Semicolon", ";");

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
  "string",
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
    case "z":
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
  if (keywords.includes(word)) {
    return true;
  }
}

/* TODO:
Scanner does not recognize semicolons next to numbers or letters. Need to modify the isDigit (line 223-236) and isLetter (line 237-247) blocks
to add that functionality
*/
function scanner(input) {
  let inputArr = input.split("");
  let output = [];

  for (let i = 0; i < inputArr.length; i++) {
    let nextChar = inputArr[(i + 1) % inputArr.length]; // Testing for solution to semicolon issue

    if (isDigit(inputArr[i])) {
      let chunkDigits = new Token("", ""); //TODO: See TODO on line 1
      while (isDigit(inputArr[i]) || isDecimal(inputArr[i])) {
        chunkDigits.spelling += inputArr[i];
        i++;
      }
      // Checks for decimal, Token is a float if it includes one. Otherwise is labeled an integer.
      if (chunkDigits.spelling.includes(".")) {
        chunkDigits.kind = "Double";
      } else {
        chunkDigits.kind = "Integer";
      }
      output.push(chunkDigits);
    } else if (isLetter(inputArr[i])) {
      let chunkLetters = new Token("", ""); //TODO: See TODO on line 1
      while (isLetter(inputArr[i]) || isDigit(inputArr[i])) {
        chunkLetters.spelling += inputArr[i];
        i++;
      }
      if (isKeyword(chunkLetters.spelling)) {
        chunkLetters.kind = "Keyword";
        output.push(chunkLetters);
      } else {
        chunkLetters.kind = "String Literal";
        output.push(chunkLetters);
      }
    } else if (isSpace(inputArr[i])) {
      let space = new Token("Space", " ");
      output.push(space);
    } else if (isOperator(inputArr[i])) {
      let op = new Token("Operator", inputArr[i]);
      output.push(op);
    } else if (isSemicolon(inputArr[i])) {
      output.push(Semicolon);
    } else if (isLeftParen(inputArr[i])) {
      let paren = new Token("Paren", "(");
      output.push(paren);
    } else if (isRightParen(inputArr[i])) {
      let paren = new Token("Paren", ")");
      output.push(paren);
    } else if (isLeftBracket(inputArr[i])) {
      let bracket = new Token("Bracket", "[");
      output.push(bracket);
    } else if (isRightBracket(inputArr[i])) {
      let bracket = new Token("Bracket", "]");
      output.push(bracket);
    } else if (isLeftCurly(inputArr[i])) {
      let curly = new Token("Curly", "{");
      output.push(curly);
    } else if (isRightCurly(inputArr[i])) {
      let curly = new Token("Curly", "}");
      output.push(curly);
    }
  }

  return output;
}

function main() {
  let testInput = "string 1 = blahblah return";
  return scanner(testInput);
}

console.log(main());

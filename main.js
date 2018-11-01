//TODO: Can we find a way to add default values to Tokens if no parameter values are passed?
class Token {
  constructor(kind, spelling) {
    this.kind = kind;
    this.spelling = spelling;
  }
}
// Tokens that do not need specific spellings
const Semicolon = new Token("Semicolon", ";");
const LeftParen = new Token("Paren", "(");
const RightParen = new Token("Paren", ")");
const LeftCurly = new Token("Curly", "{");
const RightCurly = new Token("Curly", "}");
const LeftBracket = new Token("Bracket", "[");
const RightBracket = new Token("Bracket", "]");
const Space = new Token("Space", " ");

const keywords = [
  "auto",
  "bool",
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
  "false",
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
  "true",
  "typedef",
  "union",
  "unsigned",
  "void",
  "volatile",
  "while"
];

// Statement classes for parser
class Declaration {
  constructor(dataType, variableName, value, statement) {
    this.dataType = dataType;
    this.variableName = variableName;
    this.value = value;
    this.statement = statement;
  }
}
const dataTypes = ["bool", "char", "double", "float", "int", "long", "short", "string"];

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

// Lookahead function to check next character after letter/digit, returns Token to be pushed if needed.
function scanNext(char) {
  let nextCharStorage = "";
  if (isLeftParen(char)) {
    nextCharStorage = LeftParen;
  }
  if (isRightParen(char)) {
    nextCharStorage = RightParen;
  }
  if (isLeftCurly(char)) {
    nextCharStorage = LeftCurly;
  }
  if (isRightCurly(char)) {
    nextCharStorage = RightCurly;
  }
  if (isSpace(char)) {
    nextCharStorage = Space;
  }
  if (isSemicolon(char)) {
    nextCharStorage = Semicolon;
  }
  if (isOperator(char)) {
    nextCharStorage = new Token("Operator", nextChar);
  }

  return nextCharStorage;
}

function scanner(input) {
  let inputArr = input.split("");
  let output = [];

  for (let i = 0; i < inputArr.length; i++) {
    if (isDigit(inputArr[i])) {
      let chunkDigits = new Token("", ""); //TODO: See TODO on line 1
      let nextToken = "";
      while (isDigit(inputArr[i]) || isDecimal(inputArr[i])) {
        // If the next character is something other than a number or decimal, save it for later to push after the full number is collected.
        let nextChar = inputArr[(i + 1) % inputArr.length];
        nextToken = scanNext(nextChar);
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
      if (nextToken != "") {
        output.push(nextToken);
      }
    } else if (isLetter(inputArr[i])) {
      let chunkLetters = new Token("", "");
      let nextToken = "";
      while (isLetter(inputArr[i]) || isDigit(inputArr[i])) {
        // If the next character is something other than a letter or number, save it for later to push after the full word is collected.
        let nextChar = inputArr[(i + 1) % inputArr.length];
        nextToken = scanNext(nextChar);
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
      if (nextToken != "") {
        output.push(nextToken);
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

function parser(arr) {
  let newDec = "";
  for (let i = 0; i < arr.length; i++) {
    if (isKeyword(arr[i].spelling)) {
      if (dataTypes.includes(arr[i].spelling)) {
        newDec = new Declaration(arr[i].spelling, "", "", "");
        newDec.statement = arr.map(token => token.spelling).join("");
      }
    }
    // Looking for variable name
    if (arr[i].kind == "String Literal") {
      newDec.variableName = arr[i].spelling;
    }
    // Looking for = sign and potential compound statements to store as value
    if (arr[i].spelling == "=") {
    }
  }
  return newDec;
}

function main() {
  let testInput = "int a = s + 3";
  scannedInput = scanner(testInput);
  return parser(scannedInput);
}

console.log(main());

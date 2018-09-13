var Token = { kind: "", spelling: "" };
var tokens = [];

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
    case "9":
      {
        return true;
      }
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
      break;
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

function scanToken(program) {
  var currentSpelling = "";
  var currentChar = "";

  function takeIt() {
    currentSpelling += currentChar;
    program = program.substring(1);
    currentChar = program.substr(0, 1);
  }

  function skip() {
    program = program.substring(1);
  }

  while (program.length > 0) {
    currentChar = program.substr(0, 1);
    if (isLetter(currentChar)) {
      takeIt();
      while (isLetter(currentChar) || isDigit(currentChar)) {
        takeIt();
      }
      var aToken = Object.create(Token);
      aToken.kind = "identifier";
      aToken.spelling = currentSpelling;
      tokens.push(aToken);
      console.log(currentSpelling);
      currentSpelling = "";
    }
    if (isDigit(currentChar)) {
      takeIt();
      while (isDigit(currentChar) || isDecimal(currentChar)) {
        takeIt();
      }
      console.log(currentSpelling);
      var aToken = Object.create(Token);
      aToken.kind = "number";
      aToken.spelling = currentSpelling;
      tokens.push(aToken);
      console.log("debug: pushing token");
      currentSpelling = "";
    } else if (isSpace(currentChar)) {
      skip();
    } else if (isOperator(currentChar)) {
      takeIt();
      while (isOperator(currentChar)) {
        takeIt();
      }
      console.log(currentSpelling);
      var aToken = Object.create(Token);
      aToken.kind = "operator";
      aToken.spelling = currentSpelling;
      tokens.push(aToken);
      console.log("debug: pushing token");
      currentSpelling = "";
    } else if (isSemicolon(currentChar)) {
      takeIt();
      //console.log(currentSpelling);
      var aToken = Object.create(Token);
      aToken.kind = "semicolon";
      aToken.spelling = currentSpelling;
      tokens.push(aToken);
      currentSpelling = "";
    }
  }
  return tokens;
}

function parse(tokens) {
  var decl = { type: "", spelling: "" };
  var types = ["int", "double", "string"];
  for (let i = 0; i < tokens.length; i++) {
    console.log(tokens[i].spelling);
  }
}

var program = "int a; a = 1;";
console.log("starting scanToken");
scanToken(program);
/*for (var i in tokens) {
   console.log(tokens[i].kind + ": " + tokens[i].spelling);
}*/
console.log("Starting parse");
parse(tokens);

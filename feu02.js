#! node

// Script qui évalue une expression arithmétique

// Gestion d'erreur
const arg = process.argv[2];
const sym = ["/", "*", "+", "-", "%", "(", ")"];

if (process.argv.length !== 3) {
  console.log(
    `Veuillez indiquer au script, une chaine de caractère indiquant une expression arithmétique entre guillemets. Exemple : node feu02.js "4 + 21 * ( 1 - 2 / 2 )" `
  );
  return;
}

for (let x = 1; x < arg.length - 1; x++) {
  for (let y = 0; y < sym.length; y++) {
    if (arg[x] === sym[y]) {
      if (arg[x - 1] !== " " || arg[x + 1] !== " ") {
        console.log(
          "Veuillez séparer tous symboles et nombres par des espaces"
        );
        return;
      }
    }
  }
}

// Parsing
const exp = arg.split(" ");
console.log(exp);

for (x in exp) {
  if (exp[x] % 1 === 0) {
    exp[x] = Number(exp[x]);
  }
}
console.log(exp);

// Résolution du problème
function parenthese(tab, nombre) {
  for (let a = nombre; a < tab.length; a++) {
    if (tab[a] === "(") {
      let index;
      let prio = [];
      for (let b = a + 1; b < tab.length; b++) {
        if (tab[b] === "(") {
          parenthese(tab, b);
        } else if (tab[b] === ")") {
          index = a;
          prio = tab.splice(a, b - a + 1);
          prio.pop();
          prio.shift();
          firstCalc(prio);
          secondCalc(prio);
          tab.splice(a, 0, prio[0]);
          parenthese(tab, 0);
          return tab;
        }
      }
    }
  }
  return tab;
}

function firstCalc(tab) {
  for (let x = 0; x < tab.length; x++) {
    if (tab[x] === "/" || tab[x] === "*" || tab[x] === "%") {
      switch (tab[x]) {
        case "/":
          let value1 = tab[x - 1] / tab[x + 1];
          tab.splice(x - 1, x + 1 - (x - 1) + 1);
          tab.splice(x - 1, 0, value1);
          x = 0;
          break;
        case "*":
          let value2 = tab[x - 1] * tab[x + 1];
          tab.splice(x - 1, x + 1 - (x - 1) + 1);
          tab.splice(x - 1, 0, value2);
          x = 0;
          break;
        case "%":
          let value3 = tab[x - 1] % tab[x + 1];
          tab.splice(x - 1, x + 1 - (x - 1) + 1);
          tab.splice(x - 1, 0, value3);
          x = 0;
          break;
        default:
          break;
      }
    }
  }
  return tab;
}

function secondCalc(tab) {
  for (let x = 0; x < tab.length; x++) {
    if (tab[x] === "+" || tab[x] === "-") {
      switch (tab[x]) {
        case "+":
          let value1 = tab[x - 1] + tab[x + 1];
          tab.splice(x - 1, x + 1 - (x - 1) + 1);
          tab.splice(x - 1, 0, value1);
          x = 0;
          break;
        case "-":
          let value2 = tab[x - 1] - tab[x + 1];
          tab.splice(x - 1, x + 1 - (x - 1) + 1);
          tab.splice(x - 1, 0, value2);
          x = 0;
          break;
        default:
          break;
      }
    }
  }
  return tab;
}

let expression = parenthese(exp, 0);

while (expression.length > 2) {
  firstCalc(expression);
  secondCalc(expression);
}

console.log(expression);

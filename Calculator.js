const body = document.querySelector("body");
//let display = "";

function makeCalculator()
{
    const calculator = document.createElement("div");
    calculator.style.display = "flex";
    calculator.style.flexDirection = "column";
    body.appendChild(calculator);
    
    const display = document.createElement("div");
    display.textContent = "testing";
    display.id = "display";
    calculator.appendChild(display);
    
    const buttons = document.createElement("div");
    buttons.style.display = "flex";
    calculator.appendChild(buttons);

    const numbersRow1 = document.createElement("div");
    const numbersRow2 = document.createElement("div");
    const numbersRow3 = document.createElement("div");

    const numbersElementsArr = [];
    for(let i = 0; i < 10; i++)
    {
        numbersElementsArr[i] = document.createElement("button");
        numbersElementsArr[i].id = "integer";
        numbersElementsArr[i].textContent = "0";
    }
    /*
    const zero = document.createElement("button");
    zero.id = "integer";
    zero.textContent = "0";

    const one = document.createElement("button");
    one.id = "integer";
    one.textContent = "1";
    
    const two = document.createElement("button");
    two.id = "integer";
    two.textContent = "2";

    const three = document.createElement("button");
    three.id = "integer";
    three.textContent = "3";

    const four = document.createElement("button");
    four.id = "integer";
    four.textContent = "4";

    const five = document.createElement("button");
    five.id = "integer";
    five.textContent = "5";

    const six = document.createElement("button");
    six.id = "integer";
    six.textContent = "6";

    const seven = document.createElement("button");
    seven.id = "integer";
    seven.textContent = "7";

    const eight = document.createElement("button");
    eight.id = "integer";
    eight.textContent = "8";

    const nine = document.createElement("button");
    nine.id = "integer";
    nine.textContent = "9";

    numbersRow3.appendChild(seven);
    numbersRow3.appendChild(eight);
    numbersRow3.appendChild(nine);
    
    numbersRow2.appendChild(four);
    numbersRow2.appendChild(five);
    numbersRow2.appendChild(six);

    numbersRow1.appendChild(one);
    numbersRow1.appendChild(two);
    numbersRow1.appendChild(three);
    */




    const operatorsColumn = document.createElement("div");
    buttons.appendChild(operatorsColumn);

    const operatorsArr = [];
    for(let i = 0; i < 5; i++)
    {
        operatorsArr[i] = document.createElement("button");
        operatorsArr[i].id = "op";
    }
    operatorsArr[0].textContent = "=";
    operatorsArr[1].textContent = "+";
    operatorsArr[2].textContent = "-";
    operatorsArr[3].textContent = "*";
    operatorsArr[4].textContent = "/";

    /*
    const add = document.createElement("button");
    add.id = "op";
    add.textContent = "+";
    
    const sub = document.createElement("button");
    sub.id = "op";
    sub.textContent = "-";
    
    const mul = document.createElement("button");
    mul.id = "op";
    mul.textContent = "*";
    
    const div = document.createElement("button");
    div.id = "op";
    div.textContent = "/";
    */
}

function operate(operator, a, b)
{
    switch(operator)
    {
        case "+" : add(a,b);
                    break;
                    
        case "-" : subtract(a,b);
                    break;

        case "*": multiply(a,b);
                    break;

        case "/": divide(a,b);
                    break;
    }

}

function add(a, b)
{return a+b;}

function subtract(a, b)
{return a - b;}

function multiply(a, b)
{return a * b;}

function divide(a, b)
{
    if(b != 0)
        return a / b;
    
    alert("Cannot divide by 0.");
    alert("idiot");
        return Infinity;
}







makeCalculator();

/*
Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.
add
subtract
multiply
divide
Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.


Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.

AC +- % /
7 8 9 *
4 5 6 -
1 2 3 +
0 0 . =


Do not worry about wiring up the JS just yet.
There should also be a display for the calculator, go ahead and fill it with some dummy numbers so you can get it looking right.
Add a “clear” button.
Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in a variable somewhere for use in the next step.
Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.
You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
Gotchas: watch out for and fix these bugs if they show up in your code:
Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we’re looking for would be this student solution.
Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
You should round answers with long decimals so that they don’t overflow the screen.
Pressing = before entering all of the numbers or an operator could cause problems!
Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!

EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. 
Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. 
It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)

EXTRA CREDIT: Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.

EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.

EXTRA CREDIT: Add keyboard support!

*/
# Calculator App

## The project

This is a simple calculator app.

- It can do the simple arithmetic operations like sum, subtract, multiply and divide on numbers containing decimal points.
- If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign).
- It can be used with either click/touch or the keyboard
- Pressing the clear button clears the input and output values, and returns the calculator to its initialized state.
- When the decimal element is clicked, a '.' is appended to the currently displayed value; two '.' in one number are not accepted.

## Development

### Technologies

The technologies I used to develop this webpage.

- CSS:
  It is used to style the elements of the calculator, to add the title and the instructions to use.

- Javascript:
  It is the brain behind the calculator shown, It is used to filter the inputs avoiding certain limitations and then do the calculations.

- React:
  It is React with classes, It is used to render the components, register the keyboard events and keep track of the state of the result.

### Challenges

- I could use an implementation of input filtering but I wanted to practice my regex pattern filtering so I did my own version. This took me a while because of the limitations of the calculator. This was the most challenging part of this project.

### What I would do different if I do it again

- I would use React hooks
- I would use an implementation of input filtering that is already available.

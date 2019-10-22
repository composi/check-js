# checkjs

This is a simple starter project to get you going with JavaScript type linting that you can run from the terminal or at build time. It has five NPM scripts:

1. checkjs -- This checks the project's types using TypeScript.
2. format -- This runs Prettier on the code.
3. lint -- This runs ESLint using the provided `.eslintrc.json` rules. You can change them to what you want.
4. test -- This runs some Jest unit tests. You can change the unit tests to whatever you want.
5. start -- This runs all of the above scripts one after the other.


## Using

Clone this repo, then adjust it to your needs. By default it comes with NPM scripts to provide the project with ESLint, Prettier, and Jest unit tests. If you want something different, change the dependencies and the corresponding scripts.

## Type Linting

This project provides type linting in two ways: live and at build time. For live type linting as you code it uses the `settings.json` file inside the `.vscode` folder. For testing your types during build you can simply run:

```javascript
npm start
```

This will run Prettier, ESLint, Jest and type lint the code. If you just want to check your types you can run it separately:

```javascript
npm run checkjs
```

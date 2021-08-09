<p align="center">
<img src="https://user-images.githubusercontent.com/37651620/128588248-8ad47c14-d272-47ae-94dc-7eadb7c61ca0.png" width=300>
</p>

###### Command Line Interface ( to automatically setup pre-configured React and JavaScript initial project template ) crafted using NodeJS and external third-party library like:

- inquirer (for prompting missing values)
- args ( for parsing cli arguments)
- ncp (for recursive copying)
- chalk (for coloring output commands)
- execa (for running external commands)
- listr (for specifying list of tasks)

<h4 align="center">
⚠️ This is not for developing production application.
</h4>

## Installation Guide

```
npx chakati-fire

```

or (generating javascript)

```
npx chakati-fire javascript

```

or(generating create-react-app)

```
npx chakati-fire react

```

or(generating vite react) [Highly recommended]

```
npx chakati-fire vitamin

```

### Generating template with initilized GIT

```
npx chakati-fire javascript --git

```

---

```
npx chakati-fire react --git

```

---

```
npx chakati-fire vitamin --git

```

### Generating template with initilized GIT and installing all dpendencies.

```
npx chakati-fire javascript --git --install

```

---

```
npx chakati-fire react --git --install

```

---

```
npx chakati-fire vitamin --git --install

```

## license

MIT

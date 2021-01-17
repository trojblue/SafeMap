# SafeMap Repo





## Node server

### Tech Spec

1. Using `ES6` and `use strict` to ensure the basic convenience.
2. Using `eslint` and `prettier` to eliminate dumb errors and make code easier for human to read.
3. Using `Firebase` to provide data persistence.
4. Using `express` as a http framework which can greatly accelerate the backend working progress.
5. Using `Swagger` to provide a user-friendly api testing interface.
6. Using `yarn` to do package management **instead of npm**

### Folder structure

All of your static html file goes into `html` folder, and other static files are located under the `static` folder.

`controller`, `model`, `routes`, `utils` are what then mean literally, I'm doing a MVC modeling here.

`node_modules` is the auto-generated folder by `yarn` which contains all the packages required to make this run. Make sure you never ever alter it manually.

### How to launch the server?

If you have not installed nodejs and yarn, please help you to get one. Some helpful links are down below:

- [NodeJS official site](https://nodejs.dev/)
- [yarn official site](https://yarnpkg.com/)
- [How to install yarn along with NodeJS (Chinese)](https://zhuanlan.zhihu.com/p/304386068)

Notice that it's not necessary to use Chinese mirror server since we are not going to download a whole Costco. But if you are experiencing unbearable slow international internet from your network provider, don't hesitate to use a mirror.

Then open this folder with your favorite con-emulator and type `yarn install` to initiate the package install proceeds.
When you have

```text
success Already up-to-date
Done in xxxs.
```

prompted after executing the above instruction, you are ready to fire the server up.

You can now type `yarn dev` to start a development server which is capable to auto re-launch the node server every time you change the file.

Alternatively, you can type `yarn start` to launch a vanilla node server with express.

### How to access the swagger api?

Simply navigate to [http://localhost:3000/swagger](http://localhost:3000/swagger) to start hacking.
Notice this is the default behavior, you need to change the port if you changed the PORT constant from the `.env` file.

### How to write swagger api document?

We are using `OpenAPI 3.0` here, so it's helpful to check the following links to make a general view.

- [Swagger Document with OpenAPI 3.0 Basics](https://swagger.io/docs/specification/basic-structure/)
- [Swagger-jsDOC getting started](https://github.com/Surnet/swagger-jsdoc/blob/master/docs/GETTING-STARTED.md)

### About linting and formatting

You can use `yarn lint` to manually lint your js code, and use `yarn format` to formatting both your js and your html code.

You can also install `eslint` and `prettier` plugin to your favorite editor, such as vscode or atom, to have the linting service run on-the-fly.

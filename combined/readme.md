# 缝合怪生产处

这个文件夹合并各种修改

类似dev分支

## Node server

Tech Spec:

1. Using `ES6` and `use strict` to ensure the basic convenience.
2. Using `eslint` and `prettier` to eliminate dumb errors and make code easier for human to read.
3. Using `Firebase` to provide data persistence.
4. Using `express` as a http framework which can greatly accelerate the backend working progress.
5. Using `Swagger` to provide a user-friendly api testing interface.

### How to access swagger api?

Simply navigate to [http://localhost:3000/swagger](http://localhost:3000/swagger) to start hacking.
Notice this is the default behavior, you need to change the port if you changed the PORT constant from the `.env` file.
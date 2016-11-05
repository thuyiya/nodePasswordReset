# Password-reseter

[![N|Solid](https://cldup.com/QHVAB_xBFk.png)](https://nodesource.com/products/nsolid)

Password-reseter is a besicaly, rest your password using mailclient here you can add HTML5 mail content separatly.

> The overriding design goal for password-reseter
> test instructions.

### Tech

Password-reseter uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Nodemailer] - the streaming build system

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest pre-built release](https://github.com/joemccann/dillinger/releases).

Install the dependencies and devDependencies and start the server.

```sh
$ cd password_reseter
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ npm run predeploy
$ NODE_ENV=production node app
```

### Development

Want to contribute? Great!

Open your favorite Terminal and run these commands.

### Init

```sh
git init
```

Now add these to your `package.json`.  go to the `package.json`. copy and paste givien bellow: Then hit enter after

"Dependencies": {
    "body-parser": "*",
    "express": "*",
    "mongoose": "*",
    "cookie-parser": "*",
    "jade": "*",
    "static-favicon": "*",
    "morgan": "*"
  }

```sh
npm install
```
add these in your terminal

```sh
127.0.0.1:3000
```

### API Endpoints

This is a lightweight web service, (REST interface), which provides an easy way to access the mail-client to reset password. 

   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [nodemailer]: <https://nodemailer.com/>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>

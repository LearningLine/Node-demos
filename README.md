# Node-demos
What you will learn in this course

This course introduces Node.js to the experienced developer who wants more control, higher performance, effective security, and cross-platform support. You will learn how Node.js is built from a small, but powerful core and how these low-level constructs can be used together to build complete, modern Web applications.

On top of that core are tens of thousands of libraries and frameworks to choose from on npm and this course distills those down to the most popular and proven to work.

We will use the popular Express and Passport frameworks for building secure Web servers.

As an example of just one way to store data, the course uses MongoDB and the popular Mongoose ODM (Object Document Mapper) library for persistence.

Ensuring the quality of your design and implementation will be accomplished with the Mocha unit testing framework.

We will also cover multiple ways of structuring large code bases and automating the development and operations tasks so that maintenance and deployments are as repeatable and consistent as possible.

This course covers everything you’ll need to get started on this exciting, new platform.

Note: This course can be prefixed with a day-long deep dive into JavaScript.

Course highlights

Learn what Node.js is capable of and how it compares to other platforms
Understand how Node.js uses JavaScript and adds to it
Explore the core Node.js library and use many of those modules in labs
Access thousands more packages with npm, the Node.js package manager
Store data in MongoDB using Mongoose to model your data
Build modern Web applications with Express and Passport and Socket.IO
Automate repetitive tasks by writing Gruntfiles
Secure your servers and your users' private information
Deploy to many popular cloud providers
Course outline and topics

Day 1 

Get to know Node.js
What is Node.js and how do you use it? That will be the focus of this module. We will download Node.js, install it, write our first script, use its REPL (read-eval-print-loop), import some modules, download and use third-party, and explore a bit of the Node.js ecosystem so that we can be familiar enough to get started diving deep into the platform and implementing applications.

Explore core Node.js building blocks
Callbacks are how Node.js simulates asynchronous tasks in a single-threaded language. It's difficult to get used to at first, but absolutely vital to be an effective Node.js developer. We'll examine how Node.js uses callbacks and how that impacts the structure of your code and the way you handle errors. We'll then see how Node.js uses events to enable decoupled, publish/subscribe-style notifications. Finally, we'll see how the concept of streams allows us to write applications that can process enormous amounts of data without requiring enormous amounts of memory. After this module, you'll be able to create your own streams and use them to build a custom pipeline specific to your application's needs.

Use third-party packages with npm
By itself, Node.js is rather small and its set of built-in modules pales in comparison to those on most other platforms. That's why Node.js comes with npm,  the official Node.js package manager, which provides direct access to tens of thousands of libraries, most of which are licensed to be friendly to both open source and private developers. This module will look at how to use npm to manage your applications and their dependencies and also survey some of the essential modules you can find on npm and might want to use in your applications.

Day 2

Debug and test your code with Mocha
Debugging is inevitable when developing software and there are multiple ways to do that using Node.js. We'll start by using the V8 debugger and then examine multiple GUI-based debuggers like the free Node Inspector. We'll also see how to write tests using the popular Mocha unit testing framework.

Persist data in MongoDB with Mongoose
The Node.js platform is database-agnostic and can be used with many different kinds, both relational and not, both embedded and on a server. As just one example of storing data in an external database, we'll install and setup MongoDB so that we can connect to it from our Node.js code. Instead of communicating directly with MonogDB through the official Node.js API, we'll use the Mongoose ODM (Object Document Mapper) which makes working with MongoDB quick, easy, and still perform.

Build a Web application with Express
Web applications are commonly built on the Node.js platform with the help of Express, the most popular Web application framework on npm. This module coverssetting up an Express-based application and how it uses middleware, routing, and view engines. You'll see how to use popular middleware to enable features like logging, serving static content, parsing form data and JSON, cookies, sessions, and more.

Day 3

Authenticate and authorize your users with Passport
Who are the users sending requests to your application and are they allowed to access the resources they're requesting? This module will show how the Passport framework can extend any Express-based application with the ability to easily and securely authenticate your users and then how to use middleware to grant or deny them access in a consistent and maintainable way. You'll also see how to use Passport to enable signing in with your favorite social media or Enterprise identity providers.

Communicate in real-time with Socket.IO
The Web is changing from a mostly request/response style of interaction to something much more interesting. Modern technologies like Web Sockets allow applications to push to their users without the inefficient polling techniques we had to rely on in the past. Not all browsers support these new features, though, so this module introduces Socket.IO as a tool to manage the usage of those techniques for us.

Automate your workflows with Grunt
Developers and operations both frequently perform the same repetitive tasks. As your application grows, those tasks evolve and multiply. To ensure those tasks  are done the same way by every member of your team, Node.js developers frequently use Grunt as their tool of choice. Grunt is a generic framework for running tasks of any kind and there are hundreds to choose from. Does your application need to compile .less files into .css? Concatenate and minify your .js files? Run smoke tests on remote servers? Build images to be deployed? There are pre-made Grunt tasks for all of these and more.

Day 4

Secure your application
Security is vital to all applications and requires a strong understanding of the technologies you're using. Node.js makes it simple to use a whole host of industry standards, especially TLS/SSL. This module covers everything you need to know to secure communications between nodes and how to create and manage the keys and certificates required by these protocols.

Deploy and maintain your application
The tests are passing, the product owner is happy, it's time to ship it! This module touchs on many of the challenges that can occure while deploying your application into the cloud and still be able to take advantage of theinfrastructure you're using. You'll see how to scale up by taking advantage of multi-core machines and also scale out by deploying across multiple servers in a form and load balancing the requests across them. We'll also see how easy it is to deploy to PaaS providers like Azure or Heroku.

 

To Do Web App
===========

**AngularJS - Scala - Play - ReactiveMongo**

Getting Started
----------

Your development environment will require:
*  SBT / Play
*  MongoDB

Once the prerequisites have been installed, you will be able to execute the following from a terminal.

```
../todo-web-app >  sbt run
```

This should fetch all the dependencies and start a Web Server listening on *localhost:9000*

```
[info] Loading project definition from ../todo-web-app/project
[info] Set current project to todo-web-app
[info] Updating todo-web-app...
...
[info] Done updating.

--- (Running the application from SBT, auto-reloading is enabled) ---

[info] play - Listening for HTTP on /0:0:0:0:0:0:0:0:9000

(Server started, use Ctrl+D to stop and go back to the console...)

```

Note: This will create a MongoDB Collection for you automatically, a freebie from the Driver!
# Thrust.js

Thrust.js is a library designed to help meet the goals of a decoupled large scale application.  The work is inspired by the many [talks and presentations](https://speakerdeck.com/u/addyosmani/p/building-decoupled-large-scale-applications-using-javascript-and-jquery) of [Addy Osmani](http://addyosmani.com).

## Patterns
Thrust implements several patterns that help with the concept of large scale applications.

### Decoupling
A JavaScript application that uses thrust, creates up modules, that are all loaded an managed by the central thrust instance.  This brings Decoupling, or Separation of Concerns, into the application, as each module should have a definite purpose.

### Mediator
Otherwise known as Pub/Sub, thrust comes with a mediator, that is based on the Backbone events model.  This mediator allows modules to communicate with the central thrust instance, which other modules can listen for information on.

### Plugins and Conventions
Thrust has been constructed from the ground up to be based on plugins.

What this means is if thrust is missing some functionality you want, or requrie, you can easily extend the thrust library with any kind of functionality.

* If you don't need or want a dependancy on jQuery, why not create a dom plugin that uses Dojo or MooTools?
* Maybe you don't need Ajax based data in your application, create a local storage plugin to drop in place.

Thrust also supports conventions, these are configurable pieces that can be used to extend a plugins functionality, with extension points along the entire thrust lifecycle.

### Sandboxed Facades
Each thrust plugin is allowed to generate a facade for a given module.  What each facade does depends on the requirements of the module.  Some like dom and data add properties onto the module, which allow for DOM or data operations. Another plugin might insert an object of items that the module can then use and manipulate.

In addition module methods and plugins themselves create facades, that (to a C# developer) creates an interface, that hides the underlying implemntation.

### Asyncronous Life Cycle
Each thrust module goes through a life cycle from `Initalization` to `Start` to `Ready`, and then from `Stop` to `Destroy`, depending on the current requirements.

The thrust instance, also goes through a life cycle, named after phases a rocket goes through.  The instance will first begin a `Countdown` to `Ignition` to `Orbit`. When it's work is done it will `Deorbit` and finally `Splashdown`.

In addition thrust was designed so that at any point during a modules life cycle, or application lifecycle, the next step can be delayed. Using [Promises/A](http://wiki.commonjs.org/wiki/Promises/A) implemented by the [when.js](https://github.com/cujojs/when) library.  This gives you total control of when you say your application is "ready" or when your application is ready to "stop".

Why is that important?  With the life-cycle, you can delay the ready event from happening, until all your data has been preloaded from the server or maybe across servers. You and your development team, will not need to know about any special conditions before they start manipulating the DOM, they can do what they need to in code, and let thrust handle the big decisions.

## YAJSF????
Yet Another JavaScript Framework? There are plenty of frameworks out there, but thrust is more like those old build your own adventure books, just in this case you pick and choose the componnents you need, and Build Your Own Framework.  Thrust gives you the tools to make a framework that meets your (or your company's) needs.  The Thrust core is all about module management, and facade creation.  The real bulk of the framework features live as plugins, that can be swapped in and out as needed.

## TODO
* More examples - There are an infinite amount of possible examples that can be done, I would like to work on a TODO app and more! Ideas are welcomed!  I may also do examples based on other frameworks like Ember or Angular as time permits.
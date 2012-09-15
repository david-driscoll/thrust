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

The thrust instance, also goes through a life cycle, named after phases a rocket goes through.  The instance will first begin a `Countdown` to `Ignition` to `Orbit`. When it's work is done it will `Deorbit` and finally `Splasdown`.

In addition thrust was designed with an Asyncronous Life Cycle, at any point during a modules life cycle, or application lifecycle, the next step can be delayed, using [Promises/A](http://wiki.commonjs.org/wiki/Promises/A) implemented by the [when.js](https://github.com/cujojs/when) library.  This gives you total control of when you say your application is "ready" or when your application is ready to "stop".

## YAJSF????
Yet Another JavaScript Framework? There are plenty of frameworks out there, but where thrust makes it nieche is in its deep extensibility, that was at the heart of it's design.
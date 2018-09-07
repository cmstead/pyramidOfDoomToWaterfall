Pyramid of Doom to Waterfall
============================

There is an old, trusty library called Async. It has a behavior called "waterfall" which performs a series of async actions in order.  Although the current favored process in Javascript is to use either the built-in Promise system or a third-party library.

This repository is a demonstration of how the Async waterfall pattern, which leads to easily readible and maintainable code, can be directly derived through proven refactorings from the Pyramid of Doom antipattern which arises from from when people who struggle with just using pure callback structures.

This project is a step-wise proof of functional equivalence between callback chains and the waterfall methodology.  Each step represents a provably safe refactoring and can be checked out via Git tags.

The step tags are as follows:

- 01-initial-state
- 02-lift-and-name-anonymous-functions
- 03-extract-handle-error
- 04-introduce-error-or-next-action
- 05-deduplicate-conditional-logic
- 06-change-error-handling-in-error-or-next-action
- 07-inline-handle-error-logic
- 08-change-error-or-next-action-scope
- 09-introduce-compose-async-function
- 10-move-from-procedural-to-functional-composition
- 11-encapsulate-compose-and-execute-in-waterfall-function
- 12-extract-waterfall-behavior-to-separate-file
- 13-bonus-inline-finally-function-to-avoid-skip-reading

This list is accessible by executing `git tag`. Viewing any tag can be done by executing `git checkout &lt;tagname&gt;` where `&lt;tagname&gt;` is replaced by the tag string from above
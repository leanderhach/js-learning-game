## Level 1

Welcome to the journey, commander. Your mothership is ready and waiting for your instructions. Motherships are powerful vessels, capable of 
controlling tens of worker drones to gather resources and accomplish tasks that would otherwise require thousands of individuals. The catch, however, is that the drones must be programmed by it's commander. Don't worry though, we'll help you get set up.
---
For Now, let's explore our environment. On the left is the code editor. You'll use this to give each robot instructions, which will then
be run continously when a robot is constructed. Changing the program of a robot type will make all robots of that type return home before running
their new programs.

You'll notice that we have some code already written in the editor. You control each drone through a series of functions, that you mix with whatever code you want. To make things easier, there will always be a function reference with methods that you can currently control, as well as auto-complete in the editor.

---

#### Function Bank

- `turnOn()`: turns on a drone
- `findResource()`: returns resource and position
- `async navigateToLocation()`: moves drone to new location
- `collectResource()`: collects the resource that the drone is seeking
- `async returnHome()`: returns drone to home point
- `async unloadBackpack()`: stores the resource on the mothership
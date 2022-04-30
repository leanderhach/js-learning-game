## Level 1

Let's explore our environment. On the left is the code editor. You'll use this to give each robot instructions, which will then
be run continously when a robot is constructed. Changing the program of a robot type will make all robots of that type return home before running
their new programs.

You'll notice that we have some code already written in the editor. You control each drone through a series of functions, that you mix with whatever code you want. To make things easier, there will always be a function reference with methods that you can currently control, as well as auto-complete in the editor.

---

#### Robot Functions

`turnOn()`
Turns on a drone

`findResource(resource)`
Returns resource object

`async navigateToLocation()`
Moves drone to new location

`collectResource()`
Collects the resource that the drone is seeking

`async returnHome()`
Returns drone to home point

`async unloadResources()`
Stores the resource on the mothership

`checkbackpack()`
Returns a robot's backpack as an array

`getBackpackSize()`
Returns the size of the robot's backpack

`getName()`
Returns the robot's name

`getPosition()`
Returns current position of the robot

`getColor()`
Get the color of the robot

`dumpBackpack()`
Empty the robot's backpack into the void

`print()`
Print a log message to the console
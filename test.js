robot.turnOn();
print(robot.getName());
let resource = robot.findResource('Iron');
            
await robot.navigateToLocation(resource.position);
print(robot.getPosition());

robot.collectResource();
print(robot.checkBackpack());

await robot.returnHome();

robot.unloadResources();
print(robot.checkBackpack);

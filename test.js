robot.turnOn();
let resource = robot.findResource('Iron');
            
await robot.navigateToLocation(resource.position);

robot.collectResource();

await robot.returnHome();

robot.unloadResources();
print(robot.checkBackpack());

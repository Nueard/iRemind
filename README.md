# iRemind
# Installation instructions

First things first, in order to get the project up and running there are two tools you need - npm (node.js) and bower.
Node.js can be installed by following instructions at https://docs.npmjs.com/getting-started/installing-node

To install bower do:
```
npm install -g bower
```

In order to test/deploy the iRemind app you need to install Apache Cordova:
```
npm install -g cordova
```

Finally to install the dependencies do the following:
```
bower install
# replace android below with ios, etc for other platforms
cordova platform add android
```
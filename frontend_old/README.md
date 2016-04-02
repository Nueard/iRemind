# iRemind
# Installation instructions

First things first, in order to get the project up and running there are three things you need - npm (node.js), bower and apache cordova.
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
# replace android with target platform
cordova platform add android
cordova prepare
```

# Running instructions
To run the app on your device you need to connect it to your computer and enable developer options (on android). If you have done that just type
```
# replace android with target platform
cordova run android
```

If you want to test a platform and you don't have the necessary hardware run
```
# replace android below with ios, etc for other platforms
cordova emulate android
```
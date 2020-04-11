# Quick App Generator CLI

Handy CLI to create [Huawei Quick Apps](https://developer.huawei.com/consumer/en/quickApp) from H5 by using command line easily. 

Set up a modern installation-free app from any web url by running only one command. 

![Create Quick App](demo/create-quick-app.gif)

## Usage
1. Run via npx:
```sh
npx @onurkenis/create-quick-app
```
2. Or install create-quick-app globally and run following:
```sh
npm install -g @onurkenis/create-quick-app
create-quick-app 
```

## Options
All options can be empty when running the create-quick-app. Missing fields will be asked respectively.

```js
const args = {
  '--appName': String,        // name of your application
  '--packageName': String,    // should be unique
  '--url': String,            // url to render in app
  '--icon': String,           // path of app icon. default icon will be used if this field is empty
};
```

```sh
npx @onurkenis/create-quick-app
    --appName="My App"
    --packageName=com.onurkenis.myApp
    --url=https://github.com/onurkenis/create-quick-app
    --icon=./icon.png
```
## Contributing

Commit messages must comply with [conventional commits](https://www.conventionalcommits.org). 

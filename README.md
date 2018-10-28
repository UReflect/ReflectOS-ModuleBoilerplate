# reflect-os

> Mirror OS based on Electron

## Build Setup

```bash
# Needed dependencies
npm i yarn -g && yarn global add @vue/cli
```

``` bash

#Init your module without cloning
sh -c "$(curl -fsSL https://raw.githubusercontent.com/UReflect/ReflectOS-ModuleBoilerplate/master/init.sh)"

```

## Package your module

```bash
vue build --target lib --name your-module-name src/components/YourModuleName.vue
```

## Create your module tarball
Select your-module-name.umd.min.js and your-module-name.css.
Put these files alongside the manifest.json in a folder named your-module-name.v\[major\]-\[minor\]
Now you can create the tarball with the extension .zip

See the full documentation [here](https://github.com/UReflect/ReflectOS/wiki).

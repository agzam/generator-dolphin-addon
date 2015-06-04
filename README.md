# generator-dolphin-addon

## Getting Started

### Ensure that Yeoman is installed

> [Yeoman](http://yeoman.io) generator

Not every new computer comes with a Yeoman pre-installed.  Run the following command to make sure you have it installed.

```bash
npm install -g yo
```

### Yeoman Generators

To install generator-dolphin-addon from npm, run:

```bash
npm install -g generator-dolphin-addon
```

Finally, to create a new dolphin addon using the generator:

```bash
mkdir addon-name
cd addon-name
yo dolphin-addon
```

### What now?

After Yeoman has created the addon framework, feel free to adjust the ```package.json``` file and run ```gulp``` from your command line to get a runnable addon.

## Generators

Available generators:

* [dolphin-addon:action](#action)
* [dolphin-addon:column](#column)
* [dolphin-addon:validation](#validation)

### Action
Generates an action in `src/actions`.

Example:
```bash
yo dolphin-addon:action
```

### Column
Generates a column definition in `src/column-defs`.

Example:
```bash
yo dolphin-addon:column
```

### Validation
Generates a validation in `src/validations`.

Example:
```bash
yo dolphin-addon:validation
```

## License

MIT

# Lazy API

Fast generate CRUD api. Use for [express](https://github.com/expressjs/express), [sequelize](https://github.com/sequelize/sequelize)

## Dependencies

* [express](https://github.com/expressjs/express)
* [sequelize](https://github.com/sequelize/sequelize)

## Installation

```bash
npm install --save-dev lazy-express-api
```

And then you should be able to run the CLI with

```bash
npx lazy-express-api --help
```

### Usage

```bash
lazy-api <command>

Commands:
  lazy-api all                        Generate CRUD
  lazy-api helpers                    Generate Helpers Files

Options:
  --version  Show version number                                                  [boolean]
  --help     Show help                                                            [boolean]

Please specify a command
```

### Config file

Create `lazy-api/config.json`

```JSON
{
  "modelPath": "src/models",                  // Default `models`
  "migrationPath": "src/database/migrations", // Default `migrations`
  "controllersPath": "src/controllers",       // default `controllers`
  "servicesPath": "src/services",             // default `services`
  "routesPath": "src/routes",                 // default `routes`
  "helpersPath": "src/helpers"                // default `helpers`
}
```

### JSON file

Example `lazy-api/json-files/post.json`

```JSON
{
  "controllersPath": "src/controllers", // overwrite `config.json`
  "servicesPath": "src/services",       // overwrite `config.json`
  "routesPath": "src/routes",           // overwrite `config.json`
  "name": "post",
  "attributes": [
    {
      "name": "title",
      "type": "string",
      "allowNull": false
    },
    {
      "name": "description",
      "type": "string",
      "allowNull": false
    },
    {
      "name": "type",
      "type": "string",
      "modelType": "enum",
      "values": ["public", "private"],
      "defaultValue": "public"
    }
  ]
}
```

Example run Generate CRUD:

```bash
npx lazy-express-api all --path lazy-api/json-files/post.json
```

### Helper files

To run CRUD require some helper files (api-error-helper.js, utils-helper.js). To generate:

```bash
npx lazy-express-api helpers
```

## Demo

You can visit [https://github.com/bis2909/lazy-api-example](https://github.com/bis2909/lazy-api-example)

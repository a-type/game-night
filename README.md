# game-night
Prototype online board game app

## Development

This project uses Yarn 2 with workspaces, zero-install, and PnP. It runs PnP in "loose" configuration, which is a workaround for annoying blocking issues with undeclared dependencies.

Here's the rundown:

* With zero-install, you probably don't have to install dependencies after cloning. But just in case, you can install dependencies: `yarn install` in root
* Run scripts: `yarn dev`, etc, in service directories
* Add dependencies: `yarn add (--dev) thing` in service directories

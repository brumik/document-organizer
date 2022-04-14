# Document organizer
A desktop electron app to help you stay on top of your documents

## Install from the snap store
* `snap install document-organizer`

## Development
* use yarn instead of npm
* `yarn start` to start the development app
* `yarn app:dist` to build the package - only snap for now.
  * this process is little ocmplicated: first we need to compile with electron forge, to get the wepack bundle correctly.
  * then the electron-builder is building from the webpack compiled package the final snap package
* `yarn app:publish:snap` compiles and uploads a new snap package to the snap store - you need to have the snapcraft installed and configured for this step.

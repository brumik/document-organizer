# Document organizer
A desktop electron app to help you stay on top of your documents

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-white.svg)](https://snapcraft.io/document-organizer)

## Install from the snap store
* `snap install document-organizer`

## Development
* use yarn instead of npm
* `yarn start` to start the development app
* `yarn app:dist` to build the package - only snap for now.
  * this process is little ocmplicated: first we need to compile with electron forge, to get the wepack bundle correctly.
  * then the electron-builder is building from the webpack compiled package the final snap package
* publish on GH:
  * Bump version
  * tag the commit (`git tag v1.0.0`)
  * push the commit (`git push --tags`)
  * let the CI work, creates a draft release
  * publish the release

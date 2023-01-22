# Javascript / Typescript starter

This repository contains a foundation for starting a javascript frontend framework project such as React or Vue, as well as notes on how to work with remote containers and WSL.

## Styling and formatting setup

Prettier, gitattributes, and editorconfig are used to enforce consistent line endings.

The `/.vscode` folder contains settings for using the project's local installation of typescript and prettier.

## Running in dedicated WSL environment

It's possible to create a WSL instance for working with a specific stack, or one that is dedicated to a specific project.

For example, you could create a separate WSL installation based on the image `mcr.microsoft.com/vscode/devcontainers/typescript-node:0-18-bullseye`, or any other regular distro.

See <https://learn.microsoft.com/en-us/windows/wsl/use-custom-distro>

### Exporting the image

```bash
docker container ls -a | grep -i typescript-node:0-18-bullseye | awk '{print $1}'
docker export CONTAINER_ID > /mnt/c/temp/typescript-node:0-18-bullseye.tar
```

### Importing the tarball

`wsl --import <distro-label> <save-to-path> <file-to-import>`

## VS Code development container

The `/.devcontainer` folder contains a devcontainer definition for a typescript environment running in Debian.

See <https://github.com/microsoft/vscode-dev-containers/tree/v0.203.0/containers/typescript-node>

### Running in Windows without Docker Desktop

It is possible to run the container via WSL instead of Docker Desktop.

1. The `ms-vscode-remote.remote-containers` extension must be installed
2. Docker must be installed and running in WSL
3. The following setting in VS Code must be enabled for the project:

   ```json
   "dev.containers.executeInWSL": true
   ```

4. VS Code must be running in the WSL context.

## Examples

### Vite

Vite contains templates for several frameworks.

See <https://vitejs.dev/guide/>

```bash
npm create vite@latest
```

### Vue

See <https://github.com/vuejs/create-vue>

```bash
npm create vue@3
```

### Quasar

See <https://quasar.dev/start/quasar-cli#tl-dr>

```bash
npm init quasar
```

### React

See <https://reactjs.org/docs/create-a-new-react-app.html#create-react-app>

```bash
npx create-react-app my-app
```

#### Adding MUI for React

See <https://mui.com/material-ui/getting-started/installation/>

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Angular

See <https://angular.io/guide/setup-local>

```bash
npm install -g @angular/cli
ng new my-app
```

#### Adding Angular Material

See <https://material.angular.io/guide/getting-started>

```bash
ng add @angular/material
```

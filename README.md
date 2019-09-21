# helm-npm

Installs [kubernetes-helm3](https://github.com/helm/helm/projects/1) as a dependency wrapped by npm.

## Why?

I would like to package helm-charts with npm projects, and provide a way of generating the chart using an npm command, to reduce the number of tools developers and CICD engines are required to install.

Many of the teams I work on do not have access to a shared package manager like `gofish`, due to security policies, but however we do have our own private npm repository.

## What's included?

This package includes pre-compiled helm-binaries for helm version: `v3.0.0-beta.3`.

These binaries can be found in `bin/platform/` with their original contents included when I downloaded them from
[this helm release page](https://github.com/helm/helm/releases/tag/v3.0.0-beta.3).

For verification, these files can be compared against the helm release checksum.

The pre-compiled helm-binaries included are for the following platforms:

- bin/linux-x64
- bin/mac-x64
- bin/win-x64

> This package has been manually tested in the offical docker image for node.

There are several linux binaries which were not included, which can be seen on the [helm release page](https://github.com/helm/helm/releases/tag/v3.0.0-beta.3).

## Installation

This is a big package; I recommend only installing it using with the `--save-dev` or `-g` flags.

Global installation is simple

```bash
npm install -g williammarsman/k8s-helm

## Now found in '/usr/local/bin/npm-helm', which should be in PATH env
npm-helm version
version.BuildInfo{Version:"v3.0.0-beta.3", GitCommit:"5cb923eecbe80d1ad76399aee234717c11931d9a", GitTreeState:"clean", GoVersion:"go1.12.9"}
```

For a project installation, the `--save-dev` flag is recommended to not impact final project size.

```bash
# Project installation
## Now found in './{project-dir}/node_modules/.bin/npm-helm'
npm install williammarsman/k8s-helm --save-dev
```

Once installed, add the following to the `scripts` field in your `package.json` file to make it available in the project as `npm run npm-helm`

```json
{
  "name": "helm-npm-test",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "npm-helm": "./node_modules/.bin/npm-helm"
  },
  "devDependencies": {
    "williammarsman/k8s-helm": "^0.1.0"
  }
}
```

## Usage

npm-helm is a wrapper around helm3; it supports all of the same arguments and flags.

Assuming a project-level installation

```bash
# Install a chart
npm run npm-helm install test/template-test

# Template a chart
npm run npm-helm template test/template-test
```

See the [offical helm docs](https://helm.sh/docs/helm/) for more details on using helm.

## Compiling from source instead of packaging pre-compiled binaries

I wasn't sure how to compile helm from source as part of a `pre-install` step for `npm install`. Compiling helm requires go, and I'm not sure how to compile a go project during the `npm` build stage in a portable way.

However this would be my preferred approach, as it would have made updating this project really easy to automate and reduce the size of the project by 60%. If anyone has any ideas on how this could be done, please let me know in an issue or PR.

## License

[Apache License v2.0](./LICENSE)

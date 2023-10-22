# Code Runner Service

## script for dev

- Start docker for development

```bash
npm run docker:dev
```

- Run code on docker

```bash
npm run dev:docker
```

- publish docker image

``` bash
npm run push:docker
```

## Troubleshooting Installation Failures

If you encounter issues related to `node-gyp` or native module compilation when trying to install the dependencies, follow these steps:

### Local Environment

#### Windows:

1. **Install Windows Build Tools**:
    - The easiest way to set up everything `node-gyp` requires on Windows is by installing the `windows-build-tools` package:
      ```bash
      npm install --global windows-build-tools
      ```
    - This will install Python and Visual Studio Build Tools, including the necessary C++ workloads.

2. **Switch to an LTS version of Node.js**:
    - Using the latest versions of Node.js can sometimes lead to compatibility issues. We recommend using the Long Term Support (LTS) version of Node.js.
      If you're using `nvm`:
      ```bash
      nvm install 16  # Or the latest LTS version.
      nvm use 16
      ```

3. **Manual Visual Studio Installation** (if needed):
    - Install [Visual Studio 2019](https://visualstudio.microsoft.com/visual-cpp-build-tools/) or a newer version.
    - During installation, select the "Desktop development with C++" workload.
    - After installation, try running `npm install` again in the project directory.

4. **Check Permissions**:
    - Ensure you have proper permissions to modify the project folders and that no processes are locking folders or files in the directory.

#### Linux:

Ensure you have the necessary build tools installed:

```bash
sudo apt-get install python3 make g++
```

### Docker Environment (Alpine):

If you're using an Alpine Docker container, ensure the necessary build tools are installed. Modify the Dockerfile to include:

```Dockerfile
# Install python, make, g++, and other build tools
RUN apk add --no-cache python3 make g++
```

Then, rebuild your Docker image and try running it again.

---

Contributors should find this section helpful in addressing common installation pitfalls related to native module compilations. Adjust as necessary to fit the specifics of your application or environment.

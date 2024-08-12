
# Country based Auth App

This the a mobile app for country based auth validation and themeing,

### Features:
1.  Auth
2. Localization
3. Country based themeing
4. IOS Local Push notification
5. Api integration
6. Secure storage


## How to Run this app ?

for better dev express make sure you are using yarn instead of npm

### Make sure the express server is up and running
[Expres Server Repo](https://github.com/ahmdammarr/auth-simple-express-server)

### Add env variables:
```ENDPOINT=http://localhost:3000/api```

### Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# OR using Yarn
yarn start
```

### For ios you need to install pods

``` bash
npx pod-install
```

### Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# OR using Yarn
yarn android
```

### For iOS

```bash
# OR using Yarn
yarn ios
```


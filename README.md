# react-oauth2-skeleton

## What is this repository for?

This repository provides a skeleton application that you can fork to quick-start your own React app!

### Features

- built-in structure for navigation with react-router
- built-in structure and logic for internationalization with i18next
- oauth2 flow (for more information, see chapter oAuth)

Find the corresponding backend-api express-oauth2-skeleton [here](https://github.com/tum-aweink/express-oauth2-skeleton). 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) but we ejected Create React App to have more control over linting and configuration. Please find the Create React App documentation on the bottom of this README. 

### OAuth

OAuth offers a rich set of protocols to allow authorized API calls. This skeleton includes logic and program flow for login and register functionality and account linking for third-party services (e.g. Amazon Alexa account linking).

#### Account Linking

Be aware that account linking will require https support. For an easy setup of https, build on top of the Deployment steps and integrate CloudFront for your S3 bucket to support https calls.

## Getting started

This repository is set-up for unix systems only. Some scripts will not work on Windows, so it is storngly recommended that you work with this repository on a unix machine (Mac, VM, Linux).

### IDE / Editor

Get yourself VSCode for a quick start. On Linux just run: `snap install code`. Other IDEs e.g. Webstorm work fine as well, just make sure that you have nice git and eslint support within your editor for more convenience.

For VSCode, we can recommend the following extensions:

- eslint: A package that will show you all eslint linting errors within your code. Make sure to activate the checkbox "Auto fix on save" to ensure that all auto linting fixes will be fixed on every file save

### `npm install`

Install all third party dependencies with `npm install`. If the command throws errors, it might help to run it as sudo or with the unsafe flag: `sudo npm install --unsafe-perm=true`. See `package.json` for more information.

### Setup .env

Create a new file called `.env` and `.env.development` and copy the template from `EXAMPLE.env` and `EXAMPLE.env.development`. If you forked this repository, it is on you to invent secrets and save required secrets accordingly. If you are part of a team, than ask your co-contributors for the secrets and save them to your .env files. Please make sure that you keep the .env file private and do not share the information in the file with anyone. Do not add `.env` to git! 

Important! We ejected out of create-react-app but we still use the create-react-app configs, e.g. see `./config && ./scripts`. Create-react-app does only allow custom env. variables that start with `REACT_APP_`. Please make sure that you name your custom env-variables accordingly. 

### Using git hooks

This part is optional but prevents you from accidently commiting unfinished code. Creade a new file named `commit-msg` to the folder `.git/hooks/` inside the root folder of this project and paste following code inside:

```
#!/bin/bash
files=$(git diff --cached --name-only | grep '\.jsx\?$')

# Prevent ESLint help message if no files matched
if [[ $files = "" ]] ; then
  exit 0
fi

failed=0
for file in ${files}; do
  git show :$file | ./node_modules/.bin/eslint $file
  if [[ $? != 0 ]] ; then
    failed=1
  fi
done;

if [[ $failed != 0 ]] ; then
  echo "🚫🚫🚫 ESLint failed, git commit denied!"
  exit $failed
fi
```

This prevents unfixed linting erros from being commited.
IF the hook is not working, try: `chmod +x commit-msg`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

- The `build.js` script relies on the homepage field in the `package.json`, please make sure to set the homepage field properly or do not set homepage if you want to reference the root folder. 

### `npm run deploy`

Includes `npm run build` to make sure the react app is up to date. For more details checkout the chapter Deployment.

## Deployment

Use the AWS command-line-interface to deploy the react web app. If you want to quickly host your application, you can do so on a AWS S3 bucket. Make sure you have a AWS developer account and create your access keys via the AWS console. There are plenty of nice guides out there on how to create a S3 bucket for static web hosting! Just set up your own bucket and also create yoruself secret & access keys for CLI access and follow this quick guideline: 

- First install awscli via: `brew install awscli`
- Run `aws configure` and configure the access keys (use eu-west-1 as your region).
- Run `npm run deploy` to push the repository to the AWS S3 bucket.
- Check out the app under: http://your-app-name.s3-website-eu-west-1.amazonaws.com

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Making use of env variables

.env variables are powerful tools to hide secret information from git and allow the differentiation of different environments via flags. See this guide for how they can be used within create-react-app: https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

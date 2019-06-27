<a href="http://tabiri.surge.sh/home"><img height="100px" src="http://tabiri.surge.sh/static/media/colored.d9973a3c.svg" title="Tabiri" alt="Tabiri"></a>

<!--[![Tabiri](http://tabiri.surge.sh/static/media/colored.d9973a3c.svg)](http://tabiri.surge.sh/home)--> 

# Tabiri UI

A React Web Application that leverages GIS to display statistical forecasts of vaccine demand in Nyandarua County.


[![Sneak Peek](https://img.youtube.com/vi/b33qhOCp51c/0.jpg)](https://www.youtube.com/watch?v=b33qhOCp51c)

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Support](#support)
- [License](#license)

---

## Installation

Below is the installation process

### Clone

Clone this repo to your local machine

```shell
$ git clone https://github.com/ochomoswill/tabiri-ui.git
```

### Folder Structure

The folder structure will be as follows after cloning

```
tabiri-ui/    
    public/
    src/   
    	assets/
    	components/
    	containers/
    	routes/    	     
        store/
        	store1/
            	actions.js                
            	actionTypes.js  
            	reducers.js                
            	sagas.js
            	selectors.js 
            	services.js
        utils/                
        ...
        index.js
    .gitignore
    .travis.yml
    package.json
    README.md
```

### Setup

Install the dependency by typing the below on the root directory

```shell
$ npm install
```

To start the application

> The application runs on a live API. However if you want to set up your the API locally, head over to [tabiri-api](https://github.com/ochomoswill/tabiri_api)

```shell
$ npm start
```

---

## Features
<!--## Usage (Optional)
## Documentation (Optional)
## Tests (Optional)

- Going into more detail on code and technologies used
- I utilized this nifty <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown Cheatsheet</a> for this sample `README`.
-->

### Technology Used
* React
* Redux
* Redux Saga
* React Router v4
* React-Leaflets
* Chart-Js
* Bootstrap


---

## Contributing

### Step 1

- **Option 1**
    Fork this repo!

- **Option 2**
    Clone this repo to your local machine
    
    ```shell
    $ git clone https://github.com/ochomoswill/tabiri-ui.git
    ```

### Step 2

**HACK AWAY!** 🔨🔨🔨

### Step 3

Create a new pull request using <a href="https://github.com/ochomoswill/tabiri-ui/compare/" target="_blank">`https://github.com/ochomoswill/tabiri-ui/compare/`</a>.

---

## Deployment

- Get source code

    **Option 1**
    - Fork the repo
        
    - Create a clone of your forked repo
        
        ```shell
        $ git clone https://github.com/ochomoswill/tabiri-ui.git
        ```
    
    **Option 2**
    - Clone this repo to your local machine
    
        ```shell
        $ git clone https://github.com/ochomoswill/tabiri-ui.git
        ```
    
    - Then create your own new repo and set new remote url
    
        ```shell
        $ git remote set-url https://github.com/USERNAME/REPOSITORY.git
        ```
    
    
      


- Install surge

```shell
$ npm install --g surge
```

- Build the app

```shell
$ npm run build
```

- Set up surge

```shell
$ surge
```

- Surge will kick in and ask for your email and a password to set up your account. 
When it gets to project path:, be sure to append `/build` to the end.
The next prompt is for `domain:`, enter `<your_name_here>.surge.sh`.

- Head on over to [TravisCI](https://travis-ci.org/) and log in with your GitHub account.

- Enable your projects by flicking the switch, editing the .travis.yml to your project.

```yaml
    language: node_js
    node_js:
      - "stable"
    # Specify `npm install`
    install:
      - npm install
    
    # Continue to use the old cache location
    cache:
      directories:
        - "node_modules"
    script:
    # oops!! Tests not done yet
    #  - npm test
      - CI=false npm run build
      - mv build/index.html build/200.html
    deploy:
      provider: surge
      skip_cleanup: true
      domain: <my_name_here>.surge.sh
      project: ./build/
    on:
      branch: master
```

> Make sure to change the domain line under deploy to the domain you used above when running Surge so the automation will deploy the code to the same domain each time it runs.

- Get and copy the surge token

```shell
$ surge token
```

- Back on [TravisCI](https://travis-ci.org/) you can find the settings by clicking the repo in the left side panel then clicking “More options” > “Settings” from the menu on the right side.
 Scroll down the page to Environment Variables and set up the following variable:
 
    - `SURGE_LOGIN` - your email address used when setting up Surge.
    - `SURGE_TOKEN` - the token you copied from the output of `surge token`.

- Push a new commit to GitHub

- Watch the builds or deployment status at [TravisCI](https://travis-ci.org/) on `travis-ci.org/<username>/<repository>/builds`.

- When done your app will be deployed on `<your_name_here>.surge.sh`. You can make some more changes to your app and push them up to GitHub to see them quickly redeployed automatically to your webpage.

---


## Support

Reach out to me at one of the following places!

- Website at <a href="https://ochomoswill.github.io" target="_blank">`ochomoswill`</a>

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="https://ochomoswill.github.io" target="_blank">ochomoswill</a>.
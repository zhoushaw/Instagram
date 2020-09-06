
## Introduction

[中文简介](./README_ZH.md)

> Create your own instagram!

> Technology stack

- react buckets of
- ant design
- egg.js
- mysql

Before and after the end of the separation of development mode, the front-end and back-end projects belong to different projects

```javascript
// instagram/client The front-end engineering
// instagram/service The backend engineering
```

Note: this project is purely personal fiddle, have nothing to do with them.

## Features screenshots

> The login

<img src="https://s10.mogucdn.com/mlcdn/c45406/181201_4bge1k2c4l22ec994hjb496digb2f_419x264.gif" width="665" height="369"/> 

> Focus on

<img src="https://s10.mogucdn.com/mlcdn/c45406/181201_874ecg16jfkb8elck42lkg753jhgk_600x377.gif" width="665" height="369">

> Posting

<img src="https://s10.mogucdn.com/mlcdn/c45406/181201_8g2fe66115ijhi5i33iik23i2e2ff_419x264.gif" width="665" height="369">

<!-- <img src="https://s10.mogucdn.com/mlcdn/c45406/181201_52hiflj1l28a6692j8abak6k6i76j_419x264.gif" width="665" height="369">


<img src="https://s10.mogucdn.com/mlcdn/c45406/181201_1kkcaebb013e47b6h4bl16g9i73lh_419x264.gif" width="665" height="369"> -->

> Thumb up, review and search

<img src="https://s10.mogucdn.com/mlcdn/c45406/181201_4l95k967h41c2b1hf5jej417fel2e_419x264.gif" width="665" height="369">

> Modify personal information

<img src="https://s10.mogucdn.com/mlcdn/c45406/181201_6ghc2k2807ih876b0dlibk7a2i463_600x377.gif" width="665" height="369">




## Run the project

Because of different port reason, front and back side to solve the cross domain. Launched devServer front-end engineering, need to start the backend engineering

* git clone https://github.com/zhoushaw/Instagram.git
* cd Instagram

> Run the back-end projects

* Please make sure you have install mysql in your local environment and config the global variable
* mysql -u root -p # and enter the password database
* create database learn 
* use learn;  # change dabase
* source learn.sql's path; example：source /Users/shawzhou/Desktop/learning/instagram/db/learn.sql;
* config eggs.js link dabase information

```javascript
// goto service/config/config.local.ts，config your dabase information
config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'learn',
    username: '', 
    password: '', 
    operatorsAliases: false
};
```

*  config NiuYun upload token information

```javascript

// goto /service/app/service/qiniu.ts，Configure your seven NiuYun token information
export default class qiniuService extends Service {
    // To seven NiuYun individual panel=>The secret key management view
    private accessKey: string = ''; // The secret key
    private secretKey: string = ''; // The secret key
    private publicBucketDomain = ''; // Outside the chain of the default domain name

    private options: qiniuOptioin = {
        scope: '', // upload scoped
        expires: 7200
    }

    // ....
}

// Seven NiuYun storage area set, to go/client/src/components/upload/index.js，Configure the upload area
class Upload extends React.Component{


    uploadFn = async () => {
        // ...
        var config = {
            region: qiniu.region.z0 // Subordinate to the area, can go to seven NiuYun document view
        };
        // ...
}
```


* in /service file
* npm install
* npm run dev


> Run the front-end project

* cd client
* npm install
* npm start

## The target function

- [X] Login, registration
- [X] Modify personal information
- [X] Focus on
- [X] comments
- [X] give a like
- [X] Search for posts
- [X] Upload the picture
- [X] Posting
- [X] collection

> If you have any help to you, you can order the upper right corner of the Star support thank you very much！ ^_^
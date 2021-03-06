# Twelfth Image Upload Exam

## Introduction

This project is a simple SPA ( Single Page Application ) which allows you to preview, download, delete and restore images. 

## Prerequisite

The following are needed to install:

1. [Composer](https://getcomposer.org/)
2. [Git Bash](https://git-for-windows.github.io/)
3. [Mysql](https://www.mysql.com/)
4. [Php v.5.6.4 ](http://php.net/)
5. [Node Js](https://nodejs.org/en/)
6. [Angular CLI](https://cli.angular.io/)

## Install

To install, clone or download this repository

Next, create a virtual host 'twelfth.dev' for the project

Next, open git bash within the copy of the boilerplate and run the following composer command to update the vendors needed

	composer install

Next, rename the **.env.example** file to **.env** and fill up the necessary configurations ( e.g. database information ). For more information, read [Environmental Configuration](https://laravel.com/docs/5.5/configuration)

Next, run the following command in git bash to migrate all the database used for the exam.

	php artisan migrate

Next, run the following command in git bash to insert all the sample records used in the exam.

	php artisan db:seed

Next, run the following command in git bash to include all new custom added classes

	composer dump-autoload

Next, within 'public\twelfth-upload' run the following command in git bash to install all node modules

	npm install

Finally, within 'public\twelfth-upload' run the following command in git bash to open the site

	ng serve --open

## Reference

1. [Laravel](https://laravel.com/)
2. [Angular](https://angular.io/)
3. [Angular CLI](https://cli.angular.io/)
4. [Node JS](https://nodejs.org/en/)
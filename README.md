# SlideShow

This project is an angular and java project which allow you as the user to create a list of images and display them as a slideshow. 

## How to run

You can run each part of the project separately. run "homeApplication" to start the Java-based restful server in http://localhost:8080 with an h2 local database. 
By connecting to http://localhost:8080/api/sliders you can check that your server is up and running

You can run "ng serve" or simply run "start" which will start the Angular front-end at http://localhost:4200.  
for the first time run you might get an error that npm is not installed - to fix it you should go to the terminal in the project, use the line `cd front-end\novi-slide-show` 
and then use `npm install`


## How To Use

By connection to http://localhost:4200 after running both project you will be introduced to the list view of the application which allow you to easily add and delete images
from the slideshow. You can use the "Go to the slideshow" button to switch view.

the slide show will display all the images in the list one after the other, based on the duration you provided. and you can add images during the slide show view, or select to 
delete the current image that is displayed. you can always go back to the list view by clicking the "go to list view button"

## Further help

You can always reach out if you have any questions! 

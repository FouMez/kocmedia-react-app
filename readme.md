# Technical test for Koch Media

## Task 1

You work as a JavaScript Developer in a Koch Media that heavily works with Enterprise systems.
You’ve got a task to create for providing fully functional effects and user interaction on an html table shown below. Coding your own implementation in one of offered languages / frameworks

#### (ES6,TypeScript, Angular or React.js)

![alt text](https://scontent.ftun6-1.fna.fbcdn.net/v/t1.15752-9/121614985_343172876982611_8150607161686579941_n.png?_nc_cat=109&_nc_sid=ae9488&_nc_ohc=8axSKVtYOoIAX_StH0C&_nc_ht=scontent.ftun6-1.fna&oh=0651d72ba1c7719a52c9e70887555ca9&oe=5FABE695)

#### NOTE: In this task you have BONUS tasks. Bonus tasks can be solved only if you solve other tasks first

1.1. You should create HML/CSS for the given HTML table.

1.2. You should create a form to enter data into the table by pressing the submit button.

1.3. When clicking at ‘read’ button, you should get all data from the given row and show them as 'details' bellow the table

![alt text](https://scontent.ftun6-1.fna.fbcdn.net/v/t1.15752-9/121477284_370994697603426_9131640005091798424_n.png?_nc_cat=110&_nc_sid=ae9488&_nc_ohc=73zYk-GvTLwAX90ad0B&_nc_ht=scontent.ftun6-1.fna&oh=869462e523eeebefce057b744aed9902&oe=5FAAA845)

1.4. When clicking on Delete button, the current user should be deleted

1.5. When clicking on Update button, the current row should become editable, and the update
button should turn into a save button. Upon entering new data, pressing the save button should
save the updated user data.

1.6. BONUS 1: When clicking on any of the rows (not the buttons) color the clicked row with a blue
background.

1.7. BONUS 2: Add a CLOSE button in details view, so that when it’s clicked, details view will get
closed.

1.8. BONUS 4: Validate that the email entered in the form is truly an email address. Validate that the telephone number is composed only from numbers.

## Task 2

Create Nodejs server witch will connect to the client application from the Task1. The service should
have the basic functionalities like create, read, update and delete users. The users Data should be store into local memory you don’t need to create any DB connections (keep it simple).

2.1 You should create Node service for the client application from Task1.

2.2 Service should have following endpoints

- create a new user send JSON payload with user data (Name, Email, Phone)
- fetch existing user list return list of saved users
- update existing user send JSON payload with updated user data (Name, Email, Phone)
- delete existing user

2.3. BONUS 1: Create a custom response body where you will send to client status code, data and
user friendly message.

2.4. BONUS 2: Create a 404 Not found endpoint witch will return an error when user try to request
not existing route.

```
readme.md generatd by Firas Mezghani (FouMez)
```

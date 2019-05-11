# Professor Review System

---

Name: Abhinav Bahl, Mitchell Skopic, Marvin Xu  

Date: May 1, 2019



Implementation: Professor Review System

Our WebApp allows the users to add and search for professors in a lot of different ways. The user can add different professor reviews dynamically to the database. He can then retrieve all of those reviews upon re-loading the web app. Along with that, the user can view highest and lowest rated professors in different views, alphabetically list all professors and generate random professor reviews. The user can also delete professor reviews from the database permanently, using the professor’s name. This app is conjointly built by Abhinav Bahl, Mitchell Skopic and Marvin Xu.

Sockets: Our project has a list of professors on the home page which auto-updates when new professors are added to the database. After a POST entry, a new item is added to the homepage of all connected sockets. A emit() call is made with the new data which is used in main.handlebars to update the list.

For Further details please view our documentation.md file

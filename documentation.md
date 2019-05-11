# Professor Review System

---

Name: Abhinav Bahl, Mitchell Skopic, Marvin Xu

Date: May 1, 2019

Project Topic: Professor Review System

URL:

---

Implementation

Sockets:
Our project has a list of professors on the home page which auto-updates when new professors are added to the database. After a POST entry, a new item is added to the homepage of all connected sockets. A emit() call is made with the new data which is used in main.handlebars to update the
list.

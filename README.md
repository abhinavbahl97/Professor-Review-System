# Professor Review System

---

Name: Abhinav Bahl, Mitchell Skopic, Marvin Xu  

Date: May 1, 2019

Project Topic: Professor Review System

URL:

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name        ...       `Type: string`
- `Field 2`: University     ...       `Type: string`
- `Field 3`: Subject     ...       `Type: string`
- `Field 4`: Rating      ...       `Type: number`
- `Field 5`: Review     ...       `Type: array of strings`

Schema:
{
Name: {
type: String,
required: true
},
University: {
type: String,
required: true
},
Subject: {
type: String,
required: true
},
Rating: {
type: Number,
min: 0,
max: 10,
required: true
},
Review: [String]
}

### 2. Add New Data

HTML form route: `/professor_form`

POST endpoint route: `/api/getProfessor`

Example Node.js POST request to endpoint:
var request = require("request");

var options = {
method: 'POST',
url: 'http://localhost:3000/api/addProfessor',
headers: {
'content-type': 'application/x-www-form-urlencoded'
},
form: {
Name: 'Mihai Pop'
University: 'UMD'
Subject: Computer Science
Rating: 7
reviews: ["great", "talkative", "hard grader"]
}
};

request(options, function (error, response, body) {
if (error) throw new Error(error);

console.log(body);
});

### 3. View Data

GET endpoint route: `/api/getProfessor`

### 4. Search Data

Search Field: Name of Professor

### 5. Navigation Pages

Navigation Filters
1. home or all teachers -> `  /  `
2. lowest rated teachers -> `  /lowRate  `
3. highest rated teachers -> `  /highRate  `
4. alphabetically listed teachers -> `  /alpha  `
5. random teacher -> `  /rand  `
6. add teacher -> ` /teacher_form `

###Final Project

### 6. MongoDB

Our project imports the following files and uses npm packages for schemas
var _ = require('underscore');
var mongoose = require('mongoose');

### 7. Live Updates


### 8. View Data

Our handlebars pages includes delete-form, delete, home, professor form, professor, and University. Professor form has
the submission form.

Use express.js to have at least 10 different endpoints
/professor
/
/professor/:id/review
'/delete-form'
'/delete'
'/api/getProfessor'
'/api/getCollege'
'/professor/:id'
'/highRate'
'/lowRate'
'/alpha'
'/rand'
'/professor_form'
are the 10 endpoints we have
##At least 2 post endpoints
'/professor'
'/professor/:id/review'

## At least 2 delete endpoints
'/delete-form'
'/delete'

### 8. Modules
Our modules can be found in the index and models folders. 2 modules include unique() in index.js
and professor.js in models

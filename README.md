
# Professor Review System

---

Name: Abhinav Bahl, Mitchell Skopic and Marvin Xu

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

Schemas:
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

### 4. Search Data and API

Search Field: Name of Professor
2 POST Endpoints:
  POST '/professorAdd'
  POST '/professor/:id/review'

2 Delete Endpoints:
  '/delete'
  '/delete-form'


### 5. Navigation Pages and Modules

Navigation Filters
1. home or all teachers -> `  /  `
2. lowest rated teachers -> `  /lowRate  `
3. highest rated teachers -> `  /highRate  `
4. alphabetically listed teachers -> `  /alpha  `
5. random teacher -> `  /rand  `
6. add teacher -> ` /teacher_form `
7. Delete teacher -> ' /delete-form'

2 Modules used are the Unique() module in index.js
and the professor module in models

# Front-End-Internship-Task

This is a Front-end task for my internship at **Forte Digital**. This repo is created based on the `create-react-app`. It consists of a list of interns. It has two pages:
​

1. Intern List page
1. Edit Intern page

## Task One - validation of intern editing

​
You need to work on the `Edit Intern` page.
​

- Load details of an intern from API (http://localhost:3001/interns/:id) and display it in the form
- Add Missing fields: `internshipStart`, `internshipEnd` allowing to edit dates
- Make all fields required (name, email, internshipStart, internshipEnd)
- Validate if the email is correct
- Validate if `internshipEnd` after `internshipStart`
- Update intern data in `db.json` on form submit using API endpoint (PUT http://localhost:3001/interns/:id)
  ​

## Task Two - Page styling and semantic HTML

​
You need to work on both `Intern List` page and `Edit Intern` page.

- Change the HTML markup to the more semantic one.
- Style both pages according to the design:
  https://www.figma.com/file/DNF5oDSn7NTO4Ls1kVkK1K/Task?node-id=1%3A2
- Remember about accessibility

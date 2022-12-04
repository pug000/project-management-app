# Project Management App

_**Project Management App** is an application that helps a team or group of developers achieve their goals._

[Link to the deploy](https://pug000.github.io/project-management-app/#/ "PMA")

## Usage

#### Welcome page
The _Welcome page_ displays general information about the developers, project and course. In top right corner there are buttons Sign In and Sign up which can redirect the user to the route with the Sign In / Sign Up form. Left to that buttons there is a language switcher (EN, RU).
Also it is possible to go to the _Projects page_, but its content is available only for registered users. If the user is logged in he has a possibility to edit his profile or log out. When the token expires - the user will be logged out automatically and redirected to the _Welcome page_.

#### Sign In / Sign Up
_Sign In / Sign up_ routes are represented as pages with an auth form. Form fields are implemented in consistency with the backend API of the application. Validation is also implemented. Errors appear as a user-friendly messages or popups. Upon successful login, the user is redirected to the _Main route_.

#### Main (projects) route
_Main route_ displays all created projects as a list. Projects are displayed with a small preview of the available information (title, description, owner). By clicking on the element, the user redirects to the project item (_Board (project) route_).
When a user tries to delete the project, he receives a confirmation modal to verify his decision.
Extra functionality: project search. The user can find the necessary project by typing its title to the searchbar placed on this page.

> Available only for registered users

#### Board (project) route 
By default the user sees an empty project with title and description, but there is a possibility to create a column. If there is at least one column on the board, the task creation button displays. When a task is created by filling out the creation form, it becomes linked to a column. The user can create multiple columns and an unlimited number of tasks. The columns can be swapped and the tasks can change their order and belonging to the columns using drag-n-drop. So the user can get a classic kanban board to control and automate his projects.

> Available only for registered users

The application was developed in 4 weeks.

[Link to the task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/react/project-management-system-EN.md)

## Main stack:

- react
- react-router
- typescript
- redux toolkit/rtk query
- reselect

## Styling:

- styled-components
- react-icons
- framer-motion

## Additional tools:

- eslint
- prettier
- react-hook-form
- react-i18next
- react-select
- react-beautiful-dnd (@hello-pangea/dnd)

### To start application you need to perform next steps:

```bash
1. git clone git@github.com:pug000/project-management-app.git
2. cd project-management-app
3. git checkout develop
4. npm i
5. npm run start
```

### Code quality control:

To ensure quality control software tools (eslint, prettier) were used and development was divided into different branches using the Git version control system. The  working application is located in the `develop` branch, into which development participants made pull requests. The main rule for checking PR: approving by all project participants is necessary.

### Developers:

- [Roman Troshin](https://github.com/pug000)
- [Anastasiya Sachko](https://github.com/saachko)
- [Artem Kharytonchyk](https://github.com/aArt13)

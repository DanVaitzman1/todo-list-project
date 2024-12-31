# Test Plan

This document outlines the test cases for the application. Each section focuses on specific functionalities of the application.

---

## Test Cases

### Signin Page
1. **Test signin with valid email and password.**
2. **Test signin with invalid email or password.**
3. **Test signin with empty email or password field.**

### Signup Page
1. **Test signup with valid email, last name, first name, password, and confirmed password.**
2. **Test signup with invalid email or password.**

    - **Test signup with invalid email:**
        - Enter an email address without a `@` character.
        - Click on the signup button.
        - Verify that an error message is displayed indicating that the email address is invalid.

    - **Test signup with invalid password:**
        - Enter a password with less than 5 characters.
        - Click on the signup button.
        - Verify that an error message is displayed indicating that the password is too short.

3. **Test signup with empty email, last name, first name, passwords, or confirmed password field.**
4. **Test signup with mismatched passwords.**

### Tasks Page
1. **Test filtering by owner name, title, description, etc.**
2. **Test exporting filtered tasks to Excel.**
3. **Test logout button functionality.**
4. **Test delete button functionality within expanded task:**
    - Expand a task by clicking on it.
    - Click on the delete button within the expanded task.
    - Verify that the task is deleted and removed from the tasks list.

5. **Test editing task functionality within expanded task:**
    - Expand a task by clicking on it.
    - Make changes to one or more of the task fields.
    - Verify that the changes are saved when the field loses focus (on blur).
    - Verify that the changes are reflected in the tasks list.

6. **Assign task to someone else:**
    - Create a new user account (e.g., "Dan Vaitzman").
    - Log in with the original user account.
    - Expand a task by clicking on it.
    - Click on the owner field.
    - Verify that the new user ("Dan Vaitzman") appears in the dropdown list of available assignees.
    - Select the new user from the dropdown list.
    - Verify that the changes are saved when the field loses focus (on blur) and changes are reflected in the tasks list.

### Create Task Modal
1. **Test creating a new task with valid title, description, priority, status, and due date.**
2. **Test creating a new task with empty title, description, priority, status, or due date field.**


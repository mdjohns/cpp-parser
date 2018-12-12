# C++ Parser

## Introduction

The goal of this project is to create an online interactive C++ environment with easy error messaging. By simplifying the development environment, students will have an easier time diving in to learning programming.

This is an internship project developed for [UAPTC](https://uaptc.edu), managed by Professor Michael McMillan. Marcus Johnson, Ashley Newsom, and Jugal Patel are student contributors to this project. **This is a work in progress**.

## Technologies

This project will be a JavaScript web application designed to be run in the browser.

#### To Do

- [x] **Create scanner**. This should retrieve tokens (such as `int`, `"blah"`, and `+`) from inputted code and push those tokens to an array.
- [ ] **Create parser**. This should take the tokens array from `scanner()` and attempt to form valid C++ statements (such as declarations, conditionals, and loops).
  - [x] Parse declaration statements.
  - [x] Parse conditional statements.
  - [ ] Parse basic loop statements.
  - **Issue**: Needs more testing for edge cases. Removing spaces in statement (ex. `if (a > b) { return true; }` vs `if (a>b){return true;}` breaks `scanner()` function.
- [ ] **Build web interface**. 

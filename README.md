# Kanban document template

## Description

This repository contains a simple template for building
[Kanban](https://board-kanban-trello.netlify.app/) documents; Kanban is a trello template to add your daily todo tasks

## Usage

### Installing

In order to use this you will need to make sure that the following
dependencies are installed on your system:
  - NodeJs
  - Npm/yarn

### Folder structure

Here's a folder structure for a Kanban document:
keeping in mind to Write production-grade code that can be easily extended to add new
features. we would need to take kanban folder which consists of board and the components used for it.

```
Trello-Clone/     # Root directory.
|- public/        # Folder used to store builded (output) files.
  |-images/       # Images folder.
|- src/           # Markdowns files; one for each chapter.
  |- Kanban/      # Folder that consists of all the kanban board components and sections.
    |- components/  # components for the kanban board
    |- types/       # types for the kanban cards and tiles
  |- App.tsx      # App Compoent that wraps the application
.babelrc
webpack.config.ts
package.json
index.js            # entry point for the application

```

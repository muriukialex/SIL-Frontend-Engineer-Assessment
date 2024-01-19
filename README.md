# SIL Frontend Engineer Assessment README

## Overview

This web application provides a user-friendly interface for interacting with user data, albums, and photos, and it retrieves data from [{JSON} Placeholder](https://jsonplaceholder.typicode.com/). Below, you'll find information on the key features and functionality of the application.

## Screens/Pages

### 1. Landing Section / Authentication (Login) Page

- For authentication, Google auth providers is provided using [NextAuth](https://next-auth.js.org/).
- Some info about the project has been provided on the Login Page which acts as the landing page.

### 2. Logged-in Pages (Require Authentication)

#### Home Page

- Display a list of all users.
    - Shows the number of albums each user has.

#### User Page

- Show detailed information about a selected user.
  - Displays a list of user's albums.

#### Album Page

- Displays detailed information about a selected album and its photos.

#### Photo Page

- Displays a photo.
  - Allows users to edit the title of the photo.


## Setup Instructions

### Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/muriukialex/SIL-Frontend-Engineer-Assessment.git
    ```

2. Navigate to the project directory:

    ```bash
    cd SIL-Frontend-Engineer-Assessment
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Scripts

- **Build**: Build the project for production.

    ```bash
    npm run build
    ```

- **Development**: Run the project in development mode.

    ```bash
    npm run dev
    ```

- **Format**: Format code using Prettier.

    ```bash
    npm run format
    ```

- **Lint**: Run ESLint to check and fix code style issues.

    ```bash
    npm run lint
    ```

- **Start**: Start the project in production mode.

    ```bash
    npm start
    ```

- **Test**: Run Jest for testing.

    ```bash
    npm test
    ```

### Usage
> Please note that this software was written for assessment purposes only.
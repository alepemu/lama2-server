<div align="center" >
  <img src="public/logo.svg" alt="logo" height="100" style="filter: invert(1);"/>
  <h1>LAMA2 (server)</h1>
</div>

<div align="center" >
  <h4>
    <a href="https://github.com/alepemu/lama2">Documentation</a>
    <span> · </span>
    <a href="https://github.com/alepemu/lama2/issues">Report Bug / Request Feature</a>
  </h4>
</div>

#### LAMA2 is an enhanced version of the original project LAMA (Life Admin Management Advisor) incorporating new features like TypeScript, Redux, AI-powered note generation, drag-and-drop and more.

_This is the server that enables the AI prompt response and stores the data in a MySQL database. Check the <a href="https://github.com/alepemu/lama2">lama2</a> repository to know more._

## 📄 About the Project

### 🛰️ Tech Stack

- Node.js
- Express
- TypeScript
- MySQL
- Sequelize
- OpenAI

### ✨ Main Features

- User signup and login endpoints.
- Notes data fetching, creation, update, deletion and order change.
- Error handling and data validation middlewares.
- OpenAI API integration with later data manipulation.
- Authentication with JWT added.

### 📷 Media

_Check <a href="https://github.com/alepemu/lama2">lama2</a> repository to know and see more._

### 🗝️ Environment Variables

In order to run the project succesfully, please add the next environment variables to your .env file

`MYSQL_HOST` = _Your MySQL host_  
`MYSQL_USER` = _Your MySQL user_  
`MYSQL_PASSWORD` = _Your MySQL password_  
`MYSQL_DATABASE` = \_Your MySQL database name

`OPENAI_API_KEY` = _Your private API key_

`JWT_SECRET` = _A JWT secret_

## 🏁 Getting Started

### ⚙️ Installation (via npm)

Clone the project, change to the project directory and install dependencies

```bash
git clone https://github.com/alepemu/lama2-server.git
cd lama2-server
npm i
```

### 👟 Run Locally

Start the local server

```bash
  npm run dev
```

## 🧭 Roadmap and ideas

- [x] Connet to the front end
- [ ] Enable profiles and authentication
- [ ] Add emails functionality

## 👨‍💻 Contact

Alejandro - [www.alepemu.me](https://www.alepemu.me) - @ apenalvermunita@gmail.com  
Project Link: [https://github.com/alepemu/lama2](https://github.com/alepemu/lama2)

## 💎 Acknowledgements

Useful resources and libraries:

- [LAMA](https://github.com/alepemu/lama)
- [Awesome Readme Template](https://github.com/Louis3797/awesome-readme-template)

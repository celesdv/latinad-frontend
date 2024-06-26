# FrontEnd Challenge - LatinAD

## How to start

Open the console and put the following comands in an empty file.

First copy the repository HTTPS address.

https://github.com/celesdv/latinad-frontend.git

Then we should position ourselves in the directory we want our folder to be downloaded

Next, clone our repository using git clone + the HTTPS address. Type in the Git terminal:
~~~
git clone https://github.com/celesdv/latinad-frontend.git
~~~
A folder will be created, access it by typing the following line in the terminal:
~~~
cd latinad-frontend
~~~
After that, you should install all dependencies for it to work properly running the following command:
~~~
npm install
~~~
Now you simply must enter
~~~
npm run dev
~~~
Then the app should start running smoothly without any issues.


## About this project

The challenge consists of developing a small web application to manage the advertising screens of the LatinAd platform. The application must meet a series of functional and non-functional requirements

#### Functional Requirements:

- List Screens: The application must allow listing advertising screens with pagination and filtering by name and type (indoor/outdoor).
- View Details: It should be possible to view the details of a specific screen.
- Delete Screens: The ability to delete existing screens is required.
- Create New Screens: The application must allow the creation of new screens.
- Edit Screens: Functionality to edit existing screens should be provided.

#### Non-Functional Requirements:

- **Access Control:** A login page with user and password-controlled access is required.
- **Frontend Technology:** The solution must be developed using a frontend framework.
- **Good Development Practices:** The code is expected to follow good development practices, including organization, modularity, and readability.
- **Good Practices with GIT:** The candidate is expected to use GIT properly, including descriptive commits and branching when necessary.
- **Usability and Aesthetics:** The usability and aesthetics of the application are valued, including user experience (UX) and user interface (UI).
- **Performance and Resource Usage:** The application is expected to be efficient in terms of performance and resource usage.
- **Responsiveness:** The application must be responsive and function correctly on desktop and mobile devices.
- **Creativity and Wow Effect:** Creativity and the "wow effect" in the design and functionality of the application are valued.

## Project structure

**Home page:**

The home page consists of a project description and a button with a link located in the header to access the application.


![image](https://github.com/celesdv/latinad-frontend/assets/66212987/138c996b-43e2-4dc7-898a-ed17a63cf676)




**Login page:**

The login page presents a form comprising fields for email and password, for user login.

![image](https://github.com/celesdv/latinad-frontend/assets/66212987/467f2d66-b636-46da-9675-e91253b5b3b6) 



**Display page:**

On the display page, users can see a collection of the display they've created presented in a sliding interface. This interface is designed with pagination to align with the requirements of the backend application. Users have the option to edit or delete each display individually based on their needs. Additionally, users can filter the display by type and name. Furthermore, there's a prominent button available that provides access to the display creation form.

![image](https://github.com/celesdv/latinad-frontend/assets/66212987/b6fc92da-cfd9-4faf-921a-afe4417a2c02) 



**Display form page:**

In this page, there is a form displaying various fields required for creating display. This form serves both for creating and editing display.

![image](https://github.com/celesdv/latinad-frontend/assets/66212987/986c36cb-c204-4cf9-b751-828fac42c219) 

## Responsive

<img src="https://github.com/celesdv/latinad-frontend/assets/66212987/52e0829a-243a-4c86-98f0-d56ee2a57295" width="30%"/>
<img src="https://github.com/celesdv/latinad-frontend/assets/66212987/419851e5-02b5-4233-8905-d570dc55e2ae" width="30%"/>
<img src="https://github.com/celesdv/latinad-frontend/assets/66212987/81a53721-af04-4881-a971-0dc5f21184c1" width="30%"/>


## Link to deploy

https://latinad-frontend.vercel.app/

# Stack

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

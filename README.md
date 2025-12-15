Diet Master - Diet and Meal Planning System

The purpose of the DietMaster is to provide a simple interface for people to record and track their daily diet, calories consumed, and overall nutrition on a regular basis. 
The system is a MERN based application (MongoDB ,Express.js ,Node.js) that helps users to store data and provides near-instant feedback on their dieting performance. The goal of the application is to help users lower the effort to track calories and other important dietary data.
The user should be able to sign-in, add meals, and observe their caloric/macronutrient performance througout the day without any datya being discarded or lost. it should always be available to them instantly.

DietMaster user Roles and their feautures -- 
1. For Regular User-- User get all the feautures they need to  manage their own diet plans.
a.Register and Login-Each individual have their own personal acoount, so their data stays private.
b.Add, Edit, or Delete Meals- User can add meal  or edit their corrections in it or remove entries if they want to do.
c.Set a daily calorie goal- This let user to stay focused on their goals and track their daily target.
2. For Admin--Admin plays small role but have important features to keep the system running smoothly
a.View all users-Admin can view all the accounts which were registered and monitor activity if needed.
b.Delete Inactive Accounts-Accounts which are old or unused will be removed to keep the database clean and efficient.

System Architecture- DietMaster is built using the MERN stack, with each layer handling the specific part of the system.
1.UI (React.js) - The React frontend provides forms and views to enter meals, log calories, and view the Axios handles API calls, and React Router manages page navigation.
2.Services (Node.js + Express.js) - The backend provides API's for meal tracking, nutrition goals, and user accounts. it does save meals, calculate totals, and update user progress.
3.Database (MongoDB + Mongoose) - MongoDB stores user profiles, daily meal entries, and calorie goals. Mongoose ensures clean and structured data models.
User Authentication is secured using token-based(JWT) authentication.

Run application(command)
- cd services
- npm run pro
- Run Test
- cd services
- npm test

References:
https://www.geeksforgeeks.org/reactjs/reactjs-hooks-complete-reference/
https://www.geeksforgeeks.org/reactjs/reactjs-router/
https://www.geeksforgeeks.org/node-js/express-js/
https://www.geeksforgeeks.org/node-js/how-to-implement-jwt-authentication-in-express-js-app/
https://www.geeksforgeeks.org/node-js/mongoose-tutorial/
https://www.geeksforgeeks.org/mern/introduction-to-testing-in-mern/
https://www.geeksforgeeks.org/mongodb/mongodb-tutorial/
https://www.geeksforgeeks.org/web-tech/json-web-token-jwt/

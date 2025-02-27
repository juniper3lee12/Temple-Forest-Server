# Welcome
This application aims to help temples give feedback to their students in meditation classes. Users will learn about different types of meditation practices, record their activities, and receive feedback from staff or teachers. This will help improve their meditation skills and allow them to receive support from experienced meditation teachers.

# Features

<!-- prettier-ignore -->
| **Number** |    **Features** |                                                **Description**                                                 |      
|------------|-----------------|----------------------------------------------------------------------------------------------------------------|
| 1.         |       POST      | This feature allows users to share their experiences through a meditation journal.                             |
|            |                 | This information will be read by staff members, who will provide useful feedback to help improve users' skills.|      
| 2.         |       GET       | This feature allows a teacher to read all information shared by users.                                         |
| 3.         |       DELETE    | The teacher can delete the selected posts.                                                                     |  
| 4.         |       PUT       | The teacher can edit the posts made by students.                                                               |

# Dependencies and how to install them

<!-- prettier-ignore -->
| **Number** |         **Dependencies**        | **How to install**                                                 |   
|------------|---------------------------------|--------------------------------------------------------------------| 
| 1.         | react-navigation                | ```npm install @react-navigation/drawer```                         |   
| 2.         | react-native-gesture-handler    | ```npx expo install react-native-gesture-handler```                |   
| 3.         | react-native-reanimated         | ```npx expo install react-native-reanimated```                     |
| 4.         | react-native-async-storage      | ```npm i @react-native-async-storage/async-storage ```             |
| 5.         | expo-constants                  | ```npx expo install expo-constants  ```                            |
| 6.         | expo-asset                      | ```npx expo install expo-asset```                                  |
| 7.         | ui-kitten                       | ```npm i @ui-kitten/components @eva-design/eva react-native-svg``` |

# Architecture

![Diagram](https://i.ibb.co/swPfFPw/Image.png)

# Components
*** This repository contains only the server-side component.

### Client-side Component

The Expo app provides the user interface, allowing users to interact with the application.

### API Requests

When a user performs an action that requires data from the server (e.g., logging in, fetching data, submitting a post), the Expo app makes HTTP requests to the Express server.

### Express Server

The Express server defines various API endpoints that the Expo app can interact with. These endpoints handle HTTP requests such as GET, POST, PUT, and DELETE.
The server processes these requests, and interacts with the database to fetch or store data. After processing the request, the server sends the appropriate response back to the Expo app.

### MySQL Database

It stores all the persistent data, such as users information including email and encripted password, dates, goal, and all the inputs received from client-side component. The Express server communicates with the database after processing the request, the Express server sends the response back to the Expo app and update the client-side component.

# Getting help, giving feedback, and report issues

We value your feedback and want to ensure the best experience possible. If you encounter any issues or have suggestions for improvement, please contact me using the email provided in the Swagger documentation (N11164891@qut.edu.au).

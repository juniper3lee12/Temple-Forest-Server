# Welcome

This application aims to help facilitate members who want to integrate meditation into their daily lives. The meditation centre may find this application useful for them as it can help improve communication with members of the centre. Users will be learning about different types of meditation practices, record their activities, and receive feedback from masters. This will help improve their meditation skills by allowing them to communicate with and receive support from experienced meditation masters.

# How to contribute

Help us by cloning this repository from GitHub, use it, and communicate with masters. If any feature needs improvement, please do not hesitate to post it in your meditation journal. This is how we can receive your feedback.

# Features

<!-- prettier-ignore -->
| **Number** |    **Features** |                                                **Description**                                               |      
|------------|-----------------|--------------------------------------------------------------------------------------------------------------|
| 1.         |       POST      | This feature allows users to share their experiences through a meditation journal.                           |
|            |                 | This information will be read by masters, who will and provide useful feedback to help improve users' skills.|      
| 2.         |       GET       | This feature allows a master to read and obtain all information shared by users.                             |
|            |                 | The users who begin practicing meditation can view the feedback provided by masters in different scenarios,  |
|            |                 | both for themselves and other members.                                                                       |    
| 3.         |      DELETE     | Masters and registered members can delete the posts if they are too old or not useful.                       |      
| 4.         |       PUT       | Masters and registered members can edit the posts they have made.                                            |

# Dependencies and how to install them

More than 20 dependencies have been installed in this application. The following are just the key third-party libraries. Find all information from `licenses.json`file. However, please note not that all dependencies in `licenses.json`file were used in the project. Some of them were installed for testing, and end up with not using them.

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

## Components

### Client-side Component

The Expo app provides the user interface and user experience, allowing users to interact with the application.

### API Requests

When a user performs an action that requires data from the server (e.g., logging in, fetching data, submitting a post), the Expo app makes HTTP requests to the Express server.

### Express Server

The Express server defines various API endpoints that the Expo app can interact with. These endpoints handle HTTP requests such as GET, POST, PUT, and DELETE.
The server processes the requests, executes, and interacts with the database to fetch or store data. After processing the request, the server sends the appropriate response back to the Expo app.

### MySQL Database

It stores all the persistent data, such as users information including email and encripted password, dates, goal, and all the inputs received from client-side component. The Express server communicates with the database after processing the request, the Express server sends the response back to the Expo app and update the client-side component.

# Getting help, giving feedback, and report issues

We value your feedback and want to ensure the best experience possible. If you encounter any issues or have suggestions for improvement, please contact me using the email provided in theSwagger documentation (N11164891@qut.edu.au).

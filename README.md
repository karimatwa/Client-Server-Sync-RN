# Client-Server-Sync-RN

The purpose of this project is keeping events on both the server and mobile side consistent and synchronized.

The app from the mobile sends 3 requests; the first one is large and takes 5 seconds to process, change a value in a database server and return it in the request response.
The second and third are small ones that take only take 1 second and they also update values in the database and return it in the request response.
The requests are handled in order and in sequence while maintaining an accurate representation of the data, in the database server, on the mobile application.

Front-end developed in React Native.
Back-end consists of one MySQL server (Amazon RDS for MySQL) that has one database 'Task' and one table 'Via'.
It also consists of 3 lambda functions developed in NodeJS that use npm and mysql package for mysql queries.
1) numberLarge: simulate a large load of 5 seconds then the server handles the request; Read the existing value from the table,
add 100 to it, then set the value in the database field and return it in the request.
2) numberSmall: simulate a load of 1 second then the server handles the request; Read the existing value from the table,
add 25 to it, then set the value in the database field and return it in the request.
3) resetNumber: Set the value in table Via to 0 and return the value in the request.
Files located in ../backend.

The three lambda functions are called using a REST API deployed using API Gateway under 3 resources.
first resource '/' invokes the resetNumber method.
second resource '/numberlarge' invokes numberLarge method.
third resource '/numbersmall' invokes numberSmall method.
Link located in ../utils/config.json

The client screen sends requests using Axios and synchronization between the server and the front-end side is handled through
the use of states and by using async/await requests to the server.

Hooks used: 
useMemo
useReducer

Front-end:
NavigationContainer
StackNavigator
Axios
Custom button
Spinner

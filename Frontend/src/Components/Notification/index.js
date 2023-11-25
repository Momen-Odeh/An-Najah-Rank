// import React, { useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const App = () => {
//   const [notifications, setNotifications] = useState([]);

// socket.on("notification", (notification) => {
//   setNotifications([...notifications, notification]);
// });

//   const handleAdd = () => {
//   socket.emit("add_user");
//   };

//   return (
//     <div>
//       <button onClick={handleAdd}>Add</button>

//       {notifications.map((notification) => (
//         <div>
//           <h3>{notification.title}</h3>
//           <p>{notification.body}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;

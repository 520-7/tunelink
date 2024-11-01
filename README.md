# 🎵 Tunelink – React Native

Welcome to the **Music Sharing App**! This app, built with React Native, allows users to share, explore, and interact with music-centric posts in a social media format, much like Instagram but dedicated to music lovers. This guide will walk you through the setup and usage of the application.

---

## 🚀 Getting Started  

Follow the steps below to install and run the app locally on your device.

### 1. Prerequisites  
- **Node.js** installed on your machine  
- **npm** (comes with Node.js)  
- **Expo Go** app installed on your mobile device ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))  
- A smartphone with a camera to scan the QR code  

### 2. Clone the Repository  

git clone https://github.com/520-7/tunelink-frontend
cd tunelink-frontend


### 3. Install dependencies

Before running the application, you need to install the required dependencies. The application uses **npm** (Node Package Manager) to manage these dependencies. 


1. **Open a Terminal/Command Prompt**  
   Navigate to the root directory of the cloned repository where the `package.json` file is located.

2. **Run the Installation Command**  
   Execute the following command to install all the necessary packages:

   ```bash
   🌟 npm install 🌟

### 4. Run application
npm start



### Routing Commit Notes: connecting the frontend to the backend

- what was done
   - used try catch, async await fetch calls to the server
   - utilized local IP, changed backend to accept local IP rather than just localhost
   - changed navigation such that when a new screen is entered, the user that signed up's mongoDB _id is passed. Each screen then fetches the data from the database based on _id
   - only implemented fetch calls in the signup screen, onboarding screen, and profile screen. Feed screen and make post screen has _id available but no fetch calls have been made to retrieve posts and add posts yet.
      - within the profile, used useState and useEffect to handle repeated updates to a userId. Updates user info each render

- what still needs to be done
   - implement fetch calls for posts in feed and upload post screens
   - login screen. Only implemented for sign up screen, make sure _id is routed over from the login screen to other screens
      - change login var in RootStackParamList.ts to account for this
   - Right now you have to copy paste your local ip into every single fetch call. Need to implement environment variable to handle this
   

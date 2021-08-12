# Twitch Clone App

This is a much simplified version of Twitch made with React, but includes all the functionalities such as authentication and streaming system.
Users can login with their Google account (through Google OAuth API), view a stream, and create/edit/delete a stream that will have their Google userId tied to the stream. The backend side of this project was made using the json-server package, and streaming with OBS Studio. Styling was done through Semantic UI classes.

The flow of the app is as such:

1. A person streams from their computer using OBS Studio, which is fed into the Real Time Messaging Protocal (RTMP) Server on port 1935
2. The RTMP makes this info available on port 8000
3. The web server (through json-server) keeps track of all streams (json-server set to run on port 3001)
4. Users running the app can view the streams, and manage the ones they created with admin access.

For the purposes of this project, it only runs on local server.

## Packages Used

client subdirectory:

- Redux
- Redux Thunk
- React Final Form
- React Router
- Axios
- flv.js

rtmpserver subdirectory:

- Node Media Server

api subdirectory:

- JSON Server

## Get Started

_Remember to run `npm install` for all three subdirectories to get everything downloaded!_

Run `npm start` for all three subdirectories and view the browser at [http://localhost:3000](http://localhost:3000)

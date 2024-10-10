# spotify-helper

The purpose of this project was to get some experience building something in AWS with the CDK, and to refresh my frontend skills. 

In my day job I work mainly on a large backend Java project. So this is part of my attempt to fill in some technical gaps, and add some bredth to my experience.
 
## Architecture Summary: 
I used the CDK to make an API backed by lambda functions for the frontend to call.
On the frontend I used react. It started as a create-react-app, which I had to transition to vite after some dependecies were no longer working.

Simply put: React app <-> API Gateway <-> lambdas <-> Spotify API

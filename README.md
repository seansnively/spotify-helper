# spotify-helper

The purpose of this project was to get some experience building something in AWS with the CDK, and to refresh my frontend skills. 

In my day job I work mainly on a large backend Java project. So this is part of my attempt to fill in some technical gaps, and add some breadth to my experience.
 
## Architecture Summary: 
I used the CDK to make an API backed by lambda functions for the frontend to call.
On the frontend I used react. It started as a create-react-app, which I had to transition to vite after some dependencies were no longer working.

Simply put: React app <-> API Gateway <-> lambdas <-> Spotify API


## Deployment process:
Before I start, this is currently kind of manual, and could certainly use some improvement.

1. Within /spotify-helper-cdk, run: `cdk deploy --profile YOUR_ACCOUNT_HERE --require-approval never`

That should get the api and lambdas up and running. 

2. Take the API gateway output from that and set the environment variable `VITE_TOP_TRACKS_URL`

3. Now set `VITE_REDIRECT_AFTER_LOGIN_URL` to your desired URL. `http://localhost:3000` works for local. For me I use an S3 bucket static website url.

4. Set the `VITE_CLIENT_ID` from your app in the spotify developer dashboard. (See references for setting this up).

5. If running locally, run `npm run start`. If uploading to S3, run `npm run build`

The rest is S3 or web hosting set up. I'll give the S3 steps since that's what I did.

6. Take everything in the dist folder and upload it to an S3 bucket.
7. Make sure no public access is blocked, the bucket policy lets anyone get any object from the bucket, etc. There's lots of resources out there on this. Click the static web host URL and that should be it.


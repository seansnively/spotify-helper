# spotify-helper

The purpose of this project was to get some experience building something in AWS with the CDK, and to refresh my frontend skills. 

In my day job I work mainly on a large backend Java project. So this is part of my attempt to fill in some technical gaps, and add some breadth to my experience.

If you know me, and would like to try it out, send me your email address so I can add you to the Spotify API allow list. I can then send you a link.
 
## Architecture Summary: 
I used the CDK to make an API backed by lambda functions for the frontend to call.
On the frontend I used react. It started as a create-react-app, which I had to transition to vite after some dependencies were no longer working.

Simply put: React app <-> API Gateway <-> lambdas <-> Spotify API

## Demo:
Google drive video link to watch a demo from a phone: https://drive.google.com/file/d/1ImT71ys2zBZismQW0iB_YWoEbPWasJWN/view?usp=sharing

Preview:

<img src="https://github.com/user-attachments/assets/35e0f23f-2262-4d63-9f37-d4cc0cd73029" width="200">
<img src="https://github.com/user-attachments/assets/d7c6a33f-b180-4ac9-9efd-1316c0533ca4" width="200">


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


### References:

CDK setup: https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

CDK tutorial I started with: https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html

CDK workshop: https://catalog.us-east-1.prod.workshops.aws/workshops/10141411-0192-4021-afa8-2436f3c66bd8/en-US/2000-typescript-workshop

Migrating CRA to Vite: https://semaphoreci.com/blog/vite

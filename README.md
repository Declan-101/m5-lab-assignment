# Module 5 Lab Assignment — Declan Wilde

Shop to React, WEB 403 Advanced Full Stack Web Development.

## Week 3 (commit #3)

Adds checkout navigation, the Sign In card with a required name/email classroom form and Facebook login, and the Check Out greeting with the Facebook profile photo. The empty cart shows its current quantity and Continue Shop; checkout is only available for a nonempty cart. Existing quantity controls, product images, modal and ratings remain available.

## Run

From `shopcart`, run `npm install`, then `npm start`. The classroom form works without a Facebook account. It is a classroom demonstration, not password authentication or a payment system. Cart and profile state reset on a page refresh.

For Facebook login, copy `.env.example` to `.env.local` and set your public Meta App ID. Never place an app secret or access token in client files. Enable JavaScript SDK login and allow your host in the Meta app settings. Development apps can be tested by their permitted app roles. Use HTTPS, for example `HTTPS=true npm start` with a locally trusted development certificate. CRA also accepts `SSL_CRT_FILE` and `SSL_KEY_FILE` in `.env.local` for your certificate paths. Restart after editing environment variables.

The SDK explicitly uses the standard Facebook popup rather than Chrome FedCM because the FedCM localhost flow failed during verification. Only public_profile is requested. The app keeps the name/photo in memory and does not display or persist access tokens.

## Check

`CI=true npm test -- --watchAll=false --runInBand`

`npm run build`

Tests cover the empty cart, form sign-in, successful and cancelled Facebook callbacks, and guarding direct checkout URLs. Mocked Facebook tests do not replace an actual Facebook account approval check.

## Submission

Submit this repository URL for Week 3 Day 3 Lab Assignment:
https://github.com/Declan-101/m5-lab-assignment

Part 2's portfolio shell is a separate project and is not due for submission today.

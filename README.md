# Set a simple session cookie

## What this is

This repo contains a reference app which demonstrates a simple but common use case: using cookies to tie requests together into a single session. 

To use this repo, follow the installation instructions, then take a look at the How this works section for background information.

## Installation

The reference app requires a recent version of Node.

To install and start the app, run these commands:

```
npm install
npm run start
```

## How this works

HTTP is a stateless protocol, meaning that requests are not associated with each other. When you reload a page in your browser, the server will give you a fresh copy of the requested page. It will have no notion that you are a returning user, unless some kind of data is persisted. 

How can we persist data between requests?

Traditionally, the most common way to persist a session between browser and server is to use a **Session Cookie**.





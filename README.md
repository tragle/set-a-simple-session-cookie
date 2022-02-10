# Setting a simple session cookie

This repo contains a reference app which demonstrates a simple but common use case: using cookies to tie requests together into a single session. 

To use this repo, follow the installation instructions, then take a look at the How this works section for background information.

## How this works

HTTP is a stateless protocol, meaning that individual requests have no relationship with each other. When you reload a page in your browser, the server will give you a fresh copy of the requested page. It will not consider you a returning user, unless some kind of data is persisted. 

How can we persist data between requests?

Traditionally, the most common way to persist a session between browser and server is to use a **session cookie**.

### Session cookies

A cookie is a piece of data stored in the browser, usually associated with a particular domain. We can see examples of cookies in our browser inspector:

![](wordle_cookies.png?raw=true)

Note the Domain field, which tells the browser which site(s) to use this cookie for, and the Expires field, which tells the browser when to discard the cookie. (If Expires is not specified, the browser discards the cookie after the browser session ends.)

If we access the cookie via Javascript, it appears to be a single string.

```
> console.log(document.cookie)
_ga_2SSGMHY3NP=GS1.1.1644432444.1.0.1644432444.0; _ga=GA1.1.1461926597.1644432445
```

The spec defines a syntax for serializing data in the string, which the browser parses out as key-value pairs. The word "cookie" usually refers to one of these key-value pairs, as opposed to the serialization of all of them.

In this case we have two keys prefixed by something cryptically called "\_ga." They are set by the Google Analytics server. We can see what these keys represent in the Google Analytics documentation.

![](ga_cookie_names.png?raw=true)

Google Analytics sets these cookies so it can identify me as a user, and can identify the current session. 

### Setting session cookies

How do servers set cookies in the browser? The most direct way is to use the `SET-COOKIE` header.

When we request a resource from a web server, the server responds with a status code, header data, and the resource (if allowed). 

The `SET-COOKIE` response header tells the browser to set one or more cookies for this domain. 

**Response Header**
```
HTTP/2 200 OK
content-type: text/html;charset=UTF-8
date: Thu, 10 Feb 2022 01:00:37 GMT
set-cookie: session-id=132-7574748-1496550; Domain=.amazon.com; Expires=Fri, 10-Feb-2023 01:00:37 GMT; Path=/; Secure
set-cookie: session-id-time=2082787201l; Domain=.amazon.com; Expires=Fri, 10-Feb-2023 01:00:37 GMT; Path=/; Secure
set-cookie: i18n-prefs=USD; Domain=.amazon.com; Expires=Fri, 10-Feb-2023 01:00:37 GMT; Path=/
set-cookie: skin=noskin; path=/; domain=.amazon.com
cache-control: no-cache
...
```

Here the server sets a secret session id and several other cookies.

The browser will now send these cookies back to the server each time it makes a request to that domain. Because only the browser and the server know the secret session id, the server can tie requests to a particular browser. 

The browser serializes the cookies into a single string and includes them in a `Cookie` header on each request.

**Request Header**
```
GET / HTTP/2
Host: www.amazon.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Cookie: session-id=132-7574748-1496550; session-id-time=2082787201l; i18n-prefs=USD; skin=noskin;
...
```

## Using the app

### Installation

The reference app requires a recent version of Node.

To install and start the app, run these commands:

```
npm install
npm run start
```

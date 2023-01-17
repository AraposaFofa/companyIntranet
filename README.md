# companyIntranet

###### First of all ######
You should be able to understand english before reading this. Why did I write this in english?
Well, the reasons are pretty simple and I will try to tell as briefly as I can.

1. You should be able to speak english, read, write or understand to work in the IT/Web/Server 
Admin/Network/Pentesting/ or any other field that speaks directly with the information tech.
Most of the books, docs and protocols (like RFCs) and programming languages are english based.

2. It's easier to understand english. Well, atleast the variables names are more self 
descriptive.

3. You will be able to train your english with this. Yeah, I know, it's hard to read, write 
and speak a language that you do not use normally. Well, ~~I really do not care~~, you will need
it in the future (trust me).

4. I find it cuter and more beautiful than portuguese and I won't say anything else.

**_good luck!_**

###### End of my comments #######

***

## Overview

The WebApp basically is basically a application for company users to act like a browser home page. It's built in NodeJS and Raw JavaScript Providing Static Files by an Apache (I'm planning on changing to NgineX) Reverse Proxy. ~~Yeah, it really is just that~~. 

First, users are supposed to access the WebApp writing the server **hostname** or **IP Address** on the URL search engine of the browser. Then, they are supposed to print and send an e-mail with this print to another email (ponto@eletricca.com.br).
Or press a button to send an e-mail and log this on the server or in another log. We will log it on the server, anyway.
**See Fix Section for more details**

Second, users are able to see all of the exsting extensions, put bookmarked pages and send an log e-email trough this WebApp. It is supposed to be a catch all applications on a single page. 

It is built using NodeJS. All of the backend will and must be built using JavaScript language, because we need a easy, simple and powerfull language. Another reason is because we need to train and get used to using JS on backend side. 

That said, we use ExpressJS for handling GET, POST and others requests, we make it listen on one port than we use apache to redirect all traffic that comes on port 80 to this port **as a proxy**. I'm thinking of using ngineX, but for now is just a thought.

## 

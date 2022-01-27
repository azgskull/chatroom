# chatroom
Chatroom with websocket and custom state

https://azg-chatroom-websocket.herokuapp.com/


---
**NOTE**

**This is just a test app !**

---

# Run in local

Open two consoles for each commande:

```cmd
yarn start server:dev
```

```cmd
yarn start client:dev
```

# Run in production

You need to build react, and use server to serve the front and the api (not an ideal solution just for heroku)

```cmd
yarn heroku-postbuild
```

```cmd
yarn start
```

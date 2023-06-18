# Requirements

Install the following and run Mongodb in the background.

> Nodejs
> Mongodb

Now rename env files from .env.example to .env

# Terminal Commands

```shell
    cd client
    mv .env.example .env
    cd ..
    cd server
    mv .env.example .env
    cd ..
```

Install the dependencies. Don't forget to install 'yarn'.

```shell
    cd server
    yarn
    cd ..
    cd client
    yarn
```

Make sure to open your MongoDB Compass or as long as MongoDB is running.

For Frontend.

```shell
    cd client
    yarn start
```

While waiting, open another terminal to start the back-end.

For Backend.

```shell
    cd server
    yarn start
```

It will automatically lead you to the initial link.
If not, proceed to localhost:3000 in your browser.

You can also refresh your Database in MongoDB Compass to see if the chat_app database appeared in the list of databases on the left panel.

Make a limitless accounts and start CHATTING!!!

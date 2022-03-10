If you want to add a `onMessage` function you need to follow this easy steps

First, we need to make an export of our function, like so

```javascript
module.exports = {
    functionName: function (var1, var2) {
        const userMessage = message.cleanContent.toLowerCase();
        /* . . . */
    },
};
```

Then, in `index.js`, we need to add our function in the following block code

```javascript
client.on('messageCreate', async message => {
    if (message.author.id === '896039839076585472') return;
    /* . . . */
    onMessageFunctions.fileName.functionName(var1, var2);
});
```

And that's it.

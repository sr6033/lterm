		          __       ________   _______   _____   _     _    __
                    |  |     |__    __| |   ____| |  _  | | \   / |   \ \           
                    |  |        |  |    |  |__    | |_| | |  \_/  |    \ \          
                    |  |      o |  |    |     |   |   __| |   _   |     \ \         
                    |  |      o |  |    |   __|   |   \   |  | |  |     / /         
                    |  |____  o |  |    |  |____  |    \  |  | |  |    / / ____   
                    |_______| o |__|    |_______| |__|\_\ |__| |__|   /_/ |____|  

# lterm: Online bash terminal(emulator) tutorial

Check out the site live at  -->  [![lterm](https://img.shields.io/badge/webiste-live-brightgreen.svg?style=flat-square)](https://sr6033.github.io/lterm/)	[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/lterm/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

**lterm** is an online **Terminal Eminulator**. It is a step by step tutorial that will teach you the **bash** commands by making you execute them. 

*Nothing is better than learning by doing.*

It is fully online and doesn't require any extra shitty access. Being an emulator, it only virtualizes a terminal environment and so the commands executed doesn't effect either the server or your local machine. 

### List of commands available presently

- `echo`
- `pwd`
- `ls`
- `cd`
- `cd..`
- `cat`
- `clear`
- `touch`
- `cp`/`mv`
- `mkdir`

### Contributing 

- Developers who want to contribute, [![fork](https://img.shields.io/badge/style-0-green.svg?style=social&label=Fork&link=https://github.com/sr6033/lterm/fork&link=https://github.com/sr6033/lterm/network)](https://github.com/sr6033/lterm/fork) this repo and edit the file **<a href="https://github.com/sr6033/lterm/blob/master/js/main.js">main.js</a>** to add your commands. 
- You don't have to worry about any other files or programs.

---

- If a **command** doesn't need further steps:

```
// without argument
ls: function() {
        this.echo('This is the ls command\n');
}
```

```
// with argument
echo: function(arg1) {
        this.echo('This is the echo command' + arg1 + '\n');
}
```

- If a **command** needs further steps:

```
cd: function(arg1) {
	this.push(function(cmd, term) {
                if(cmd == 'another_command')
                    this.echo('another_command');
		}, {
                    prompt: '[[b;#44D544;]lterm@localhost/' + arg1 + ':~$] ',
                   }
        );
}
```

---

- On addition of a new **command**, increase the size of `arr` array. This array acts like a counter to check if a **task/command** is completed or not.
- If you face any problem or cannot understand anything, open up an **issue**.
- You can also edit the **readme** and make it more user friendly to help out new contributers.

> Note: Kindly have interpretable & good commit messages. Don't assume me to be some **Jedi** with powers to be able to make out every commit with a single word as message.
*May the Force be with you.*

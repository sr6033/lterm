// Add more commands as shown. Don't mess where the DANGER is high.

jQuery(document).ready(function($) 
{
    var id = 1;
    var arr = [0,0,0,0,0,0,0,0,0,0];// Keeps track of different commands(i.e., if they are completed or not)
                                    // 0 -> not completed
                                    // 1 -> completed 
                                    // added 1 more position
    var task = ['[[b;#ff3300;]Not Completed]', '[[b;#44D544;]Completed]'];  // To print the task status

    $('body').terminal({
        help: function() {

            // Add the new commands to this list also.

            this.echo('\nList of commands available:');
            this.echo('===========================\n');
            this.echo('> [[b;#44D544;]about]');
            this.echo('> [[b;#44D544;]contribute]');
            this.echo('> echo ----------- ' + task[arr[0]]);
            this.echo('> pwd ------------ ' + task[arr[1]]);
            this.echo('> ls ------------- ' + task[arr[2]]);
            this.echo('> cd ------------- ' + task[arr[3]]);
            this.echo('> cat ------------ ' + task[arr[4]]);
            this.echo('> touch ---------- ' + task[arr[5]]);
            this.echo('> cp ------------- ' + task[arr[6]]);
            this.echo('> rm ------------- ' + task[arr[7]]);
            this.echo('> mkdir ---------- ' + task[arr[8]]);
            this.echo('> clear -----------' + task[arr[9]]);
            this.echo('> ipconfig -----------' + task[arr[10]]);
            this.echo('\n');
        },
        echo: function(arg1) {
            arr[0] = 1;
            this.echo(arg1 + '\n');
            this.echo('> The [[b;#ff3300;]echo] command prints back your arguments.');
            this.echo('> Type [[b;#ff3300;]help] and check your first task is completed.');
            this.echo('> Now type [[b;#ff3300;]pwd] to continue.');
        },
        //rpc: 'some_file.php',
        pwd: function() {
            arr[1] = 1;
            this.echo('/home/lterm\n');
            this.echo('> Everything in Linux is a file. Every file is organized in a hierarchical directory tree.\n' +
                '> The first directory in the filesystem is aptly named the root directory.\n' +
                '> To see where you are, you can use the [[b;#ff3300;]pwd] command, this command means “print working directory”\n' +
                'and it just shows you which directory you are in, note the path stems from the root directory.');
            this.echo('> Now type [[b;#ff3300;]ls] to continue.');
        },
        ls: function() {  
            arr[2] = 1;  
            this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n[[b;#44D544;]hello.txt]\n');
            this.echo('> The ls command will list directories and files in the current directory by default,\n' +
            'however you can specify which path you want to list the directories of.');
            this.echo('> Now type [[b;#ff3300;]cd Documents] to continue.');
        },
        cd: function(arg1) {

            // to add wrong directory error 

            this.echo("> cd stands for Change Directory. You just changed your directory.");
            this.echo("> You can check your present directory by typing [[b;#ff3300;]pwd]."); 
            this.echo("> To return back to the [[b;#44D544;]previous directory] you should type [[b;#ff3300;]cd ..].") //
            this.echo("> To return back to the [[b;#44D544;]home] directory you should type [[b;#ff3300;]cd ~].")
            this.push(function(cmd, term) {
                if(cmd == 'pwd')
                    this.echo('/home/lterm/' + arg1);
                else
                if(cmd == 'cd ..')
                {
                    
                    this.echo('you will get something like -> /home/lterm/ since you were on /home/lterm/Documents'  );
                    this.echo('Type [[b;#ff3300;]cd ~] to continue');
                    this.echo('Type [[b;#ff3300;]exit] to exit [[b;#ff3300;]cd] command and then [[b;#ff3300;]cat hello.txt] to continue.');
1
                }
                else if(cmd == 'cd ~')
                {
                    arr[3] = 1;
                    this.echo('Type [[b;#ff3300;]cd ..] to continue');
                    this.echo('Type [[b;#ff3300;]exit] to exit [[b;#ff3300;]cd] command and then [[b;#ff3300;]cat hello.txt] to continue.');
                }
                else
                    this.echo('[[b;#ff3300;]Wrong step commands. Type the exact commands requested.]\n');
                  }, {
                    prompt: '[[b;#44D544;]lterm@localhost/' + arg1 + ':~$] ',
                    }
            );
        },


        cat: function(arg1) {
            if(arg1 !== 'hello.txt')
            {
                this.echo('[[b;#ff3300;]Wrong commands.] Type the [[b;#ff3300;]cat hello.txt] to continue.\n');
            }
            else
            {    
                arr[4] = 1;
                this.echo('[[b;#44D544;]Hey there newbie!\nHaving fun? I hope so.\n\n');
                this.echo('> The [[b;#ff3300;]cat] command displays the contents of the file.');
                this.echo('> Now type [[b;#ff3300;]touch filename.xyz] to continue.')
            }
        },
        touch: function(arg1) {
            this.echo('> [[b;#ff3300;]touch] allows you to the create new empty files. Type [[b;#ff3300;]ls] to see the new file created.');
            this.push(function(cmd, term) {
                if(cmd == 'ls')
                {
                    arr[5] = 1;
                    this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n[[b;#44D544;]hello.txt]\n' + '[[b;#44D544;]' + arg1 + ']');
                    this.echo('> Now type [[b;#ff3300;]exit] and then [[b;#ff3300;]cp hello.txt Documents] to continue.');
                }
                else
                    this.echo('[[b;#ff3300;]Wrong step commands. Type the exact commands requested.]\n');
                }, {
                    prompt: '[[b;#44D544;]lterm@localhost:~$] ',
                }
            );
        },
        cp: function(arg1, arg2) {
            if(arg1 !== 'hello.txt')
            {
                this.echo('[[b;#ff3300;]Wrong commands. Type the exact commands requested.]\n');
            }
            else
            if(arg2 !== 'Documents')
            {
                this.echo('[[b;#ff3300;]Wrong commands. Type the exact commands requested.]\n');
            }
            else
            {
                this.echo('> The [[b;#ff3300;]cp] command copies your file to the given location.');
                this.echo('> Now Type [[b;#ff3300;]ls] to see your file copied.')
                this.push(function(cmd, term) {
                    if(cmd == 'ls')
                    {
                        arr[6] = 1;
                        this.echo('[[b;#44D544;]' + arg1 + ']\n');
                        this.echo('> The [[b;#ff3300;]mv] command in the same way, moves/cut your file to the given location.');
                        this.echo('> Type [[b;#ff3300;]exit] and then [[b;#ff3300;]rm hello.txt] to continue.');
                    }
                    else
                        this.echo('[[b;#ff3300;]Wrong step commands. Type the exact commands requested.]\n');
                    }, {
                        prompt: '[[b;#44D544;]lterm@localhost/Documents:~$] ',
                    }
                );
            }
        },
        rm: function(arg1) {
            this.echo('> The rm (remove) command is used to delete files and directories.');
            this.echo('> Type [[b;#ff3300;]ls] to see the file deleted.');
            this.push(function(cmd, term) {
                if(cmd == 'ls')
                {
                    arr[7] = 1;
                    this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n[[b;#44D544;]hello.txt]\n');
                    this.echo('> Now type [[b;#ff3300;]exit] and then [[b;#ff3300;]mkdir directory_name] to continue');
                }
                else
                    this.echo('[[b;#ff3300;]Wrong step commands. Type the exact commands requested.]\n');
            });
        },
        mkdir: function(arg1) {
            this.echo('> The mkdir command (Make Directory) creates a directory if it doesn’t already exist.');
            this.echo('> Type [[b;#ff3300;]ls] to see the new directory created.');
            this.push(function(cmd, term) {
                if(cmd == 'ls')
                {
                    arr[8] = 1;
                    this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n' + arg1 + '[[b;#44D544;]hello.txt]\n');
                    this.echo('Type [[b;#ff3300;]exit] to move back to [[b;#44D544;]home] and then type [[b;#ff3300;]Clear](Upper C) to continue');
                }
                else
                    this.echo('[[b;#ff3300;]Wrong step commands. Type the exact commands requested.]\n');
            });
        },
        Clear: function() {
            this.echo('> The clear(lower C) command, clears your terminal screen');
            this.echo('> Type [[b;#ff3300;]clear] to clean your terminal');
            this.push(function(cmd,term) {
                if(cmd == 'clear' || cmd == 'Clear') //Changed here
                {
                    arr[9]=1;          
                }
                else 
                    this.echo('[[b;#ff3300;]Wrong step commands. Type the exact commands requested.]\n');
            });
        },

        calc: {
            add: function(a, b) {
                this.echo(a+b);
            },
            sub: function(a, b) {
                this.echo(a-b);
            }
        },
        ipconfig: function(arg1) {
            arr[10] = 1;
            this.echo(arg1 + '\n');
            this.echo('> The [[b;#ff3300;]ipconfig] command prints back your arguments.');
            this.echo('> Type [[b;#ff3300;]help] and check your first task is completed.');
            this.echo('> Now type [[b;#ff3300;]pwd] to continue.');
        },
        
        
        
        contribute: function() {
            this.echo('\n> Hey new developer! Want to join in and add some more fun?');
            this.echo('> Why wait then? Fork this repo and pull in.');
            this.echo('> Link: <https://github.com/sr6033/lterm>\n');
        },
        about: function() {
            this.echo('> Hey [[b;#44D544;]netizen], welcome to my [[b;#ff3300;]Terminal Emulator]. I hope you have fun learning the [[b;#44D544;]bash] commands.\n');
            this.echo("> I'm [[b;#44D544;]Shubham Rath], a computer science undergrad at IIIT-bh.");
            this.echo("> If you wish to know more then head over to my [[b;#ff3300;]blog: The Roving Cosmonaut] <http://sr6033.github.io/>");
        },
    }, {
        
        // DANGER: high
        // Don't mess with this part or else all HELL will fall loose.

    	prompt:"[[b;#44D544;]lterm@localhost:~$] ",
        greetings: "____      ________   _______   _____   _     _    __            \n" +
                   "|  |     |__    __| |   ____| |  _  | | \\   / |   \\ \\           \n" +
                   "|  |        |  |    |  |__    | |_| | |  \\_/  |    \\ \\          \n" + 
                   "|  |      o |  |    |     |   |   __| |   _   |     \\ \\         \n" +
                   "|  |      o |  |    |   __|   |   \\   |  | |  |     / /         \n" +
                   "|  |____  o |  |    |  |____  |    \\  |  | |  |    / / ____   \n" +
                   "|_______| o |__|    |_______| |__|\\_\\ |__| |__|   /_/ |____|  \n" +
                   " _____________________________________________\n" +
                  "|_____________________________________________|\n" +
                   "      All rights reserved © Shubham Rath\n\n" +
                   "The world is your oyster, or really the shell is your oyster. \n\nWhat is the [[b;#44D544;]shell]?\n" +
                   "> The shell is basically a program that takes your commands from the keyboard and sends them to the operating system to perform.\n" +
                   "> The [[b;#44D544;]Terminal] is a program that launches a shell for you.\n" +
                   "> Type [[b;#ff3300;]help] to see the list of [[b;#44D544;]commands/tasks].\n\n" +
                   '> Start with [[b;#ff3300;]echo "any string"].\n',
        onBlur: function() {
            // prevent loosing focus
            return false;
        }       
    });
});

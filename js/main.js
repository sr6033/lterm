// Add more commands as shown. Don't mess where the DANGER is high.

jQuery(document).ready(function($) 
{
    var id = 1;
    var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];// Keeps track of different commands(i.e., if they are completed or not)
                                    // 0 -> not completed
                                    // 1 -> completed 
                                    // added 1 more position
    
    var task = ['[[b;#ff3300;]Not Completed]', '[[b;#44D544;]Completed]'];  // To print the task status
    
    var pwdv = ["/home/lterm"]  // To print pwd 
    var f = 0;  // Required for sub folders
    var fol = ["Documents", "Downloads", "Music", "Pictures", "Videos", "hello.txt"];   // Folders
    var sfol = [];  // Sub folders
    sfol[0] = [];
    sfol[1] = [];
    sfol[2] = [];
    sfol[3] = [];
    sfol[4] = [];
    sfol[5] = [];
    
    //End

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
            this.echo('> clear ---------- ' + task[arr[9]]);
            this.echo('> uname ---------- ' + task[arr[10]]);
            this.echo('> date  ---------- ' + task[arr[11]]);
            this.echo('> ipconfig ------- ' + task[arr[12]]);
            this.echo('> tty ------------ ' + task[arr[13]]);
            this.echo('> nano ----------- ' + task[arr[14]]);
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
            if(f==0) { this.echo(pwdv[0] + "\n"); }
            else { this.echo(pwdv[0] + '/' + pwdv[1] + "\n"); }
            
            this.echo('> Everything in Linux is a file. Every file is organized in a hierarchical directory tree.\n' +
                '> The first directory in the filesystem is aptly named the root directory.\n' +
                '> To see where you are, you can use the [[b;#ff3300;]pwd] command, this command means “print working directory”\n' +
                'and it just shows you which directory you are in, note the path stems from the root directory.');
            this.echo('> Now type [[b;#ff3300;]ls] to continue.');
        },
        ls: function() {  
            arr[2] = 1; 
            if(pwdv[1]==undefined) {
                for (i=0; i<fol.length; i++) {
                this.echo(fol[i] + "    ")
                }
            }
            else {
                for (i=0; i<sfol[f-1].length; i++) {
                this.echo(sfol[f-1][i] + "    ")
                }
            }
            
            //this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n[[b;#44D544;]hello.txt]\n');
            
            this.echo('> The [[b;#ff3300;]ls] command will list directories and files in the current directory by default,\n' +
            'however you can specify which path you want to list the directories of.');
            this.echo('> Now type [[b;#ff3300;]cd Documents] to continue.');
        },
        cd: function(arg1) {
            
            var e=0;
            for (i=0; i<fol.length; i++) {
                if(arg1 == fol[i]) { 
                    e=1;
                    f=i+1;
                    break;
                }
                else if(arg1 == ".." || arg1 == "~"){
                    e=2;
                    break;
                }
                else { e=0; }
            }
            if(e==1) {
                arr[3] =1;
                pwdv.push(arg1);
                this.echo("> [[b;#ff3300;]cd] stands for Change Directory. You just changed your directory.");
                this.echo("> You can check your present directory by typing [[b;#ff3300;]pwd]."); 
                this.echo("> To return back to the [[b;#44D544;]previous directory] you should type [[b;#ff3300;]cd ..].");
                this.echo("> To return back to the [[b;#44D544;]home] directory you should type [[b;#ff3300;]cd ~].");
                x='[[b;#44D544;]lterm@localhost/'+ pwdv[1] + ':~$]'
                this.set_prompt(x);
            }
            else if(e==2) {
                if(f!=0) {
                    pwdv.splice(1, 1);
                    f = 0;
                    this.set_prompt('[[b;#44D544;]lterm@localhost:~$]');
                    this.echo(">You have returned to the [[b;#44D544;]parent directory]\n");
                    this.echo(">Now type [[b;#ff3300;]help] to see the commands not completed and try them.");
                }
                else {
                    this.echo("[[b;#ff3300;]This is the root directory!!]\n")
                }
            }
            else { this.echo('[[b;#ff3300;]Directory doesn\'t exist]'); }   
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
            this.echo('> Type [[b;#ff3300;]ls] to see the remaining files and directories in the current directory.');
            if(pwdv[1]==undefined){
                index=fol.indexOf(arg1);
                if(index>0){
                    fol.splice(index, 1);
                    arr[7]=1;
                } else { 
                    x="> \"[[b;#ff3300;]" + arg1 + "]\"" + " directory doesn\'t exist";
                    this.echo(x);
                }
            } else {
                index=sfol[f-1].indexOf(arg1);
                if(index>0){
                    sfol[f-1].splice(index, 1);
                    arr[7]=1;
                } else { 
                    x="> \"[[b;#ff3300;]" + arg1 + "]\"" + " directory doesn\'t exist";
                    this.echo(x); 
                }
            }
        },
        mkdir: function(arg1) {
            arr[8]=1;
            this.echo('> The [[b;#ff3300;]mkdir] command (Make Directory) creates a directory if it doesn’t already exist.');
            this.echo('> Type [[b;#ff3300;]ls] to see the new directory created.');
            if(pwdv[1]==undefined) {
                fol.push(arg1);
                sfol[fol.length-1]=[];
            }
            else {
                sfol[f-1].push(arg1);
            }
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
        uname: function() {
                arr[10] = 1;
                this.echo('lterm\n');
                this.echo('> [[b;#ff3300;]uname] find out the name of the unix/Linux system we are using.\n'+
                    '\n> Print system information \n'+'\n> With no '+
                'option used it is same as -s\n');
                this.echo('> Type [[b;#ff3300;]help] and check that this task is completed.\n');
        },
        date:function()
        {
            arr[11]=1;
            this.echo('\n> [[b;#ff3300;]date] displays the current date and time\n');



            var d = new Date();
            var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
            var name_of_day=days[d.getDay()];
            var name_of_month=months[d.getMonth()];
            this.echo(name_of_day+' '+name_of_month+' '+d.getDate()+' '+time+' IST '+d.getFullYear()+'\n');

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
            arr[12] = 1;
            this.echo(arg1 + '\n');
            this.echo('> The [[b;#ff3300;]ipconfig] command prints back your arguments.');
            this.echo('> Type [[b;#ff3300;]help] and check your first task is completed.');
            this.echo('> Now type [[b;#ff3300;]pwd] to continue.');
        },
        
        tty: function() {
            arr[13] = 1;
            this.echo('/dev/lterm\n');
            this.echo('> [[b;#ff3300;]tty] is used to print the file name of the terminal connected to standard input (keyboard)\n');
            this.echo('> Type [[b;#ff3300;]help] and check that this task is completed.\n');
            arr[13] = 1;
        },
        
        nano: function() {
            arr[14] = 1;
            this.echo('/dev/lterm\n');
            this.echo('> [[b;#ff3300;]nano] is a command line text editor. It works just like a desktop text editor like TextEdit or Notepad, except that it is accessible from the the command line and only accepts keyboard input.\n');
            this.echo('> Type [[b;#ff3300;]help] and check that this task is completed.\n');    
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

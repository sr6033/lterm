// Add more commands as shown. Don't mess where the DANGER is high.

jQuery(document).ready(function($) 
{
    var id = 1;
    window.arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];// Keeps track of different commands(i.e., if they are completed or not)
                                    // 0 -> not completed
                                    // 1 -> completed 
                                    // added 1 more position
    var arr2 = ['echo','pwd','ls','cd','cd ..','cd ~','cat','touch','cp','rm','mkdir','clear','uname','date','ifconfig','tty','history'];
    //all the newly added commands must be updated in both the above arrays
    var task = ['[[b;#ff3300;]Not Completed]', '[[b;#44D544;]Completed]'];  // To print the task status
    
    var pwdv = ["lterm"]  // To print pwd 
    var s = [];   //Array for directories
    var f = [];   //Array for files
    var count = 6;    //Required to continue making sub directories
    var o = { "lterm": "0", "Documents": "1", "Downloads": "2", "Music": "3", "Pictures": "4", "Videos":"5" };  //Object to assign array of sub folders to a folder
    var of = { "hello.txt": "Hey there newbie!\nHaving fun? I hope so." };  //Object to assign text to a file
    f[0] = ["hello.txt"];
    s[0] = ["Documents", "Downloads", "Music", "Pictures", "Videos"];   //Array listing sub directories
    s[1] = []; f[1] = [];
    s[2] = []; f[2] = [];
    s[3] = []; f[3] = [];
    s[4] = []; f[4] = [];
    s[5] = []; f[5] = [];
    var index;  //Used in rm command to remove element from an array by using command splice

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
            this.echo('> cd .. ---------- ' + task[arr[4]]);
            this.echo('> cd ~ ----------- ' + task[arr[5]]);
            this.echo('> cat ------------ ' + task[arr[6]]);
            this.echo('> touch ---------- ' + task[arr[7]]);
            this.echo('> cp ------------- ' + task[arr[8]]);
            this.echo('> rm ------------- ' + task[arr[9]]);
            this.echo('> mkdir ---------- ' + task[arr[10]]);
            this.echo('> clear ---------- ' + task[arr[11]]);
            this.echo('> uname ---------- ' + task[arr[12]]);
            this.echo('> date  ---------- ' + task[arr[13]]);
            this.echo('> ifconfig ------- ' + task[arr[14]]);
            this.echo('> tty ------------ ' + task[arr[15]]);
            this.echo('> history -------- ' + task[arr[16]]);
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
            var pwdvNew = pwdv.join(',').replace(/,/g, '/').split();
            this.echo("/home/" + pwdvNew);
            this.echo('> Everything in Linux is a file. Every file is organized in a hierarchical directory tree.\n' +
                '> The first directory in the filesystem is aptly named the root directory.\n' +
                '> To see where you are, you can use the [[b;#ff3300;]pwd] command, this command means “print working directory”\n' +
                'and it just shows you which directory you are in, note the path stems from the root directory.');
            this.echo('> Now type [[b;#ff3300;]ls] to see the directories and files present in the current directory');
        },
        ls: function() {  
            arr[2] = 1; 
            x = o[pwdv[pwdv.length - 1]];
            y = "[[b;#44D544;]" + s[x] + "]," + f[x];
            var z = y.replace(/,/g, '        ').split();
            this.echo(z);
            x = 0;
            this.echo('> The [[b;#ff3300;]ls] command will list directories and files in the current directory by default,\n' +
            'however you can specify which path you want to list the directories of.');
            this.echo('> Now type [[b;#ff3300;]cd Documents] to enter a sub directory.');
        },
        cd: function(arg1) {
            x = o[pwdv[pwdv.length - 1]];
            var e = 0;
            for (i = 0; i <= s[x].length; i++) {
                if(arg1 == s[x][i]) { 
                    e = 1;
                    break;
                }
                else if(arg1 == "..") {
                    e = 2;
                    break;
                }else if(arg1 == "~") {
                    e = 3;
                    break;
                }
                else { e = 0; }
            }
            if(e==1) {
                arr[3] = 1; x = 0;
                pwdv.push(arg1);
                this.echo("> [[b;#ff3300;]cd] stands for Change Directory. You just changed your directory.");
                this.echo("> You can check your present directory by typing [[b;#ff3300;]pwd]."); 
                this.echo("> To return back to the [[b;#44D544;]previous directory] you should type [[b;#ff3300;]cd ..].");
                this.echo("> To return back to the [[b;#44D544;]home] directory you should type [[b;#ff3300;]cd ~].");
                pwdv.splice(0, 1);
                var pwdvNew = pwdv.join(',').replace(/,/g, '/').split();
                y = '[[b;#44D544;]lterm@localhost/'+ pwdvNew + ':~$]';
                this.set_prompt(y);
                pwdv.unshift("lterm");
            }
            else if(e==2) {
                if(x!=0) {
                    arr[4] = 1; x = 0;
                    pwdv.splice(pwdv.length-1, 1);
                    pwdv.splice(0, 1);
                    var pwdvNew = pwdv.join(',').replace(/,/g, '/').split();
                    y = '[[b;#44D544;]lterm@localhost/'+ pwdvNew + ':~$]';
                    this.set_prompt(y);
                    pwdv.unshift("lterm");
                    this.echo(">You have returned to the [[b;#44D544;]parent directory]\n");
                    this.echo(">Now type [[b;#ff3300;]help] to see the commands not completed and try them.");
                }
                else {
                    x = 0;
                    this.echo("[[b;#ff3300;]Error:] This is the root directory!!\n");
                }
            } else if(e==3) {
                if(x!=0) {
                    arr[5] = 1; x = 0;
                    pwdv.splice(1);
                    y = '[[b;#44D544;]lterm@localhost/'+ pwdv + ':~$] '
                    this.set_prompt(y);
                    this.echo(">You have returned to the [[b;#44D544;]home directory]");
                    this.echo(">Now type [[b;#ff3300;]help] to see the commands not completed and try them.");
                }
                else {
                    x = 0;
                    this.echo("[[b;#ff3300;]Error:] This is the root directory!!\n");
                }
            }
            else { 
                x=0;
                this.echo('[[b;#ff3300;]Error:] Directory doesn\'t exist!!'); }   
        },

        cat: function(arg1) {
            y = of[arg1];
            if(y==undefined){ 
                this.echo(arg1 + " doesn't exist.")}
            else { 
                arr[6] = 1;
                this.echo(y); }
            y = "";
            this.echo("> The [[b;#ff3300;]cat] command views the text inside a file on the terminal.");
        },
        touch: function(arg1) {
            this.echo('> [[b;#ff3300;]touch] allows you to the create new empty files. Type [[b;#ff3300;]ls] to see the new file created.');
            arr[7] = 1;
            x = o[pwdv[pwdv.length - 1]];
            f[x].push(arg1);
            of[arg1] = "";
        },
        cp: function(arg1, arg2) {
            this.echo('> The [[b;#ff3300;]cp] command copies your file to the given location.');
            this.echo('> Now Type [[b;#ff3300;]ls] to see your file copied.');
            x = o[pwdv[pwdv.length - 1]];
            for(i = 0; i <= s[x].length; i++) {
                if(arg1 == s[x][i]){
                    e = 1;
                    break;
                } else if(arg1 == f[x][i]){
                    e = 2;
                    break;
                } else { e = 0; }
            }   //loop ends
            if(e==1) {
                arr[8] = 1;
                o[arg2] = count;
                y = o[arg1];
                s[x].push(arg2);
                s[count] = s[y];
                count++;    
                y = 0;
            } else if(e==2) {
                arr[8] = 1;
                f[x].push(arg2);
                of[arg2] = of[arg1];
            } else if(e==0) {
                y = "> \"[[b;#ff3300;]" + arg1 + "]\"" + " directory or file doesn\'t exist.";
                this.echo(y);
                x = 0;
            }        
        },
        rm: function(arg1) {
            this.echo('> The rm (remove) command is used to delete files and directories.');
            this.echo('> Type [[b;#ff3300;]ls] to see the remaining files and directories in the current directory.');
            x = o[pwdv[pwdv.length - 1]];
            for(i = 0; i <= s[x].length; i++) {
                if(arg1 == s[x][i]){
                    e = 1;
                    break;
                } else if(arg1 == f[x][i]){
                    e = 2;
                    break;
                } else { e = 0; }
            }
            if(e==1) {
                arr[9] = 1;
                index = s[x].indexOf(arg1);
                s[x].splice(index, 1);
                x = 0;
            } else if(e==2){
                arr[9] = 1;
                index = f[x].indexOf(arg1);
                f[x].splice(index, 1);
                x = 0;
            } else if(e==0) {
                y = "> \"[[b;#ff3300;]" + arg1 + "]\"" + " directory or file doesn\'t exist.";
                this.echo(y);
                x = 0;
            }
        },
        mkdir: function(arg1) {
            arr[10] = 1;
            this.echo('> The [[b;#ff3300;]mkdir] command (Make Directory) creates a directory if it doesn’t already exist.');
            this.echo('> Type [[b;#ff3300;]ls] to see the new directory created.');
            x = o[pwdv[pwdv.length - 1]];
            o[arg1] = count;
            s[x].push(arg1);
            s[count] = [];
            f[count] = [];
            x = 0;
            count++;
        },
        Clear: function() {
            this.echo('> The clear(lower C) command, clears your terminal screen');
            this.echo('> Type [[b;#ff3300;]clear] to clean your terminal');
            this.push(function(cmd,term) {
                if(cmd == 'clear' || cmd == 'Clear') //Changed here
                {
                    arr[11]=1;          
                }
                else 
                    this.echo('[[b;#ff3300;]Wrong step commands. Type the exact commands requested.]\n');
            });
        },
        uname: function() {
                arr[12] = 1;
                this.echo('lterm\n');
                this.echo('> [[b;#ff3300;]uname] find out the name of the unix/Linux system we are using.\n'+
                    '\n> Print system information \n'+'\n> With no '+
                'option used it is same as -s\n');
                this.echo('> Type [[b;#ff3300;]help] and check that this task is completed.\n');
        },
        date:function()
        {
            arr[13]=1;
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
        
        ifconfig: function() {
            arr[14] = 1;
            this.echo('eth0    Link encap:Ethernet  HWaddr 09:00:12:90:e3:e5\n' +
                        '\t\tinet addr:192.168.1.29 Bcast:192.168.1.255  Mask:255.255.255.0\n' +
                        '\t\tinet6 addr: fe80::a00:27ff:fe70:e3f5/64 Scope:Link\n' +
                        '\t\tUP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1\n' +
                        '\t\tRX packets:54071 errors:1 dropped:0 overruns:0 frame:0\n' +
                        '\t\tTX packets:48515 errors:0 dropped:0 overruns:0 carrier:0\n' +
                        '\t\tcollisions:0 txqueuelen:1000\n' +
                        '\t\tRX bytes:22009423 (20.9 MiB)  TX bytes:25690847 (24.5 MiB)\n' +
                        '\t\tInterrupt:10 Base address:0xd020\n\n' +

                'lo      Link encap:Local Loopback  \n' +
                        '\t\tinet addr:127.0.0.1  Mask:255.0.0.0\n' +
                        '\t\tinet6 addr: ::1/128 Scope:Host\n' +
                        '\t\tUP LOOPBACK RUNNING  MTU:16436  Metric:1\n' +
                        '\t\tRX packets:83 errors:0 dropped:0 overruns:0 frame:0\n' +
                        '\t\tTX packets:83 errors:0 dropped:0 overruns:0 carrier:0\n' +
                        '\t\tcollisions:0 txqueuelen:0 \n' +
                        '\t\tRX bytes:7766 (7.5 KiB)  TX bytes:7766 (7.5 KiB)\n\n' +

                'wlan0   Link encap:Ethernet  HWaddr 58:a2:c2:93:27:36 \n' +
                        '\t\tinet addr:192.168.1.64  Bcast:192.168.2.255  Mask:255.255.255.0\n' +
                        '\t\tinet6 addr: fe80::6aa3:c4ff:fe93:4746/64 Scope:Link\n' +
                        '\t\tUP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1\n' +
                        '\t\tRX packets:436968 errors:0 dropped:0 overruns:0 frame:0\n' +
                        '\t\tTX packets:364103 errors:0 dropped:0 overruns:0 carrier:0\n' +
                        '\t\tcollisions:0 txqueuelen:1000\n' +
                        '\t\tRX bytes:115886055 (110.5 MiB)  TX bytes:83286188 (79.4 MiB)\n')
            this.echo('> Woah! What the hell happened there?!')
            this.echo('> Relax. It\'s perfectly fine if your don\'t understand any of this right now. This is just a demonstration.')
            this.echo('> The [[b;#ff3300;]ifconfig] command displays information about currently active network interfaces.');
            this.echo('> So, basically, it gives you a lot of information about your network.')
            this.echo('> e.g. your local ip address for wireless (here, wlan0) or ethernet (here, eth0) can be found in their respective "inet addr:" fields.')
            this.echo('> It can also be used to configure the iterfaces but we will not discuss it here.')
            this.echo('> Type [[b;#ff3300;]help] and check that this task is completed.');
        },
        
        tty: function() {
            arr[15] = 1;
            this.echo('/dev/lterm\n');
            this.echo('> [[b;#ff3300;]tty] is used to print the file name of the terminal connected to standard input (keyboard)\n');
            this.echo('> Type [[b;#ff3300;]help] and check that this task is completed.\n');
        },
        
        history: function() {
          var i;
          this.echo('> [[b;#ff3300;]history] This command is used to print the commands which are used in the previous iterations\n');
          this.echo('> Type [[b;#ff3300;]help] and check that this task is completed.\n');
          for(i=0;i<=arr.length;i++)
          {
             if(arr[i] == 1 && arr2[i]!= 'history' )
            {
              this.echo(arr2[i]);
            }
          }
          arr[16] = 1 ;
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

jQuery(document).ready(function($) 
{
    var id = 1;
    var dir = '';

    $('body').terminal({
        echo: function(arg1) {
            this.echo(arg1 + '\n');
            this.echo('> The [[b;#ff3300;]echo] command prints back your arguments.');
        },
        //rpc: 'some_file.php',
        pwd: function() {
            this.echo('/home/lterm\n');
            this.echo('> Everything in Linux is a file. Every file is organized in a hierarchical directory tree.\n' +
                '> The first directory in the filesystem is aptly named the root directory.\n' +
                '> To see where you are, you can use the [[b;#ff3300;]pwd] command, this command means “print working directory”\n' +
                'and it just shows you which directory you are in, note the path stems from the root directory.');
        },
        ls: function() {    
            this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n[[b;#44D544;]hello.txt]\n');
            this.echo('> The ls command will list directories and files in the current directory by default,\n' +
            'however you can specify which path you want to list the directories of.');
        },
        cd: function(arg1) {

            // Wrong directory error

            this.echo("> cd stands for Change Directory. You just changed your directory.");
            this.echo("> You can check your present directory by typing [[b;#ff3300;]pwd].");
            this.echo("> To return back to the [[b;#44D544;]home] directory you should type [[b;#ff3300;]cd ~]. But type [[b;#ff3300;]exit] here.")
            this.push(function(cmd, term) {
                if(cmd == 'pwd')
                    this.echo('/home/lterm/' + arg1);
                else
                if(cmd == 'cd ~')
                    this.echo('Type [[b;#ff3300;]exit] to continue.');
                else
                    this.echo('Wrong steps. Type [[b;#ff3300;]exit] and continue.');
                  }, {
                    prompt: '[[b;#44D544;]lterm@localhost/' + arg1 + ':~$] ',
                    }
            );
        },
        cat: function(arg1) {
            this.echo('[[b;#44D544;]Hey there newbie!\nHaving fun? I hope so.\n\n');
            this.echo('> The [[b;#ff3300;]cat] command displays the contents of the file.');
        },
        touch: function(arg1) {
            dir = arg1;
            this.echo('> [[b;#ff3300;]touch] allows you to the create new empty files. Type [[b;#ff3300;]ls] to see the new file created.');
            this.push(function(cmd, term) {
                if(cmd == 'ls')
                    this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n[[b;#44D544;]hello.txt]\n' + '[[b;#44D544;]' + arg1 + ']');
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
            if(arg2 !== '/Documents')
            {
                this.echo('[[b;#ff3300;]Wrong commands. Type the exact commands requested.]\n');
            }
            else
            {
                this.echo('> The [[b;#ff3300;]cp] command copies your file to the given location.');
                this.echo('> Now Type [[b;#ff3300;]ls] to see your file copied.')
                this.push(function(cmd, term) {
                    if(cmd == 'ls')
                        this.echo('[[b;#44D544;]' + arg1 + ']\n');
                        this.echo('> The [[b;#ff3300;]mv] command in the same way, moves/cut your file to the given location.');
                        this.echo('> Type [[b;#ff3300;]exit] and continue.');
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
                    this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n[[b;#44D544;]hello.txt]\n');
            });
        },
        mkdir: function(arg1) {
            this.echo('> The mkdir command (Make Directory) creates a directory if it doesn’t already exist.');
            this.echo('> Type [[b;#ff3300;]ls] to see the new directory created.');
            this.push(function(cmd, term) {
                if(cmd == 'ls')
                    this.echo('Documents\nDownloads\nMusic\nPictures\nVideos\n' + arg1 + '[[b;#44D544;]hello.txt]\n');
            });
        },
        calc: {
            add: function(a, b) {
                this.echo(a+b);
            },
            sub: function(a, b) {
                this.echo(a-b);
            }
        }
    }, {
    	prompt:"[[b;#44D544;]lterm@localhost:~$] ",
        greetings: "The world is your oyster, or really the shell is your oyster. \n\nWhat is the shell?\n" +
                   "The shell is basically a program that takes your commands from the keyboard and sends them to the operating system to perform.\n" +
                   "The Terminal is a program that launches a shell for you.\n" +
                   "Type [[b;#ff3300;]echo xyz]\n",
        onBlur: function() {
            // prevent loosing focus
            return false;
        }
    });
});

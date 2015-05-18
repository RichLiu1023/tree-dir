var parseArgs = require('minimist');
var pack = require('../package');

var cli = {
	run: function() {
		var argv = process.argv.slice(2);
		var args = parseArgs(argv,{
			alias: {
				h: 'help',
				e: 'exclude',
				v: 'version'
			}
		});

		if(!args.h || !args.help) {
			args.help = argv.length ? '' : true;
		}

		// console.log(args)

		var dirname = args._;
		if(args.v) {
			console.log(pack.version);
			return;
		}

		if(args.help || !dirname.length) {
			this.help();
			return;
		}

		require('./parse').run(args);
	},
	help: function() {
		var content = [
	        '',
	        '  Usage: ' + pack.name + '[dir_name] <commend>',
	        '',
	        '  Commend:',
	        '',
	        '    -e, --exclude  exclude subDir'
    	];

    	content = content.concat([
	        '',
	        '  Options:',
	        '',
	        '    -h, --help     output usage information',
	        '    -v, --version  output the version number',
	        ''
	    ]);

    	console.log(content.join('\n'));
	}
};

module.exports = cli;

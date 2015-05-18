var path = require('path');
var fs = require('fs');
var stat = fs.stat;

var parse = {
	run: function(args) {
		var dirname,
			ex = '';
		if(path.isAbsolute(args._[0])){
			dirname = args._[0];
		} else {
			dirname = path.resolve('./', args._[0]);
		}

		var exist = fs.existsSync(dirname);

		if(!exist) {
			console.log(dirname + " not exist!");
			return;
		}

		if(args.e && typeof args.e == "boolean") {
			console.log("exclude dir is empty!");
			return;
		}

		if(args.e && typeof args.e == "string") {
			ex = path.resolve('./', args.e);
			if(!fs.existsSync(ex)) {
				console.log("exclude dir: "+ ex + " is not exist!");
				return;
			}
		}

		this.result =  '['+args._[0]+']';
		this.doParse(dirname, ex, '  ');
		// console.log(this.result)
	},
	doParse: function(src, ex, space) {
		var flag = '| -- ',
			sp = space || '';
		var that = this;

		stat(src, function(err,st){
			if(st.isFile()) {
				that.result += '\n'+ sp + flag + src;
			} else if(st.isDirectory()) {
				fs.readdir(src, function(err, paths) {
					if(err) {
						throw err;
					}
					paths.forEach(function(path){
						that.result += '\n' + sp + flag + path;
						console.log(that.result)
						var _src = src + '/' + path;
						stat(_src, function(err, st) {
							if(err) {
								throw err;
							}
							if(st.isDirectory()) {
								that.doParse(_src, ex, sp + '|     ');
							}
						});
					});
				});
			}
		});//end of stat
	}
};

module.exports = parse;
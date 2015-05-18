var path = require('path');
var fs = require('fs');
var stat = fs.statSync;

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
			ex = path.resolve(dirname, args.e);
			if(!fs.existsSync(ex)) {
				console.log("exclude dir: "+ ex + " is not exist!");
				return;
			}
		}

		this.result =  '['+args._[0]+']';
		this.doParse(dirname, ex, '  ');
		console.log(this.result)
	},
	doParse: function(src, ex, space) {
		var flag = '| -- ',
			sp = space || '';
		var that = this;

		var st = stat(src);
		if(st.isFile()) {
			that.result += '\n'+ sp + flag + src;
		} else if(st.isDirectory()) {
			var arr = fs.readdirSync(src),
				length = arr.length;
			for(var i = 0; i < length; i++) {
				var item = arr[i];
				var p = path.resolve(src, item);
				if(p == ex) {
					continue;
				}
				that.result += '\n' + sp + flag + item;
				var _src = src + '/' + item;
				var stt = stat(_src);
				if(stt.isDirectory()) {
					that.doParse(_src, ex, sp + '|     ');
				}
			}
		}
	}
};

module.exports = parse;
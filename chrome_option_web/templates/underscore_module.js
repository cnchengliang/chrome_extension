//node underscore_module.js taobao/options.html taobao/options.compiled.js optionsTemplate

var _ = require('../js/libs/underscore/underscore.js');
	fs = require('fs');

function createFile() {
  var args = process.argv,
      templatePath = args.length > 2 ? args[2] : '',
      compilePath = args[3],
      templateName = args[4];

  if( templatePath && compilePath ) {
    templateFile = fs.readFileSync( templatePath ).toString();
    var compiled = _.template(templateFile);
    fs.writeFileSync( compilePath, ";var "+templateName+"="+compiled.source+";" );
  }
  
}

createFile();

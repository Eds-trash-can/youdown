for(let i = 2 ; i < process.argv.length; i++) {
	console.log(i + " " + process.argv[i])

	switch(true) {
		case process.argv[i].match(/^(-h|--help|-\?)$/g): // check for help menu
			console.log("Arguments:");
			console.log("Short form | Long form      | Description");
			console.log(" -? | -h   | --help         | Show this help menu");
			console.log(" -ll=XX    | --loglevel=XX  | Set logging level (for more information use --help loglevel)");
			console.log(" -d        | --debug        | Enables debug mode / flag");
			console.log(" -c        | --console      | Enables console for executing queue commands");
			console.log(" -sm       | --securemode   | disables all plugins (used if plugins do bad stuff)");
			console.log(" -v        | --version      | show version and exit");
			os.exit(1)
			break;

		case process.argv[i].match(/^((\-ll|\-\-loglevel)=[0-9]*)$/g): // -ll --loglevel // set loglevel
			let argarg = process.argv[i]..match(/[0-9]*$/g)
			if(  )
		
	}
}
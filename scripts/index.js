var GameStartTime = Date.now();
var LoadedFiles = []; //Make LoadedFiles a global variable
var tickEvents = []; //Define list of functions to be called on tick


/**Function Library Start**/
function GameTime(GameStartTime){
  time = Date.now() - GameStartTime;
    if (time > 60000){
      time = (time / 1000) / 60 + 'mins'
    }else{
      new_time = time / 1000 + 'sec'
      time = Math.floor(new_time);
    };
  return time
};

function CreateFile(name, content){
	textFile = null,
	data = new Blob([content], {type: 'text/plain'});
	if (textFile !== null){
		window.URL.revokeObjectURL(data);
	};
	textFile = window.URL.createObjectURL(data);

	return textFile;
};


function require(script){
  //Sets defualt state
  var NewFile = false;

  //Check if file is already Loaded
  index = LoadedFiles.indexOf(script, 0);

  //Check if scripts is in list. -1 means it is not in list
  if ( index == "-1" ){

    NewFile = true; //Tell it that it's a new scripts

    //Load File
    var loading = true;
    var NewScript =document.createElement('script');
  	NewScript.src = script;
    script.type = 'text/javascript';
    NewScript.async = "async";
    NewScript.onload = setTimeout(function() { var loading = false; console.debug("Finnished Loading: " + script) }, 11);

    //Place in HTML document
    document.getElementsByTagName('head')[0].appendChild(NewScript);

    //Add File to loaded list
    LoadedFiles.push(script);

    setTimeout(function() { console.debug("Wait for load time") }, 10);
  };

    //Return if it is new
    return NewFile
  };

//Wait to make sure files are loaded then load main game starting script



require("./settings.js");
require("./scripts/2dVector.js");
require("./scripts/physics.js");
require("./scripts/objects/player.js");
require("./scripts/input.js");
require("./scripts/objects/asteroid.js");
setTimeout(function(){ require("./scripts/main.js") }, 100);

var AdmZip = require("adm-zip");
// require fs module
var fs = require("fs");

// creating archives
var zip = new AdmZip();

// add file directly
//var content = "inner content of the file";
//zip.addFile("test.txt", Buffer.from(content, "utf8"), "entry comment goes here");
// add local file
//zip.addLocalFile("/home/me/some_picture.png");

//loop 1 to 8
for (var i = 1; i < 9; i++) {
    // read json and echo to console
    /*var json = fs.readFileSync("../Pack/pack.mcmeta", "utf8");
    //convert json text to javascript object
    var obj = JSON.parse(json);
    console.log(obj);
    console.log(obj.pack.pack_format);*/

    // edit json file
    var json = fs.readFileSync("../Pack/pack.mcmeta", "utf8");
    var obj = JSON.parse(json);
    obj.pack.pack_format = i;
    //convert javascript object to json text
    var json = JSON.stringify(obj);
    //write json text to file
    fs.writeFileSync("../Pack/pack.mcmeta", json, "utf8");

    //add local folder
    zip.addLocalFolder("../Pack");

    // get everything as a buffer
    //var willSendthis = zip.toBuffer();

    let version
    if(i == 1){
        version = "1.6"
    }else if(i == 2){
        version = "1.9"
    }else if(i == 3){
        version = "1.11"
    }else if(i == 4){
        version = "1.13"
    }else if(i == 5){
        version = "1.15"
    }else if(i == 6){
        version = "1.16.2"
    }else if(i == 7){
        version = "1.17"
    }else if(i == 8){
        version = "1.18"
    }

    //delete old test.zip
    fs.unlink("ThaiFixed."+version+".zip", function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("File deleted successfully!");
    });

    // or write everything to disk
    zip.writeZip(/*target file name*/ "ThaiFixed."+version+"+.zip");
}
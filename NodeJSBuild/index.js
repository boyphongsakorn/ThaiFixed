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

//loop 1 to 2
for (var t = 1; t <= 3; t++) {
    if(t == 1){
        //fs.unlinkSync("../Pack/assets/minecraft/font/THSarabunNew.ttf");
    }else if(t == 2){
        //change file name to lower case
        var file = "../Pack/assets/minecraft/font/THSarabunNew.ttf";
        var newFile = "../Pack/assets/minecraft/font/thsarabunnew.ttf";
        fs.renameSync(file, newFile);

        fs.unlinkSync("../Pack/assets/minecraft/font/thsarabunnew.ttf");
        fs.unlinkSync("../Pack/assets/minecraft/font/mitr.ttf");

        //fs.unlinkSync("../Pack/assets/minecraft/font/ibmplexsansthai_fixed.ttf");
        //edit json file
        var json = fs.readFileSync("../Pack/assets/minecraft/font/default.json", "utf8");
        var json_edit = json.replace("minecraft:ibmplexsansthai_fixed.ttf", "minecraft:thsarabunnew_fixed.ttf");
        fs.writeFileSync("../Pack/assets/minecraft/font/default.json", json_edit, "utf8");
    }else if(t == 3){
        //edit json file
        var json = fs.readFileSync("../Pack/assets/minecraft/font/default.json", "utf8");
        var json_edit = json.replace("minecraft:thsarabunnew_fixed.ttf", "minecraft:mitr_fixed.ttf");
        var json_edit2 = json_edit.replace("[0.0, 0.6]", "[0.0, 0.0]");
        var json_edit3 = json_edit2.replace("10.0", "7.7");
        var json_edit4 = json_edit3.replace("12.5", "14.5");
        fs.writeFileSync("../Pack/assets/minecraft/font/default.json", json_edit4, "utf8");
    }

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
        if (i == 1) {
            version = "1.6"
        } else if (i == 2) {
            version = "1.9"
        } else if (i == 3) {
            version = "1.11"
        } else if (i == 4) {
            version = "1.13"
        } else if (i == 5) {
            version = "1.15"
        } else if (i == 6) {
            version = "1.16.2"
        } else if (i == 7) {
            version = "1.17"
        } else if (i == 8) {
            version = "1.18"
        }

        let type = ""
        if(t==2){
            type = "-Sarabun"
        }if(t==3){
            type = "-Mitr"
        }
        //delete old test.zip
        fs.unlink("ThaiFixed"+type+"." + version + ".zip", function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("File deleted successfully!");
        });

        // or write everything to disk
        zip.writeZip(/*target file name*/ "ThaiFixed"+type+"." + version + "+.zip");
    }
}
const fs = require('fs');
function addfacultycourse(name,cour){
    var facultyData = JSON.parse(fs.readFileSync("faculty.json","utf-8"))
    var selectedname = name;
    var selectedcourse = cour;
    if(facultyData[selectedname]["courses"].includes(selectedcourse)){
        return false;
    }else{
        facultyData[name]["courses"].push(selectedcourse);
        newdata = JSON.stringify(facultyData,null,2);
        fs.readFile('faculty.json', function(err, data) {
            if(err){
                return err;
            }
            fs.writeFile("faculty.json", newdata, function(err,data){        
            })
        });
        return true
    }
}
module.exports = addfacultycourse;
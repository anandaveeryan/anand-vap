const fs = require('fs');
var _ = require('lodash');
function delfacultycourse(name,course){
    let facultyData = JSON.parse(fs.readFileSync("faculty.json","utf-8"));
    let logdetails = JSON.parse(fs.readFileSync("logged.json"));
    var selectedname = logdetails["name"];
    var selectedcourse = course;
    var result = facultyData[selectedname]["courses"];
    var res = false;
    var ind = -1;
    for(i in result){
        for (j in result[i]){
            if(j==selectedcourse){
                res = true
                ind = i
                break
            }
        }
    }
    if(res==true){
        delete facultyData[selectedname]["courses"][ind];
        newdata = JSON.stringify(studentData,null,2);
        fs.readFile('faculty.json', function(err, data) {
            if(err){
                return err;
            }
            fs.writeFile("faculty.json",newdata, function(err){
            })
        });
        return true;
    }else{
        return false;
    }
}
module.exports = delfacultycourse;
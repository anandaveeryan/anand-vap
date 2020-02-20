const fs = require('fs');
var _ = require('lodash');
function delcourse(name,course){
    let studentData = JSON.parse(fs.readFileSync("student.json","utf-8"));
    let logdetails = JSON.parse(fs.readFileSync("logged.json"));
    var selectedname = logdetails["name"];
    var selectedcourse = course;
    var result = studentData[selectedname]["courses"];
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
        delete studentData[selectedname]["courses"][ind];
        newdata = JSON.stringify(studentData,null,2);
        fs.readFile('student.json', function(err, data) {
            if(err){
                return err;
            }
            fs.writeFile("student.json",newdata, function(err){
            })
        });
        return true;
    }else{
        return false;
    }
}
module.exports = delcourse;
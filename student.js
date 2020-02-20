const fs = require('fs');
var _ = require('lodash');
function addcourse(name,course,facultyname){
    let studentData = JSON.parse(fs.readFileSync("student.json","utf-8"));
    let logdetails = JSON.parse(fs.readFileSync("logged.json"));
    var selectedname = logdetails["name"];
    var selectedcourse = course;
    var facultyselected = facultyname[0];
    var mapping= {};
    mapping[selectedcourse] = facultyselected;
    var result = studentData[selectedname]["courses"];
    var res = false;
    for(i in result){
        for (j in result[i]){
            if(j==selectedcourse){
                res = true
                break
            }
        }
    }
    if(res==true){
        return false;
    }else{
        studentData[selectedname]["courses"].push(mapping);
        newdata = JSON.stringify(studentData,null,2);
        fs.readFile('student.json', function(err, data) {
            if(err){
                return err;
            }
            fs.writeFile("student.json",newdata, function(err){
            })
        });
        return true;
    }
}
module.exports = addcourse;
const fs = require('fs');
function addUser(name,password,repassword,type){
    if(type=="Professor"){
        var facultyDetails = JSON.parse(fs.readFileSync("faculty.json","utf-8"));
        facultyDetails[name] = {}
        facultyDetails[name]["password"] = password;
        facultyDetails[name]["courses"] = [];
        facultyDetails[name]["subjects"] = 0;
        facultyDetails[name]["loggedin"] = false;
        newdata = JSON.stringify(facultyDetails,null,2);
        if(password!=repassword){
            return false;
        }else{
            fs.readFile('faculty.json', function(err, data) {
                if(err){
                    return err;
                }
                fs.writeFile("faculty.json", newdata , function(err,data){        
                })
            });
            return true;
        }    
    }else{
        var studentDetails = JSON.parse(fs.readFileSync("student.json","utf-8"));
        studentDetails[name] = {}
        studentDetails[name]["password"] = password;
        studentDetails[name]["courses"] = [];
        studentDetails[name]["credits"] = 0;
        studentDetails[name]["loggedin"] = false;
        newdata = JSON.stringify(studentDetails,null,2);
        if(password!=repassword){
            return false;
        }else{
            fs.readFile('student.json', function(err, data) {
                if(err){
                    return err;
                }
                fs.writeFile("student.json", newdata , function(err,data){        
                })
            });
            return true;
        }
    }
}
module.exports = addUser;
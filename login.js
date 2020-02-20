const fs = require('fs');
var res = (function logi(){
    var logdetails = JSON.parse(fs.readFileSync("logged.json","utf-8"));
    logdetails["name"] = "";
    newdata = JSON.stringify(logdetails);
    return function(){
        fs.readFile('logged.json', function(err, data) {
            if(err){
                return err;
            }
            fs.writeFile("logged.json",newdata, function(err){
            })
        });
        return true;
    }
})();
function loginUser(name,password,type){
    if(type=="Professor"){
        var facultyDetails = JSON.parse(fs.readFileSync("faculty.json","utf-8"));
        var names = []
        for(i in facultyDetails){
            names.push(i)
        }
        if(names.includes(name)){
            if(facultyDetails[name]["password"]==password){
                return true;
            }else{
                return false;
            }
        }else{
            return false
        }
    }else{
        var studentDetails = JSON.parse(fs.readFileSync("student.json","utf-8"));
        var names = []
        for(i in studentDetails){
            names.push(i)
        }
        if(names.includes(name)){
            if(studentDetails[name]["password"]==password){
                res = true
                if(res==true){
                    var logdetails = JSON.parse(fs.readFileSync("logged.json","utf-8"));
                    logdetails["name"] = name;
                    newdata = JSON.stringify(logdetails);   
                    fs.readFile('logged.json', function(err, data) {
                        if(err){
                            return err;
                        }
                        fs.writeFile("logged.json",newdata, function(err){
                        })
                    });
                    return true;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}
module.exports = loginUser;
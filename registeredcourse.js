const fs = require('fs');
var pdf = require('html-pdf');
var util = require('util')
var readFile = util.promisify(fs.readFile);
function regcourse(){
    let studentData = JSON.parse(fs.readFileSync("student.json","utf-8"));
    let logdetails = JSON.parse(fs.readFileSync("logged.json","utf-8"));
    var name = logdetails["name"];
    var arr = {}
    var da = []
    const promise = readFile('student.json','utf-8')
    promise.then((data) => JSON.parse(data))
    promise.then((data) => da.push(data))
    promise.catch((err) => console.log(err))
    for(i in studentData){
        if(i==name){
            for(j in studentData[i]["courses"]){
                for(k in studentData[i]["courses"][j]){
                    arr[k] = studentData[i]["courses"][j][k]
                }
            }
        }
    }
    var str = "<html><body><table border=\"1\">"
    for(x in arr){
        ss = "<tr><td>" + x + "</td><td>" + arr[x] + "</td></tr>"  
        str += ss
    }
    str += "</table></body></html>"
    fs.writeFileSync("test.html",str);
    var html = fs.readFileSync('test.html', 'utf8');
    var options = { format: 'Letter' };    
    pdf.create(html, options).toFile('registered.pdf', function(err, res) {
    if (err) return console.log(err);});
    return(arr)
}
module.exports = regcourse;
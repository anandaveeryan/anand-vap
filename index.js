var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var fs = require('fs')
var studcourse = require("./student.js");
var factcourse = require("./faculty.js");
var _ = require('lodash');
var userreg = require('./signup.js')
var userlog = require('./login.js')
var userdel = require('./deletecourse.js')
var regcourse = require('./registeredcourse.js')


app.use(bodyParser.urlencoded(
    {extended: true}
))

app.set('view engine','pug')
app.set('views','./views')

let courseData = JSON.parse(fs.readFileSync('courses.json', 'utf-8'))

course = []
for (c in courseData){
    course.push(courseData[c].replace(/\s/g,''))
}
course1 = {}
for (c in courseData){
    course1[courseData[c]] = courseData[c].replace(/\s/g,'')
}
var cours = JSON.stringify(course1);
let facultyData = JSON.parse(fs.readFileSync('faculty.json', 'utf-8'))
faculty = []
for (c in facultyData){
    faculty.push(c)
}

var courselist = []

var j = 0

for(j in course){
    var arr = []
    for(i in facultyData){
        if(facultyData[i]["courses"].includes(course[j])){
            arr.push(i)
        }
    }
    courselist.push(arr);
}

var facts1 = JSON.stringify(courselist[0]);
var facts2 = JSON.stringify(courselist[1]);
var facts3 = JSON.stringify(courselist[2]);
var facts4 = JSON.stringify(courselist[3]);
var facts5 = JSON.stringify(courselist[4]);
var facts6 = JSON.stringify(courselist[5]);
var facts7 = JSON.stringify(courselist[6]);

app.get('/',function(req,res){
    res.render('login',{
    })
})

app.post('/',function(req,res){
    var result = userlog(req.body["username"],req.body["password"],req.body["typeselected"])
    if(result==true && req.body["typeselected"]=="Student"){
        res.render('studentpage',{
            studentname : req.body["username"],
            course : cours,
            fact1 : facts1,
            fact2 : facts2,
            fact3 : facts3,
            fact4 : facts4,
            fact5 : facts5,
            fact6 : facts6,
            fact7 : facts7
        })
    }else if(result==true && req.body["typeselected"]=="Professor"){
        res.render('facultypage',{
            facultyname : req.body["username"],
            course : cours
        })
    }else{
        res.render('login',{
            message : "Not valid"
        })
    }
})

app.get('/signup',function(req,res){
    res.render('signup',{
    })
})

app.post('/signup',function(req,res){
    var result = userreg(req.body["username"],req.body["password"],req.body["repassword"],req.body["typeselected"]);
    if(result==true){
        res.render('signup',{
            message : "Account Created  Please Login using this account"
        })
    }else{
        res.render('signup',{
            message : "Not Valid"
        })
    }
})

app.get('/registercourse',function(req,res){
    res.render('studentpage',{
        studentname : req.body["studname"],
        course : cours,
        fact1 : facts1,
        fact2 : facts2,
        fact3 : facts3,
        fact4 : facts4,
        fact5 : facts5,
        fact6 : facts6,
        fact7 : facts7
    })
})

app.post('/registercourse',function(req,res){
    var result = studcourse(req.body["studname"],req.body["courseselected"],req.body["factselected"])
    if(result==true){
        res.render('studentpage',{
            message : "Course added successfully",
            course : cours,
            studentname : req.body["studname"],
            fact1 : facts1,
            fact2 : facts2,
            fact3 : facts3,
            fact4 : facts4,
            fact5 : facts5,
            fact6 : facts6,
            fact7 : facts7
        })
    }else{
        res.render('studentpage',{
            message : "Course not added",
            course : cours,
            studentname : req.body["studname"],
            fact1 : facts1,
            fact2 : facts2,
            fact3 : facts3,
            fact4 : facts4,
            fact5 : facts5,
            fact6 : facts6,
            fact7 : facts7
        })
    }
})

app.get("/facultycourse",function(req,res){
    res.render('facultypage',{
        course : cours,
    })
})

app.post("/facultycourse",function(req,res){
    var result = factcourse(req.body["factname"],req.body["courseselected"])
    if(result==true){
        res.render('facultypage',{
            message : "Course successfully added",
            facultyname : req.body["factname"],
            course : cours,
        })
    }else{
        res.render('facultypage',{
            message : "already available",
            facultyname : req.body["factname"],
            course : cours,
        })
    }
})

app.get('/deletestudent',function(req,res){
    res.render('deletestudent',{
        course : cours,
        studentname : req.body["studname"],
    })
})



app.post('/deletestudent',function(req,res){
    var result = userdel(req.body["studname"],req.body["courseselected"])
    if(result==true){
        res.render('deletestudent',{
            message : "Course deleted successfully",
            course : cours,
            studentname : req.body["studname"],
        })
    }else{
        res.render('deletestudent',{
            message : "Course not deleted",
            course : cours,
            studentname : req.body["studname"],
        })
    }
})

app.get('/registerview',function(req,res){
    var a = JSON.stringify(regcourse());
    res.render('viewcourses',{
        course : a
    })
})

app.get('/deletefaculty',function(req,res){
    var a = JSON.stringify(regcourse());
    res.render('deletefaculty',{
        course : cours
    })
})

app.post('/deletefaculty',function(req,res){
    var result = userdel(req.body["studname"],req.body["courseselected"])
    if(result==true){
        res.render('deletefaculty',{
            message : "Course deleted successfully",
            course : cours,
            studentname : req.body["studname"],
        })
    }else{
        res.render('deletefaculty',{
            message : "Course not deleted",
            course : cours,
            studentname : req.body["studname"],
        })
    }
})

app.post('/download', function(req, res){
    const file = `${__dirname}/registered.pdf`;
    res.download(file); // Set disposition and send it.
});

app.listen(3000)
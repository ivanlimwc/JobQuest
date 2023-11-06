const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    connectionLimit : 10,
    host            : 'wpi-cs542-gp5.cckba7esnjk6.us-east-2.rds.amazonaws.com', // 'abcdefg.us-east-2.rds.amazonaws.com',
    user            : 'adminBlue', // 'xyzpqr',
    password        : 'tugrac-2xodcy-gAnkoh', // 'stuvwxyz',
    database        : 'JOBMATCHINGDBMS', 
})

app.post('/signin', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isEmployer = req.body.isEmployer;

    if (isEmployer === 'No') {
        db.query('SELECT * FROM Users_Test WHERE user_login = ? AND user_password = ?', [username, password], (err,result) => {
            if (err) {
                console.log('user login err', err)
            } 
            if (result.length > 0) {
                result[0].isEmployer = isEmployer
                res.send(result)
            } else {
                res.send({message: 'Wrong username/password'})
            }
        })
    } else {
        db.query('SELECT * FROM CompaniesAcc WHERE company_login = ? AND company_password = ?', [username, password], (err, result) => {
            if (err) {
                console.log('company login err', err)
            }

            if (result.length > 0) {
                result[0].isEmployer = isEmployer
                res.send(result)
            } else {
                res.send({message: 'Wrong username/password'})
            }
        })
    }
    
})

app.post('/signup', (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const pemail = req.body.pemail;
    const wemail = req.body.wemail;
    const username = req.body.username;
    const password = req.body.password;
    const wstatus = req.body.wstatus;
    const work = req.body.work;
    const isEmployer = req.body.isEmployer;

    if (isEmployer === 'No'){
        db.query('INSERT INTO Users_Test (user_login, user_password, personal_email, work_email, first_name, last_name, w_status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [username, password, pemail, wemail, fname, lname, wstatus], (err,result) => {
            if (err) {
                res.send({message: 'Username/email already taken'})
            } else {
                res.send(username)
            }
        })
        // if (wstatus === 'Employed') {
        // db.query('INSERT INTO EmploymentHist_Test (user_id, company_id, work_position, employ_start, employ_endexpect)')
        // }
    } else {
        db.query('SELECT company_id FROM Companies WHERE company_name = ?', [fname], (err, result) => {
            if (result.length > 0) {
                db.query('INSERT INTO CompaniesAcc VALUES (?, ?, ?, ?, ?)', [result[0].company_id, username, password, pemail, lname], (err, result) => {
                    if (err) {
                        res.send({message: 'Username/account already exist'})
                    }
                    else {
                        res.send(username)
                    }
                })
            } else {
                db.query('INSERT INTO Companies (company_name) VALUES (?)', [fname])
                db.query('SELECT company_id FROM Companies WHERE company_name = ?', [fname], (err, result) => {
                    db.query('INSERT INTO CompaniesAcc VALUES (?, ?, ?, ?, ?)', [result[0].company_id, username, password, pemail, lname], (err, result) => {
                        if (err) {
                            res.send({message: 'Username/account already exist'})
                        }
                        else {
                            res.send(username)
                        }
                    })
                })
            }
        })
    }
    
})

app.post('/signupCompany', (req,res) => {
    const companyName = req.body.companyName;
    db.query('SELECT company_id FROM Companies WHERE company_name = ?', [companyName], (err,result) => {
        if (result.length > 0) {
            res.send({message: 'This company already exists'})
        }
    })
})

app.post('/education', (req,res) => {
    const userid = req.body.userid;
    const education = req.body.education;
    // const skills = req.body.skills;

    for (let i = 0; i < education.length; i++) {
        const college = education[i].college;
        const degree = education[i].degree;
        const major = education[i].major;
        const startedu = education[i].startedu;
        const endedu = education[i].endedu;

        db.query('INSERT INTO EducationHist_Test (user_id, college, degree, major, educ_start, educ_endexpect) VALUES (?, ?, ?, ?, ?, ?)', 
        [userid, college, degree, major, startedu, endedu], (err,result) => {
            if (err) {
                console.log(err)
            } 
        })
    }

})

app.post('/work', (req,res) => {
    const userid = req.body.userid;
    const work = req.body.work;

       for (let i = 0; i < work.length; i++){
        const company = work[i].company;
        const position = work[i].position;
        const startwork = work[i].startwork;
        const endwork = work[i].endwork;

        db.query('SELECT company_id FROM Companies WHERE company_name = ?', [company], (err,result) => {
            let companyid = '';
            if(result.length === 0) {
                db.query('INSERT INTO Companies(company_name) VALUES (?)', [company], (err,result) => {
                    db.query('SELECT company_id FROM Companies WHERE company_name = ?',[company], (err,result) => {
                        companyid = result[0].company_id;
                        db.query('INSERT INTO EmploymentHist_Test (user_id, company_id, work_position, employ_start, employ_endexpect) VALUES (?, ?, ?, ?, ?)', 
                        [userid, companyid, position, startwork, endwork], (err,result) => {
                            if (err) {
                                console.log(err)
                            }
                        }) 
                    })
                })
            } else {companyid=result[0].company_id;
                db.query('SELECT company_id FROM Companies WHERE company_name = ?',[company], (err,result) => {
                    companyid = result[0].company_id;
                    db.query('INSERT INTO EmploymentHist_Test (user_id, company_id, work_position, employ_start, employ_endexpect) VALUES (?, ?, ?, ?, ?)', 
                    [userid, companyid, position, startwork, endwork], (err,result) => {
                        if (err) {
                            console.log(err)
                        } 
                    }) 
                })
            }
            
        })
         
    }
})

app.post('/removeEdu', (req,res) => {
    const userid = req.body.userid;
    const removeEdu = req.body.removeEdu;

    db.query('DELETE FROM EducationHist_Test WHERE user_id = ? AND college = ? AND degree = ? AND educ_start = ?',
    [userid, removeEdu.college, removeEdu.degree, removeEdu.educ_start], (err,result) => {
        if(err){
            console.log('delete edu err', err)
        }
    })
})

app.post('/job', (req,res) => {
    const job = req.body.job;
    const location = req.body.location;
    const postedDate = req.body.postedDate;
    const experience = req.body.experience;
    const type = req.body.type;
    const skills = req.body.skills;

    const jobKeywords = job.split(" ");
    let titleQuery = "";
    let locQuery = "";
    let pdQuery = '';
    let expQuery = '';
    let typeQuery = '';
    let skillQuery = '';
    let orderQuery = '';
    let orderLocQuery = '';
    let orderExpQuery = '';
    let orderTypeQuery = '';
    let orderPdQuery = '';
    
    function createLikeQuery (searchKeys) {
        let tempQuery = ""
        for (let i = 0; i < searchKeys.length; i++) {
            if (tempQuery===""){
                tempQuery = "'%"+searchKeys[i]+"%'"
            } else {
                tempQuery = tempQuery.concat(" OR ", "'%"+searchKeys[i]+"%'")
            }
        }
        return tempQuery
    }

    function createInQuery (searchKeys) {
        let tempQuery = ""
        for (let i = 0; i < searchKeys.length; i++) {
            if (tempQuery===""){
                tempQuery = "('"+searchKeys[i].value+"'"
            } else {
                tempQuery = tempQuery.concat(" , ", "'"+searchKeys[i].value+"'")
            }
        }
        return tempQuery + ")"
    }

    titleQuery = "(j.job_title LIKE " + createLikeQuery(jobKeywords) + ")"
    
    if(location===null){
        locQuery=""; 
        locList=null;
    } else {
        const locKeywords = location.split(", ");
        locQuery = " AND (j.job_location LIKE " + createLikeQuery(locKeywords) + ")"
        orderLocQuery = "INSTR(j.job_location, ?)"
    }

    if(postedDate===null){pdQuery="" }

    if(experience===null){expQuery="";} 
    else {
        expQuery = " AND j.job_seniority = ?";
        orderExpQuery = " AND INSTR(j.job_seniority, ?)"
    }

    if(type===null){typeQuery="";} 
    else {
        typeQuery = " AND j.employment_type = ?";
        orderTypeQuery = " AND INSTR(j.employment_type, ?)"
    }

    if(skills.length === 0){skillQuery="";}
    else{
        skillQuery = " AND s.skill_name IN " + createInQuery(skills)
    }
    
    let queryFields = [];
    const searchList = [experience, type, location, experience, type]

    for (let i = 0; i < searchList.length; i++){
        if(searchList[i] != null){
            queryFields = queryFields.concat(searchList[i].value)
        }
        if(i===2 && searchList[i] != null){
            queryFields = queryFields.concat(searchList[i])
        }
    }

    if(queryFields.length != 0){
        orderQuery = " ORDER BY "
    }    

    bigQuery = "SELECT j.*,c.company_name,ca.company_link,s.skill_name \
                 FROM Jobs j \
                 LEFT JOIN Companies c ON j.company_id=c.company_id \
                 LEFT JOIN CompaniesAcc ca ON ca.company_id = c.company_id \
                 LEFT JOIN JobSkills js ON js.job_id=j.job_id \
                 LEFT JOIN Skills s ON s.skill_id=js.skill_id \
                 WHERE "
                 + titleQuery
                 + locQuery
                 + expQuery
                 + typeQuery
                 + skillQuery
                 + orderQuery + orderLocQuery
                 + orderExpQuery
                 + orderTypeQuery
                 //+ " AND j.posted_date DESC"
            
    console.log('query', bigQuery)
    console.log('fields', queryFields)
    
    db.query(bigQuery, queryFields, (err,result) => {
        if (err) {
            console.log(err)
        }

        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({message: 'No result found'})
        }
        
    })    
    
    
})

app.post('/company', (req,res) => {
    const companyName = req.body.companyName;

    db.query('SELECT r.*, c.company_name FROM Reviews r NATURAL JOIN Companies c WHERE c.company_name = ?', 
    [companyName], (err,result) => {
        if (err) {
            res.send({err: err})
        } 

        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({message: 'No result found'})
        }
    })

})

app.post('/review', (req,res) => {
    const userid = req.body.userid;
    const company = req.body.company;
    const ranking = req.body.ranking;
    const reccommend = req.body.reccommend;
    const ceoApprove = req.body.ceoApprove;
    const busOutlook = req.body.busOutlook;
    const wlbalance = req.body.wlbalance;
    const feedback = req.body.feedback;

    db.query('SELECT company_id FROM Companies WHERE company_name = ?',[company], (err,result) => {
        db.query('INSERT INTO Reviews(user_id, company_id, company_rating, company_recommend, company_approveceo, company_busoutlook, company_balance, user_feedback) \
            VALUES (?,?,?,?,?,?,?,?)', 
        [userid,result[0].company_id,ranking, reccommend,ceoApprove,busOutlook,wlbalance,feedback], (err,result) => {
            if (err) {
                res.send({message:'You already reviewed this company'})
                console.log(err)
            } else {
                res.send(result)
            }
     
        })
    })
})

app.get('/education', (req,res) => {
    userid = req.query.userid;
    db.query('SELECT * FROM EducationHist_Test WHERE user_id = ?',[userid], (err,result) => {
        res.send(result);
    })
})


app.listen(8080, () => {
    console.log('server listening on port 8080');
})
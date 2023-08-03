const bodyParser = require("body-parser")
const router=require("express").Router()
const allcalling=require("../controller/controller")
const imgcapture=require("../controller/userController")
const validationCheck=require("../authcheck/authcheck")
const { body, validationResult } = require('express-validator');
// const renderPage=require("../ui/login ")
// const model = require("../data/model/model")
//  function getdata(){
    const multer = require('multer');
    const fileStorage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
    cb(null, file.originalname);
    }
  });


const fileUpload = multer({ storage: fileStorage });

router.use(bodyParser.json());
router.get("/"                   ,allcalling.showloginPage)
router.get("/homeapage/alldata"    ,allcalling.testpage)
router.get("/getdata"                  ,allcalling.getdata)
router.post("/insert/alldata/"        ,allcalling.insertAlldata)
router.post("/sendmail"                ,allcalling.mail)                     
router.post("/signup/authcheck"               ,[body('email').isEmail().withMessage('Please enter a valid email address'),body('password').notEmpty().withMessage('Password is required')],allcalling.signup)
// router.post("/signin/authcheck"          ,allcalling.signin)
router.post("/signin/authcheck"          ,[body('email').isEmail().withMessage('Please enter a valid email address'),body('password').notEmpty().withMessage('Password is required')], allcalling.signin)
// body('email').isEmail().withMessage('Please enter a valid email address'),
// router.post('/imgupload'                  ,fileUpload.single("images"),imgcapture.insertdata)
router.post('/imgupload'                  ,fileUpload.array("images[]"),imgcapture.insertdata)
router.post("/validationToken"             ,validationCheck.validateToken)
router.put("/update/alldata/"         ,allcalling.updatedata)
router.put("/updateone/alldata/"      ,allcalling.oneupdate)
router.delete("/delete/alldata/"      ,allcalling.datadelete)
router.get("/specificdata/place"      ,allcalling.specificData)
router.get("/femaleCandidate"          ,allcalling.genderData)
router.get("/transgenderDetails"        ,allcalling.transGenderData)
router.get("/FirstletterA/alldata"      ,allcalling.firstNameData)
router.get("/maledata/alldata"           ,allcalling.malegender)
router.get("/query/alldata"              ,allcalling.Querydata)


module.exports=router; 
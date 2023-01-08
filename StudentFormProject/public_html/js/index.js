/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var  jpdbBaseURL  = "http://api.login2explore.com:5577" ;
var jpdbIRL = "/api/irl" ;
var jpdbIML = "/api/iml" ;
var stuDBName = "SCHOOL-DB" ;
var stuRelationName  = "STUDENT-TABLE" ;
var connToken = "90932455|-31949270553144720|90955329" ;

$('#rollno').focus() ;

function saveRecNo2LS(jsonObj)
{
    var lvData = JSON.parse(jsonObj.data) ;
    localStorage.setItem('recno' ,lvData.rec_no ) ;
}
function getEmpIdAsJsonObj()
{
    var rollno  = $('#rollno').val()  ;
    var jsonStr ={
        rollno  : rollno
    }; 
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj) ; 
    var record = JSON.parse(jsonObj.data).record ;
    $("#name").val(record.name) ;
    $("#clas").val(record.clas) ;
    $("#birth").val(record.birth) ;
    $("#address").val(record.address) ;
    $("#enroll").val(record.enroll) ;
}
function resetForm()
{
    $('#rollno').val("") ;
    $('#name').val("") ;
    $('#clas').val("") ;
    $('#birth').val("") ;
    $('#address').val("") ;
    $('#enroll').val("") ;
    $('#rollno').prop("disabled" , false) ;
    $('#save').prop("disabled" , true) ;
    $('#change').prop("disabled" , true) ;
    $('#reset').prop("disabled" , true) ;
    $('#rollno').focus(); 

}
function validateData()
{
    var rollno , name, clas , birth , address , enroll ;
    rollno = $('#rollno').val() ;
    name = $('#name').val() ;
    clas = $('#clas').val() ;
    birth = $('#birth').val() ;
    address = $('#address').val() ;
    enroll = $('#enroll').val() ;
    
    if(rollno === "")
    {
        alert('Student Roll no missing'); 
        $('#rollno').focus() ;
        return "" ; 
    }
    if(name === "")
    {
        alert('Student Name missing') ;
        $('#name').focus() ;
        return "" ; 
    }
    if(clas === "")
    {
        alert('Class missing') ;
        $('#clas').focus() ;
        return "" ; 
    }
    if(birth === "")
    {
        alert('Birth date missing') ; 
        $('#birth').focus() ;
        return "" ; 
    }
    if(address === "")
    {
        alert('Address missing') ;
        $('#address').focus() ;
        return "" ; 
    }
    if(enroll === "")
    {
        alert('Enrollent  missing') ; 
        $('#enroll').focus() ;
        return "" ; 
    }
    var jsonStrObj = {
      rollno: rollno , 
      name : name , 
      clas : clas , 
      birth : birth , 
      address : address ,
      enrollment: enroll
    };
    return  JSON.stringify(jsonStrObj) ;
}
function getEmp()
{
    var empIdJsonObj = getEmpIdAsJsonObj() ;
    var getRequest = createGET_BY_KEYRequest(connToken , stuDBName , stuRelationName , empIdJsonObj);
    jQuery.ajaxSetup({async : true}) ;
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest , jpdbBaseURL , jpdbIRL);
        jQuery.ajaxSetup({async : false}) ;
    if(resJsonObj.status === 400)
    {
        $('#save').prop("disabled" , false); 
         $('#reset').prop("disabled" , false); 
          $('#name').focus(); 
    }
    else if( resJsonObj.status === 200)
    {
         $('#change').prop("disabled" , true);
         fillData(resJsonObj) ;
          $('#change').prop("disabled" , false);
          $('#reset').prop("disabled" , false);
          $('#name').focus() ;
    }
}
function saveData() {
var jsonStrObj = validateData();
if (jsonStrObj === "") {
return "";
}
var putRequest = createPUTRequest(connToken ,jsonStrObj , stuDBName , stuRelationName);
jQuery.ajaxSetup({async: false});
var resultJsonObj = executeCommandAtGivenBaseUrl(putRequest , jpdbBaseURL , jpdbIML);
jQuery.ajaxSetup({async: true});
resetForm();
$('#rollno').focus() ;
}

function changeData()
{
    $('#change').prop('disabled' , true) ;
    jsonObj = validateData() ; 
    var updateRequest = createUPDATERecordRequest(connToken , jsonObj ,empDBName , empRelationName , localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest , jpdbBaseURL , jpdbIML) ;

jQuery.ajaxSetup({async: true});
console.log(resJsonObj) ;
resetForm();
$('#rollno').focus() ;
}

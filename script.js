//---------------Sign-Up--------------
function register(){
    window.location='./register.html'
}

//---------------------------register------------------
function createac() {
    //fetch values 
    acid = acno.value
    usname = uname.value
    email = mail.value
    pswrd = pwd.value
    let income =0
    let expense =0
    
    console.log(acid, usname, email, pswrd);

    //object create
    accountDetails = {
        acid,
        usname,
        email,
        pswrd,
        income,
        expense,
        incomeArray:[],
        expenseArray:[]
    }

    //check
    if (acno.value == '' || uname.value == '' || mail.value == '' || pswrd.value == '') {
        alert("Please fill all the fields.")
    } else {
        if (usname in localStorage) {
            alert("Username already exist!")
        } else {
            localStorage.setItem(usname, JSON.stringify(accountDetails))
            alert("Registration Successfull")
             //redirect to login page
            window.location = './index.html'
        }
    }
}
//---------------- Sign-In------------------
function login() {
    // Fetch details
    let username = loname.value;
    let password = lopwd.value;

    // Check if user ID is present in local storage
    if (username in localStorage) {
        // Retrieve user details from local storage
        let accountDetails = JSON.parse(localStorage.getItem(username));

        // Check if the entered password matches the stored password
        if (password === accountDetails.pswrd) {
            alert("Login Successful");
            localStorage.setItem('loggedkey',username)
            // Redirect to home page
            window.location = './home.html';            
            
        } else {
            alert("Incorrect Password");
        }
    } else {
        alert("Invalid User-ID");
    }
}



// --------------------------------------------------------------------------------------------
//logout
function logout() {
    window.location = './index.html';
}

// -----------------------Calculator----------------------
displayIncm();
displayexp();
displayincomeArray();
displayexpenseArray();
// income
function incm() {
    let incometype=document.getElementById("cate").value
    let incomeamt=document.getElementById("incash").value

    if (incometype == '' || incomeamt == '') {
        alert("Please fill both fields")
    } else if (incomeamt <= 0) {
        alert("Value cannot be empty or negative")
    } else {
        let loggedkey=localStorage.getItem("loggedkey")
        // console.log(loggedkey);
        

        let  accountDetails=JSON.parse(localStorage.getItem(loggedkey))
        // console.log(accountDetails);
        accountDetails.income+=parseFloat(incomeamt)
        // console.log(accountDetails.income);
        localStorage.setItem(loggedkey,JSON.stringify(accountDetails))
        alert("Your amount is succesfully added")
        displayIncm();
        document.getElementById("cate").value=""
        document.getElementById("incash").value=""
        addincomeArray(incometype,incomeamt,accountDetails.income);
        displayincomeArray();
        
    }
}
// -------------------------income display--------------------------------------

function displayIncm(){
    let loggedkey=localStorage.getItem("loggedkey")
    console.log(loggedkey);
    let  accountDetails=JSON.parse(localStorage.getItem(loggedkey))
        console.log(accountDetails);
    document.getElementById("balancec").innerHTML = `<h1><i class="fa-solid fa-wallet" style="color: rgb(51, 85, 64);"></i></h1>
            <p style="color: rgb(51, 85, 64);">Your Account Balance is: ${accountDetails.income}/-</p>`
}



// Expense
function expnse(){
    let expensetype=document.getElementById("expcate").value
    let expenseamt=document.getElementById("expcash").value

    if (expensetype == '' || expenseamt == '') {
        alert("Please fill both fields")
    } else{
        let loggedkey=localStorage.getItem("loggedkey")
        let  accountDetails=JSON.parse(localStorage.getItem(loggedkey))
            if ( expenseamt <= 0 ||expenseamt>accountDetails.income ) {
            alert("Insufficient Balance")
            } 
            else{
            accountDetails.income=accountDetails.income-parseFloat(expenseamt)
            accountDetails.expense+=parseFloat(expenseamt)
            localStorage.setItem(loggedkey,JSON.stringify(accountDetails))
            alert("Expense Added Successfully")
            displayexp();
            displayIncm();
            document.getElementById("expcate").value=""
            document.getElementById("expcash").value=""
            addexpenseArray(expensetype,expenseamt,accountDetails.expense);
            displayexpenseArray();
            
    }
    }
}
// -------------------------Expense display--------------------------------------

function displayexp(){
    let loggedkey=localStorage.getItem("loggedkey")
    console.log(loggedkey);
    let  accountDetails=JSON.parse(localStorage.getItem(loggedkey))
        console.log(accountDetails);
    document.getElementById("expenses").innerHTML = `<h1><i class="fa-solid fa-money-bill-transfer" style="color: #e51515;"></i></h1>
    <p style="color: rgb(220, 39, 39);">Expense: ${accountDetails.expense}/-</p>`
}


// -----------------------------------------------------------------------------------------------------------------------------
                                    // TABLE-------------------------------------------


// Adding income Array

function addincomeArray(type,amt,bal){  
    let loggedkey=localStorage.getItem("loggedkey")
    let incomeobj={
        type:type,
        amt:amt,
        bal:bal
    }
    let accountDetails=JSON.parse(localStorage.getItem(loggedkey));
    accountDetails.incomeArray.push(incomeobj);
    localStorage.setItem(loggedkey,JSON.stringify(accountDetails));
}
// adding expense Array
function addexpenseArray(type,amt,bal){   
    let loggedkey=localStorage.getItem("loggedkey")
    let expenseobj={
        type:type,
        amt:amt,
        bal:bal
    }
    let accountDetails=JSON.parse(localStorage.getItem(loggedkey)); 
    accountDetails.expenseArray.push(expenseobj); 
    localStorage.setItem(loggedkey,JSON.stringify(accountDetails));
}



// display incomeArray
function displayincomeArray(){
    let loggedkey=localStorage.getItem("loggedkey")
    let accountDetails=JSON.parse(localStorage.getItem(loggedkey));
    let incomearray=accountDetails.incomeArray;
     let incomedetails=document.getElementById("incomedetails")
      incomedetails.innerHTML='';
    for(incc of incomearray){
    let output=`<tr>
                <td>${incc.type}</td>  
                 <td style="color: rgb(3, 119, 24);">+ ${incc.amt}/-</td> 
                 <td>${incc.bal}/-</td> 
                 </tr>`
      incomedetails.innerHTML+=output ;         
    }
}
// display ExpenseArray
function displayexpenseArray(){
    let loggedkey=localStorage.getItem("loggedkey")
    let accountDetails=JSON.parse(localStorage.getItem(loggedkey));
    let expenseArray=accountDetails.expenseArray;
    let expensedetails=document.getElementById("expensedetails")
    expensedetails.innerHTML='';
    for(i of expenseArray){
   
    expensedetails.innerHTML+=`<tr>
                         <td>${i.type}</td>  
                         <td style="color: rgb(220, 39, 39);">- ${i.amt}/-</td> 
                         <td>${i.bal}/-</td> 
    </tr>`
    }

}


// ------------------Clear----------------------------

function clearAll(){
    let output=confirm("Proceed to Clear All Data?")
  if(output){
        let loggedkey=localStorage.getItem("loggedkey")
         let accountDetails=JSON.parse(localStorage.getItem(loggedkey));
         accountDetails.income=0;
         accountDetails.expense=0;  
         accountDetails.incomeArray=[];
         accountDetails.expenseArray=[];      
         localStorage.setItem(loggedkey,JSON.stringify(accountDetails))   
     
         document.getElementById("incomedetails").innerHTML='';
         document.getElementById("expensedetails").innerHTML='';
         alert("Your Data Has Been Successfully Erased")
         }   
 }












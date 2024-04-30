var script = document.createElement("script");
script.src = 'https://smtpjs.com/v3/smtp.js'; 
document.head.appendChild(script); 

var otp;
var username;

function loginLayoutFunction(){
    document.getElementById('passEye').classList.add("passIcon2");
    document.getElementById('passEye').classList.remove("passIcon");
    document.getElementById('button').value='register';
    document.getElementById("AlertMessage").style.display = "none";
    document.getElementById('phone').style.display = 'none';
    document.getElementById('phoneInput').style.display = 'none';
    document.getElementById('email').style.display = 'block';
    document.getElementById('emailInput').style.display = 'block';
    document.getElementById('password').style.display = 'block';
    document.getElementById('passwordInput').style.display = 'block';
    document.getElementById('name').style.display = 'none';
    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('secret').style.display = 'none';
    document.getElementById('secretInput').style.display = 'none';
    document.getElementById('button').innerHTML = 'Login';
    document.getElementById('button').setAttribute('onclick', 'login()');
    document.getElementById('bottomText').innerHTML = 'Not one of us? <a onclick="registerLayoutFunction()">Join Us</a>';
}

function registerLayoutFunction(){
    document.getElementById('button').value='register';
    document.getElementById('phone').style.display = 'block';
    document.getElementById('phoneInput').style.display = 'block';
    document.getElementById('name').style.display = 'block';
    document.getElementById('nameInput').style.display = 'block';
    document.getElementById('secret').style.display = 'block';
    document.getElementById('secretInput').style.display = 'block';
    document.getElementById('button').innerHTML = 'Register';
    document.getElementById('button').setAttribute('onclick', 'register()');
    document.getElementById('bottomText').innerHTML = 'One of us? <a onclick="loginLayoutFunction()">Login with credentials</a>';
    document.getElementById('passEye').classList.remove("passIcon2");
    document.getElementById('passEye').classList.add("passIcon");
}

function register(){
    if(document.getElementById('button').value=='register'){
        var name = document.getElementById('nameInput');
        var email = document.getElementById('emailInput');
        var password = document.getElementById('passwordInput');
        var phone = document.getElementById('phoneInput');
        var secret = document.getElementById('secretInput');
        if(name.value.toString() == '' || email.value.toString() == '' || password.value.toString() == '' || secret.value.toString() == '' || phone.value.toString() == ''){
            document.getElementById("AlertMessage").style.display = "block";
            document.getElementById('AlertContent').innerHTML = "The form is not completely filled!";
        }
        else if(!email.value.toString().includes('@')){
            document.getElementById("AlertMessage").style.display = "block";
            document.getElementById('AlertContent').innerHTML = "Invalid email address provided!";
        }
        else if(password.value.toString().length<8){
            document.getElementById("AlertMessage").style.display = "block";
            document.getElementById('AlertContent').innerHTML = "Password must be of at least 8 characters!";
        }
        else if(phone.value.toString().length!=10){
            document.getElementById("AlertMessage").style.display = "block";
            document.getElementById('AlertContent').innerHTML = "Phone number must be valid!";
        }
        else{
            let emailFound = 'no';

            document.getElementById("button").disabled = true; 

            fetch('https://script.google.com/macros/s/AKfycbxT31f6leVpCv00rioLhvP1eaPxH4G3eLoV5hPf-WvCE100l1TI-uOgSMsghbbGT0Mb/exec')
            .then(res => res.json())
            .then(data => {
                for(let i=1; i<data['content'].length; i++){
                    if(email.value.toString().toLowerCase()==data["content"][i][0].toLowerCase()){
                        emailFound='yes';
                    }
                }

                if(emailFound=='no'){
                    username = document.getElementById('nameInput').value.toString();
                    
                    document.getElementById('phone').style.display = "none";
                    document.getElementById('phoneInput').style.display = "none";
                    document.getElementById('email').style.display = "none";
                    document.getElementById('emailInput').style.display = "none";
                    document.getElementById('password').style.display = "none";
                    document.getElementById('passwordInput').style.display = "none";
                    document.getElementById('secret').style.display = "none";
                    document.getElementById('secretInput').style.display = "none";
                    document.getElementById('name').innerHTML = "Enter OTP:";
                    document.getElementById('nameInput').value = "";
                    document.getElementById('nameInput').setAttribute('placeholder', "Don't forget to check spam folder");
                    document.getElementById('bottomText').innerHTML = "<a onclick='resendOTP()'>Resend OTP</a>"
    
                    otp = Math.floor(Math.pow(10, 6-1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6-1) - 1))
                    Email.send({
                        Host : "smtp.elasticemail.com",
                        Username : "ayushkumar274549@gmail.com",
                        Password : "EAA9DA0DAE37F35F373396815718611507D9",
                        To : email.value.toString(),
                        From : "ayushkumar274549@gmail.com",
                        Subject : "OTP to signup for play.ultimate",
                        Body : "Your OTP to join play.ultimate is "+otp
                    }).then(
                      message => {
                        document.getElementById("AlertMessage").style.display = "block";
                        document.getElementById('AlertContent').innerHTML = "OTP has been sent to your email address!";
                    });

                    document.getElementById('button').value='otp';
                    document.getElementById("button").disabled = false; 
                }
                else{
                    document.getElementById("AlertMessage").style.display = "block";
                    document.getElementById('AlertContent').innerHTML = "User already exists!";
                    document.getElementById("button").disabled = false; 
                }
                
            });
        }
    }
    else{
        if(document.getElementById('nameInput').value.toString()==otp.toString()){

            var email = document.getElementById('emailInput');
            var password = document.getElementById('passwordInput');
            var secret = document.getElementById('secretInput');
            var phone = document.getElementById('phoneInput');

            var form1 = document.createElement('form');
            form1.id = "google-sheet";
            var name1 = document.createElement('input');
            name1.setAttribute('type', 'text');
            name1.setAttribute('name', 'Name');
            name1.setAttribute('value', username);
            form1.appendChild(name1);
    
            var email1 = document.createElement('input');
            email1.setAttribute('type', 'text');
            email1.setAttribute('name', 'Email');
            email1.setAttribute('value', email.value.toString());
            form1.appendChild(email1);
    
            var password1 = document.createElement('input');
            password1.setAttribute('type', 'text');
            password1.setAttribute('name', 'Password');
            password1.setAttribute('value', password.value.toString());
            form1.appendChild(password1);
            
            var phone1 = document.createElement('input');
            phone1.setAttribute('type', 'text');
            phone1.setAttribute('name', 'Phone');
            phone1.setAttribute('value', phone.value.toString());
            form1.appendChild(phone1);

            var secret1 = document.createElement('input');
            secret1.setAttribute('type', 'text');
            secret1.setAttribute('name', 'Secret');
            secret1.setAttribute('value', secret.value.toString());
            form1.appendChild(secret1);
            
            document.getElementById("button").disabled = true; 
            
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxT31f6leVpCv00rioLhvP1eaPxH4G3eLoV5hPf-WvCE100l1TI-uOgSMsghbbGT0Mb/exec'
            
            fetch(scriptURL, { method: 'POST', body: new FormData(form1)})
            .then(response => {
                document.getElementById("AlertMessage").style.display = "block";
                document.getElementById('AlertContent').innerHTML = "Your registration details has been saved!<br>Please login to continue...";
                document.getElementById('Alertbutt').innerHTML = "Login";
                document.getElementById("button").disabled = false; 
                document.getElementById('Alertbutt').setAttribute('onclick', 'loginLayoutFunction()');
            })
            .catch(error => console.error('Error!', error.message))
        }
        else{
            document.getElementById("AlertMessage").style.display = "block";
            document.getElementById('AlertContent').innerHTML = "Invalid OTP!";
        }
    }
}

function resendOTP(){
    document.getElementById("button").disabled = true; 
    var email = document.getElementById('emailInput');
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ayushkumar274549@gmail.com",
        Password : "EAA9DA0DAE37F35F373396815718611507D9",
        To : email.value.toString(),
        From : "ayushkumar274549@gmail.com",
        Subject : "OTP to signup for play.ultimate",
        Body : "Your OTP to join play.ultimate is "+otp
    }).then(
      message => {
        document.getElementById("AlertMessage").style.display = "block";
        document.getElementById('AlertContent').innerHTML = "OTP has been sent to your email address!";
        document.getElementById("button").disabled = false; 
    });
}

function login(){
    var email = document.getElementById('emailInput');
    var password = document.getElementById('passwordInput')
    if(email.value.toString()=='' || password.value.toString()==''){
        document.getElementById("AlertMessage").style.display = "block";
        document.getElementById('AlertContent').innerHTML = "The form is not completely filled!";
    }
    else{
        var email1="";
        var password1;
        var name1;
        var secret1;
        var phone1;

        document.getElementById("button").disabled = true; 

        fetch('https://script.google.com/macros/s/AKfycbxT31f6leVpCv00rioLhvP1eaPxH4G3eLoV5hPf-WvCE100l1TI-uOgSMsghbbGT0Mb/exec')
        .then(res => res.json())
        .then(data => {
            for(let i=1; i<data['content'].length; i++){
                if(email.value.toString().toLowerCase()==data["content"][i][0].toLowerCase()){
                    email1=data["content"][i][0].toLowerCase();
                    password1=data["content"][i][2];
                    name1=data["content"][i][1];
                    secret1=data["content"][i][3];
                    phone1=data["content"][i][4];
                    break;
                }
            }
            if(email1==""){
                document.getElementById("AlertMessage").style.display = "block";
                document.getElementById('AlertContent').innerHTML = "User not found!";
                document.getElementById("button").disabled = false; 
            }
            else{
                if(password.value.toString()!=password1){
                    document.getElementById("AlertMessage").style.display = "block";
                    document.getElementById('AlertContent').innerHTML = "Invalid password!";
                    document.getElementById("button").disabled = false; 
                }
                else{
                    document.getElementById('emailInput').style.display = 'none';
                    document.getElementById('password').style.display = 'none';
                    document.getElementById('passwordInput').style.display = 'none';
                    document.getElementById('button').style.display = 'none';
                    document.getElementById('bottomText').style.display = 'none';
                    document.getElementById('name').style.display = 'block';
                    document.getElementById('phone').style.display = 'block';
                    document.getElementById('secret').style.display = 'block';
                    document.getElementById('name').innerHTML = "Name: "+name1;
                    document.getElementById('email').innerHTML = "Email: "+email1;
                    document.getElementById('phone').innerHTML = "Phone: "+phone1;
                    document.getElementById('secret').innerHTML = "Secret: "+secret1;
                    document.getElementById('passEye').style.display = "none";
                }
            }
            
        });
    }
}

function seePass(){
    if(document.getElementById('passwordInput').type=="password"){
        document.getElementById('passwordInput').type="text";
        document.getElementById('passEye').classList.remove("fas");
        document.getElementById('passEye').classList.remove("fa-eye");
        document.getElementById('passEye').classList.add("fa-solid");
        document.getElementById('passEye').classList.add("fa-eye-slash");
    }
    else{
        document.getElementById('passwordInput').type="password";
        document.getElementById('passEye').classList.add("fas");
        document.getElementById('passEye').classList.add("fa-eye");
        document.getElementById('passEye').classList.remove("fa-solid");
        document.getElementById('passEye').classList.remove("fa-eye-slash");
    }
}
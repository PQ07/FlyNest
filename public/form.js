const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn =document.querySelector('.btn');
const phonenumber =document.querySelector('.phone')|| null;
const fname =document.querySelector(".name")|| null;
const lname =document.querySelector(".lname")|| null;

if(fname==null){
    submitBtn.addEventListener('click', ()=>{
        fetch('/login-user',{
            method: 'post',
            headers: new Headers({'Content-Type' : 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res=>res.json())
        .then(data=>{
            // validateData(data);

            if(data.name){
                sessionStorage.name = data.name;
                sessionStorage.email = data.email;
                location.href = '/';

            }
            else{
                alert("Please Enter Valid Details");
            }
        })
    })
}
else{
    submitBtn.addEventListener('click', ()=>{
        fetch('/register-user',{
            method: 'post',
            headers: new Headers({'Content-Type' : 'application/json'}),
            body: JSON.stringify({
                fname: fname.value,
                lname: lname.value,
                phonenumber: phonenumber.value,
                email: email.value,
                password: password.value
            })
            })
            .then(res=>res.json())
            // alert('Register Successful')
            .then(data=>{
                if(data.name){
                    sessionStorage.name = user.name;
                    sessionStorage.email = user.email;
                    location.href = '/';
                    alert('Register Successful')
                }else{
                    alert(data);
                }
                // alert(data.name);

            })
        })
    }
// const validateData = (data) => {
//     if(!data.name){
//         alertBox(data);
//     } else{
//         sessionStorage.name = data.name;
//         sessionStorage.email = data.email;
//         location.href = '/';
//     }
// }

// const alertBox = (data) => {
//     const alertContainer = document.querySelector('.alert-box');
//     const alertMsg = document.querySelector('.alert');
//     alertMsg.innerHTML = data;

//     alertContainer.style.top = `5%`;
//     setTimeout(() => {
//         alertContainer.style.top = null;
//     }, 5000);
// }
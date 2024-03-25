const submit = document.getElementById('submit');
const continu = document.getElementById('continue');
const cardHolder = document.getElementById('card-holder');
const cardNumber = document.getElementById('card-number');
const dateFront = document.getElementById('date-front');
const errorCardNumber = document.getElementById('error-card-number');
const MMYY = document.getElementById('MMYY');
const messegerCVC = document.getElementById('CVC-messenger');

const thankYou = document.getElementById('thank-you');
const form = document.getElementById('form');

const MM = document.getElementById('MM');
const YY = document.getElementById('YY');
const CVC = document.getElementById('CVC');

const numberFront = document.getElementById('number-front');
const numberBack = document.getElementById('number-back');

const fechaActual = new Date();
const añoActual = fechaActual.getFullYear();
const ultimosDigitos = añoActual.toString().slice(-2)

const verificacionName = ()=>{
    const cardHolderValue = cardHolder.value;
    if(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(cardHolderValue)){
        const nameUser = document.getElementById('name-user');
        nameUser.textContent = cardHolderValue;
        return true;
    }else{
        cardHolder.value = "";
        cardHolder.placeholder = "e.g. Jane Appleseed";
    }
}

const verificacionCardNumber = ()=>{
    if(cardNumber.value.length < 19){
        errorCardNumber.textContent = "Wrong format, numbers only"
    }else{
        errorCardNumber.textContent = " ";
        numberFront.textContent = cardNumber.value;
        return true;
    }
}

const verificacionMMYY = ()=>{
    if ((MM.value > 0 && MM.value < 13) && (YY.value > ultimosDigitos) && (MM.value.length === 2 && YY.value.length === 2)) {
        MMYY.textContent = "";
        dateFront.textContent = `${MM.value}/${YY.value}`;
        return true;
    } else {
        MMYY.textContent = "Can't be blank";
        dateFront.textContent = `00/00`
    }
}

const verificacionCVC = ()=>{
    if(CVC.value !== "" && CVC.value.length === 3 && CVC.value > 1){
        numberBack.textContent = CVC.value;
        messegerCVC.textContent="";
        return true;
    }else{
        numberBack.textContent = "000";
        messegerCVC.textContent="Can't be blank";
    }
}

const verificacionFormulario = (e)=>{
    e.preventDefault();

    verificacionName();
    verificacionCardNumber(); 
    verificacionMMYY();
    verificacionCVC();

    if(verificacionName() !== undefined && !verificacionCardNumber() !== undefined && !verificacionMMYY() !== undefined && !verificacionCVC() !== undefined){
        thankYou.style.display= "flex";
        form.style.display= "none";
    }


    continu.addEventListener('click', ()=>{
        thankYou.style.display= "none";
        form.style.display= "flex";
    })
}

cardNumber.addEventListener('input', function(e){
    let trimmedValue = this.value.replace(/\D/g, '');
    let formattedValue = '';

    for (let i = 0; i < trimmedValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += trimmedValue[i];
    }

    this.value = formattedValue;
    if (this.value.length > 19) {
        this.value = this.value.slice(0, 19);
    }
})

submit.addEventListener('click', verificacionFormulario)
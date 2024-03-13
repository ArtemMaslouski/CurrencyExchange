const xhr = new XMLHttpRequest();
xhr.open("GET","https://api.nbrb.by/exrates/currencies");

let massive = [];

xhr.onload = (request,response) =>{
    if(xhr.status == 200){
        let apiResponse = JSON.parse(xhr.response);
        
        for(let i = 227;i < apiResponse.length - 1;i++){
            if(apiResponse[i].Cur_Name == 249){
                continue;
            }
            massive[i] = apiResponse[i].Cur_Name_Eng;
        }

        massive.forEach(function(i){
            let select = document.querySelector('#secondCurrency');
            let option = document.createElement("option");
            option.textContent = i;
            option.value = i;
            select.append(option);
        })
        
        let firstCurrency = document.querySelector("#currencyValue1");
        firstCurrency.addEventListener("mouseover",function(){
            firstCurrency.style.border = "2px solid black";
        })

        firstCurrency.addEventListener("mouseout",function(){
            firstCurrency.style.border = '';
        })

        let secondCurrency = document.querySelector("#currencyValue2");
        secondCurrency.addEventListener("mouseover",function(){
            secondCurrency.style.border = '2px solid black';
        });

        secondCurrency.addEventListener("mouseout",function(){
            secondCurrency.style.border = '';
        })

        secondCurrency.addEventListener("change",function(){
            let currentID;
            let select = document.querySelector('#secondCurrency');
            let currentName = select.value;

            for(let i = 227;i < apiResponse.length - 1;i++){
                if(apiResponse[i].Cur_Name_Eng == currentName){
                    currentID = apiResponse[i].Cur_ID;
                }
            }
            
            const req = new XMLHttpRequest();
            req.open("GET","https://api.nbrb.by/exrates/rates/" + currentID);
            req.onload = (request,response) => {
               let currency = JSON.parse(req.response);
               firstCurrency.value = currency.Cur_OfficialRate / currency.Cur_Scale * secondCurrency.value;
            }

            req.send();
        })
    }
    else{
        console.log("Something went wrong");
    }
}
xhr.send();
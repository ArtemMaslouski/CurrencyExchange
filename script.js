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
            massive[i] = apiResponse[i].Cur_Name;
        }

        massive.forEach(function(i){
            let select = document.querySelector('#secondCurrency');
            let option = document.createElement("option");
            option.textContent = i;
            option.value = i;
            select.append(option);
        })
    }
    else{
        console.log("Something went wrong");
    }
}

xhr.send();
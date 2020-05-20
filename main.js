
const fetch = require("node-fetch");
const url = "https://project529.com/garage/bikes/search_results";
const searchPostal = "K2C3K1";  //Exp farm
const searchRadius = 50;        //in km
const searchString = "utf8=%E2%9C%93&search_client=1&include_stolen=true&include_sightings=true&search_external=true&sort=reported_on&is_security=false&organization_id=&serial=&shield=&radius="+searchRadius+"&%5Bradius_units%5D=km&postal_code="+searchPostal+"&%5Bcountry_code%5D=CA&make=&search_form%5Bmanufacturer_id%5D=&search_form%5Bbike_model_id%5D=&search_form%5Bbike_build_id%5D=&model=&%5Bprimary_color%5D=&%5Bbike_type%5D=&full_text=&shielded_only=false&stolen_only=&commit=Search"



const getBikesData = async (url, searchStr) => {
    try {
        return fetch(url, {
            "headers": {
                "accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
                "accept-language": "en-CA,en-US;q=0.9,en;q=0.8,fr-CA;q=0.7,fr;q=0.6,en-GB;q=0.5",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": "MkZbw+vIe6QXBTUBE3N3i6Ckfqm0LGsaxSPisqMUy/+taRdPX26R/hm1uK2n+qy5oP91LGNFTyyjTcx7ZBKabQ==",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "time_zone=America%2FHavana; time_zone=America%2FHavana; _P529Garage_session=1f537bfe5b0b52e2fea86978b5b9ee5f3; _ga=GA1.2.861639947.1589474587; time_zone=America%2FHavana; _gid=GA1.2.1104248855.1589948978; __unam=b0de3e0-17214362cea-7aac0c2-6"
            },
            "referrer": "https://project529.com/garage/bikes/search",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": searchStr,
            "method": "POST",
            "mode": "cors"
        })
        .then(reply => {
            return reply.text()
        })
        .then(text => {
            return fetch("https://project529.com"+text.match(new RegExp("url: '(.*)',"))[1]);
        })
        .then(reply => {
            return reply.text();
        })
        .then(text => {
            return JSON.parse(text)
        })
    } catch (error) {
        console.log(error);
    }
};


  
getBikesData(url, searchString)
.then(json => {
    console.log("Received info on",json.length,"bikes");

})


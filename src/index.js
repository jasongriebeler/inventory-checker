let itemNos = [
    "20265513",
    "60265460",
    "60284581",
    "40265456",
    "10265523",
    "50265470",
    "60435599",
    "30265466",
    "00265509",
    "80265398",
    "30265386"
];

let items = [];
let mappedResult = itemNos.map(itemNo => {
    return Promise.all([ getProductDetail(itemNo), getAvailability(itemNo) ])
        .then(result => {
            let productDetail = result[0];
            let availabilityDetail = result[1];
            return items.push({
                messageType: availabilityDetail.messageType,
                ...productDetail
            });
        });
});

Promise.all(mappedResult).then(() => console.table(items))

function getAvailability(itemNo) {
    return fetch(`https://api.ingka.ikea.com/cia/availabilities/ru/us?itemNos=${itemNo}&expand=StoresList,Restocks,SalesLocations`, {
        "headers": {
            "accept": "application/json;version=2",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-client-id": "b6c117e5-ae61-4ef5-b4cc-e0b1e37f0631",
            "Referer": "https://www.ikea.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    })
    .then(response => response.json())
    .then(response => {
        let data = response.availabilities.find(avail => avail.hasOwnProperty("availableForHomeDelivery"));
        return {
            itemNo: data.itemKey.itemNo,
            messageType: data.buyingOption.homeDelivery.availability.probability.thisDay.messageType
        }
    });
}

function getProductDetail(itemNo) {
    return fetch(`https://api.ingka.ikea.com/salesitem/communications/ru/us?itemNos=${itemNo}&expand=childItems`, {
        "headers": {
            "accept": "application/json;version=2",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-client-id": "0b0cb44f-194c-42eb-a996-4cc165bd902a",
            "Referer": "https://www.ikea.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    }).then(response => response.json())
    .then(response => {
        let productDetail = response.data[0].localisedCommunications.find(comm => comm.languageCode ==="en" && comm.countryCode === "US");
        return {
            itemNo: itemNo,
            productName: productDetail.productName,
            productType: productDetail.productType.name
        }
    });
}




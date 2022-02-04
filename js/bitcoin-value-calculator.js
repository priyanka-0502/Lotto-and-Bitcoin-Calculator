
async function getBitcoinValue() {
    const inputDate = document.getElementById("dateTimeInput").value;
    const dateObj = new Date(inputDate);
    const todayDate = new Date();
    const datepart = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    const todayDatePart = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    if (datepart > todayDatePart) {
        document.getElementById("displayValue").innerHTML = "No data available for future date";
        return 0;
    }
    const day = ('0' + dateObj.getDate()).slice(-2) + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getFullYear();
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=" + day;
    const currenturl = 'https://api.coingecko.com/api/v3/coins/bitcoin';
    return await fetch(url)
        .then(response => response.json())
        .then(market_data => {
            if ((market_data.market_data !== null) && (market_data.market_data !== undefined)) {
                //console.log(market_data.market_data);
                //console.log(market_data.market_data.current_price.eur);
                var historicalPrice = market_data.market_data.current_price.eur;
            } else {
                document.getElementById("displayValue").innerHTML = 'No data of bitcoin for this date';
                return 0;
            }
            return fetch(currenturl)
                .then(response => response.json())
                .then(market_data => {
                    //console.log(market_data.market_data.current_price.eur);
                    const todaysBitcoinPrice = market_data.market_data.current_price.eur;
                    const bitcoinPurchased = 100 / historicalPrice;
                    const todaysBitcoinValue = bitcoinPurchased * todaysBitcoinPrice;
                    //console.log(todaysBitcoinValue);
                    document.getElementById("displayValue").innerHTML = (todaysBitcoinValue.toFixed(2)).toString() + " €";
                })
        })
}
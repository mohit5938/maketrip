

var config = {
    method: 'get',
    url: 'https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=ed95b46ad512461581e1ab7dce4b32b7',
    headers: {}
};

axios(config)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

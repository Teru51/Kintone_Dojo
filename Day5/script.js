(($) => {
  'use strict';
  $('#zipSearch').click(() => {
    const zipcode = $('#zipCode').val();
    $.ajax({
      url: 'https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query=' + encodeURI(zipcode) + '&appid=dj00aiZpPVhVVzh1V01mOXpsRSZzPWNvbnN1bWVyc2VjcmV0Jng9M2M-&output=json',
      dataType: 'jsonp',
      success: (response) => {
        console.log(response);
        const stations = [];
        for (let i = 0; i < Object.keys(response.Feature[0].Property.Station).length; i++) {
          stations.push(response.Feature[0].Property.Station[i].Name);

        }
        const geo = response.Feature[0].Geometry.Coordinates.split(',');
        $('.addressTable td').eq(0).text(response.Feature[0].Property.Address);
        $('.addressTable td').eq(1).text(geo[0]);
        $('.addressTable td').eq(2).text(geo[1]);
        $('.addressTable td').eq(3).text(stations);

      },
      error: (response) => {
        event.error = '郵便番号から住所の検索に失敗しました';
      }
    });
  });
})($);
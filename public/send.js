//var json = {'username':"yusuf123"}
function send(uri,jsondata,callback){
    $.ajax({
        type: "POST",
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(jsondata),
        cache: false,
        success: function(data) {
            callback(data);
        },
        error: function(error){
            callback(error);
        }
    });
   }
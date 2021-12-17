$(document).ready(function() {
    var timeout = null;
    $("#username").keyup(function() {
       $("#response").text("Kullanıcı kontrol ediliyor");
        var value = this.value;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            var json = {'username':value}
            console.log(json);
            send("finduser",json,function(data){
                if(data=="yes"){
                    $("#gonder").prop("disabled",false);
                    $("#response").text("Kullanıcı adı uygun")
                }
                else{
                    $("#gonder").prop("disabled",true);
                    $("#response").text("Kullanıcı Adı Zaten Alınmış")
                }
            })
           
        },200)
    })


});    
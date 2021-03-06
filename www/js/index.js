    function scanBarcode() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if(result.cancelled == 0) {
                    navigator.notification.alert("Result: " + result.text + "\n", function(){}, "", "");
                }
            }, 
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }

    function getImage() {
        // Открываем галерею
        navigator.camera.getPicture(uploadPhoto, function(message) {
                    alert(message);
            },{
                    quality: 50, 
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            }
        );

    }

    function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
 
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false;
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://demo.testindev.com/", win, fail, options);
    }


    //если все хорошо
    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        alert(r.response);
    }

    //если ошибка
    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
    }
    
    function getUserList() {
        url = "http://api.testindev.com/api/v1/users";
        var username = 'admin';
        var password = '123456';
        
        $.ajax({
            type: "GET",
            url: url,
            timeout: 60 * 1000,
            beforeSend: function(xhr) { 
                xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password)); 
            }
        }).done(function (data) {
            alert(data.data[0][0].name);
        }).fail(function () {
            alert('Service is temporarily unavailable');
        });
    }
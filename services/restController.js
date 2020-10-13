class RestController{
    constructor(){        
    }

    get(url,onSuccess,onError){
        $('.loader').show();
        $.get({
            url: url,
            success: onSuccess
            });
    }

    post(url,data,onSuccess,onError){
        $('.loader').show();
        $.post({
            url: url,
            data:JSON.stringify(data),
            error: onSuccess,      //Abbiamo un problema
            dataType: JSON,
            contentType:"application/json",
            });
    }

    patch(url,data,onSuccess,onError){
        $.ajax({
            type: 'PATCH',
            url: url,
            data: JSON.stringify(data),
            processData: false,
            contentType: 'application/merge-patch+json',
            success: onSuccess
        });         
    }

    put(url,data,onSuccess,onError){
        
        var myJson = JSON.stringify(data)

        $.ajax({
            type: 'PUT',
            url: url,
            data: myJson,
            processData: false,
            dataType: JSON,
            contentType:"application/json",
            success: onSuccess,
            error: onError
        });         
    }

    delete(url,onSuccess,onError){
        $.ajax({
            url: url,
            type: 'DELETE',
            success: onSuccess
        });
    }

}
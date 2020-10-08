class RestController{
    constructor(){        
    }

    get(url,onSuccess,onError){
        $.get({
            url: url,
            success: onSuccess
            });
    }

    post(url,data,onSuccess,onError){
        $.post({
            url: url,
            data:JSON.stringify(data),
            success: onSuccess
            });
    }

    patch(url,data,onSuccess,onError){
        $.ajax({
            type: 'PATCH',
            url: url,
            data: JSON.stringify(data),
            processData: false,
            contentType: 'application/json-patch+json',
            success: onSuccess
        });         
    }

    put(url,data,onSuccess,onError){
        $.ajax({
            type: 'PUT',
            url: url,
            data: JSON.stringify(data),
            processData: false,
            contentType: 'application/json-patch+json',
            success: onSuccess
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
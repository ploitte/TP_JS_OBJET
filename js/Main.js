var app = new App();
var flagCheck = false;


app.main = function(){
    
    app.readFest();


    $(".removeFest").click(function(){
        app.removeFest();
    });


    app.map.addListener('click', function(event) {
        
        for(a of app.festival){
            
            console.log(a.markers);
        }
        
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        app.$latitude.val(lat);
        app.$longitude.val(lng);
    });

    $(".search").click(function(){
        var args = [];
        $(this).filter(":checked").each(function(){
            args.push($(this).val()); 
        });
        app.filter(args);
    })

    $(".add").click(function(){

        for(a of app.festival){
        }


        if(app.flagAdd == false){
            $(this).addClass("test");
            $(this).removeClass("test2");
            $(".popAdd").css("left", "1%");
            setTimeout(function() {
                $(".add").css("background-image", "url('./images/remove.png')");
                $(this).removeClass("test2");
                app.flagAdd = true;
            }, 700);
        }

        if(app.flagAdd == true){
            $(this).addClass("test2");
            $(this).removeClass("test");
            setTimeout(function() {
                $(".popAdd").css("left", "-50%");
            }, 500);
            setTimeout(function() {
                $(".add").css("background-image", "url('./images/add.png')");
                app.flagAdd = false;
            }, 700);

        }
        
        setTimeout(function() {
            $(this).css("background-image", "url('../images/remove.png')")
        }, (800));
    });

    app.$formAdd.submit(function(event){
        event.preventDefault();
        
        var $name = app.$name.val();
        var latitude = app.$latitude.val();
        var longitude = app.$longitude.val();
        if(app.$date_debut.val().length > 0 && app.$date_fin.val().length > 0){
            var debut = app.$date_debut.datepicker("getDate");
            var $date_debut2 = debut.getDay() + "/" + (debut.getMonth() + 1) + "/" + debut.getFullYear();
            var fin = app.$date_fin.datepicker("getDate");
            var $date_fin2 = fin.getDay() + "/" + (fin.getMonth() + 1) + "/" + fin.getFullYear();
        }
        var types  = [];
        var other = app.$other.val();
        var type;
        if(!$("#Autre").is(":checked")){
            var $type = $(".type:checked").each(function(){
                types.push($(this).val());
            });
        }
        
        if(other.length > 1){
            types.push(other);
        }

        if(!$(".type").is(":checked")){
            return false; // Retourne les erreurs
        }else{
            var festoche = new Festival($name, latitude, longitude, types, $date_debut2, $date_fin2);
            app.addFestival(festoche);
            var marker = festoche.addMarker(app.map);
            festoche.infoMarker(marker, app.map);
            app.map.setCenter(festoche.pos);
        }
    });

        app.$checkBox.click(function(){
            var args = [];
            app.$checkBox.filter(":checked").each(function(){
                args.push($(this).val());
            });
            app.filter(args);
        });
        
    
        $("#Autre").click(function(){
            if($(this).is(":checked")){
                $("#other").slideDown();
            }else{
                $("#other").slideUp();
            }
        });

};

window.onbeforeunload = function(){
    app.saveFest();
}
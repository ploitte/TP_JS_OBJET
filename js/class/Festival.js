class Festival{

    constructor(
        name,
        latitude,
        longitude,
        type,
        date_debut,
        date_fin){
        //Construct
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.pos = {
            lat: parseFloat(this.latitude),
            lng: parseFloat(this.longitude)
        };
        this.type = type;
        this.date_debut = date_debut;
        this.date_fin = date_fin;

        //DOM
        this.$dom;

        //Marker
        this.markers = [];

    }

    addMarker( map ){
        var iconBase = "./images/";
        var png = ".png";
        var icons = {
            Classique:{
                name: "Classique",
                img: iconBase + "Classique" + png
            },
            Jazz:{
                name: "Jazz",
                img: iconBase + "Jazz" + png
            },
            Metal:{
                name: "Metal",
                img: iconBase + "Metal" + png
            },
            Rap:{
                name: "Rap",
                img: iconBase + "Rap" + png
            },
            Rock:{
                name: "Rock",
                img: iconBase + "Rock" + png
            }
        }; 

        var types = [];
        var check = $(".type");
        var icon = false;
        if(this.type.length > 1){
            icon = "./images/multi.png";
        }
        else {
            for(var a in icons){
                var string = icons[a].name;

                for(var type of this.type){

                    if(string == this.type){
                        icon = icons[a].img;
                        break;
                    }

                }

                if(icon != false){
                    break;
                }
            }
        }

        if( icon == false ){
            icon = "./images/Autre.png";
        }

        var marker = new google.maps.Marker({
            position: this.pos,
            map: map,
            icon: icon
        });

        //Créer


        /*if(!$("#Autre").is(":checked")){
            if(this.type.length == 1){
                var marker = new google.maps.Marker({
                    position : this.pos,
                    map: map,
                    icon: icons[this.type].img
                });
            }
            else if(this.type.length > 1){
                var marker = new google.maps.Marker({
                    position : this.pos,
                    map: map,
                    icon: "./images/multi.png"
                }); 
            }
        }
        else if($("#Autre").is(":checked")){
            var marker = new google.maps.Marker({
                position: this.pos,
                map: map,
                icon: "./images/Autre.png"
            });
        }if(!$("#Autre").is(":checked")){

            if(this.type.length == 1){
                var marker = new google.maps.Marker({
                    position : this.pos,
                    map: map,
                    icon: icons[this.type].img
                });
            }
            else if(this.type.length > 1){
                var marker = new google.maps.Marker({
                    position : this.pos,
                    map: map,
                    icon: "./images/multi.png"
                }); 
            }
        }
        else if($("#Autre").is(":checked")){
            var marker = new google.maps.Marker({
                position: this.pos,
                map: map,
                icon: "./images/Autre.png"
            });
        }*/
        
        this.markers.push(marker);
        return marker;
    };

    infoMarker(marker, map){
        var info = new google.maps.InfoWindow({
            content : this.display()
            });
        marker.addListener("click", function(){
            info.open(map, marker);
        });
    }

    display(){
        var div = "<table><tr><td>" + this.name + "</td></tr>";
        div += "<tr><td>Type(s): </td><td>" + this.type + "</td></tr>";  
        div += "<tr><td>Debut: </td><td>" + this.date_debut + "</td></tr>";
        div += "<tr><td>Fin: </td><td>" + this.date_fin + "</td></tr>";        
        div += "</table>"; 
        return div;
    }

    stringifiable(){
        this.markers = null;
    }
}

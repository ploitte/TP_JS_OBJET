class App{

    constructor(){

        //Flag
        this.flagAdd = false;
    
        //DOM
        this.$map = $("#map");

        //Form Ajout Festival
        this.$formAdd = $("#addfest")

        this.$name = $("#name");
        this.$latitude = $("#latitude");
        this.$longitude = $("#longitude");
        this.$type = $(".type");
        this.$other = $("#other");
        this.$date_debut = $("#date_debut");
        this.$date_fin = $("#date_fin");
        this.$autre = $("#Autre");

        this.$checkBox = $("#formSearch input[type=checkbox]");


        //Variable de base
        this.map = null;
        this.myPos = {};
        this.festival = [];
        //Fonction d'init
        this.main = null;

        this.initPickers();

    }

    getMyPosition(){
        var that = this;
        navigator.geolocation.getCurrentPosition(function(position){
            that.myPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            that.map.setCenter(that.myPos);
        });
    }

    initMap(){
        this.map = new google.maps.Map(this.$map[0], {
            center: {lat: 10, lng: 10},
            zoom: 8,
            styles:[
            {elementType: 'geometry', stylers: [{color: '#f4a460'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#a52a2a'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#a52a2a'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#05581D'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#05581D'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#a52a2a'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffff00'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#5f9ea0'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            } 
            ]
        });
        this.getMyPosition();
        this.main();
    }

    initPickers(){
        var option = {
            dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
            monthNames : ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
            monthNamesShort : ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
            Format: "mm/dd/yyyy",
            firstDay : 1
        };
        this.$date_debut.datepicker(option);
        this.$date_fin.datepicker(option);
    }
    
    addFestival( newFestival ){

        this.festival.push(newFestival);

    }

    saveFest(){
      for(var festival of this.festival){
        console.log(festival);
        festival.stringifiable();
      }
      var festJson = JSON.stringify(this.festival);
      localStorage.setItem("festivals", festJson);
    }

    readFest(){
      var festJson = localStorage.getItem("festivals");
      var festival = JSON.parse(festJson);

      if(!festival){
        return false;
      }

      for(var festObj of festival){
        var fest = new Festival(festObj.name,
                                festObj.latitude,
                                festObj.longitude,
                                festObj.type,
                                festObj.date_debut,
                                festObj.date_fin);
        var marker  = fest.addMarker(this.map);
        fest.infoMarker(marker, app.map);
        this.addFestival(fest);
      };
    }

    removeFest(){
      localStorage.removeItem("festivals");
      this.festival = [];
    }
  
    //SERVICE ICI

    filter(arg){
      for(var a of this.festival){

        var marker = a.markers[0];
        marker.setMap(null);

          for(var b of arg){ 

            for(var c of a.type){

              if(c == b){
                marker.setMap(this.map);
              }
            }   
          }
      }
    }
}

//basic functions
function getColor(d) {
return d === "c1" ? "#6EB061" :
     d === "c2"  ? "#6EB061" :
     d === "c3"  ? "#6EB061" :
     d === "c4"  ? "#6195B0" :
     d === "c5"  ? "#6195B0" :
     d === "c6"  ? "#A361B0" :
     d === "c7"  ? "#6195B0" :
     d === "c8"  ? "#6EB061" :
     d === "c9"  ? "#B07B61" :
     d === "c10" ? "#6EB061" :
     d === "c11" ? "#666666":
          "#FFEDA0";
}

function featureColor(d) {
return d === 1 ? "#DB308B":
    d === 0 ? "#CCBEC5":
    "green";
}

function featureOpacity(d) {
return d === 1 ? "0.8":
    d === 0 ? "0.4" :
    "0.8";
}

function getOpacity(d) {
return d === "c11" ? "0.0":
              "0.8";
}

function radiusZoomCalculator(z) {
return z === 15 ? 6:
     z === 16 ? 7:
     z === 17 ? 8:
     z === 18 ? 8:
  4;
}

var curryTypeKey = {
 "c1": "Curry Udon カレーうどん",
 "c2": "European Curry 欧風カレー",
 "c3": "Soup Curry スープカレー",
 "c4": "Pakistani Curry パキスタンカレー",
 "c5": "Nepali Curry ネパールカレー",
 "c6": "Thai Curry タイカレー",
 "c7": "Indian Curry インドカレー",
 "c8": "Curry Rice カレーライス",
 "c9": "Other Curry",
 "c10": "Curry Chain (Coco, Matsuya, etc.)",
 "c11": "Train/Metro Station"
};

function clickableFilter(d) {
return d === "c11" ? false:
              true;
}

var legendKey = {
  "Japanese Curry": "c8",
  "S. Asian Curry": "c7",
  "Thai Curry": "c6",
  "Other Curry": "c9"
};

//leaflet-specific functions
var lastClickedLayer;

function highlightFeature(e) {
    geojson.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    var layer = e.target;

    layer.setStyle({
      weight: 4,
      radius: 8,
      color: '#E81C89',
      dashArray: '',
      fillOpacity: 0.9
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }

    infoControl.update(layer.feature.properties);
    instaControl.update(layer.feature.properties);
    titleControl.update(layer.feature.properties);
    lastClickedLayer = layer;
  }

function onEachFeature(feature, layer) {
  layer.on({
    click:  function highlightFeature(e) {
    geojson_c1.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c2.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c3.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c4.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c5.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c6.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c7.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c8.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c9.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    geojson_c10.setStyle({weight: 0, radius: radiusZoomCalculator(map.getZoom())});
    var layer = e.target;

    layer.setStyle({
      weight: 4,
      radius: 8,
      color: '#E81C89',
      dashArray: '',
      fillOpacity: 0.9
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }

    infoControl.update(layer.feature.properties);
    instaControl.update(layer.feature.properties);
    titleControl.update(layer.feature.properties);
    lastClickedLayer = layer;
    feature.layer = layer;
  }
  });
}

//Initializing and adding map
  var map = L.map("map", {zoomControl: false})
.setView([35.679391, 139.710608], 13);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

//Reference dummy geojson variable before it's designated as a leaflet object
var geojson;

//Control used with onEachFeature that updates info after click, adds restaurant info to div infotext
var infoControl = L.control(geojson);

infoControl.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'infotext');
  this.update();
  return this._div;
};

infoControl.update = function (props) {
  this._div.innerHTML = (props ?
    '<b>Name: </b>' + props.name + ' <a href="' + props.site_link + '" target="_blank">(view on Tabelog)</a><br />' +
    '<b>Type: </b>' + curryTypeKey[props.category] + '<br />' +
    '<b>Closest Station: </b>' + props.station + '<br />' +
    '<b>Address: </b>' + props.full_address + ' <a href="http://maps.google.com/?q=' + props.full_address + '" target="_blank">(Google Maps)</a>'
    : '<b>Select a Curry for Info</b>');
};

infoControl.addTo(map);

infoControl._container.remove();

document.getElementById('infocontrol').appendChild(infoControl.onAdd(map));

//Control used with onEachFeature that updates info after click, adds restaurant info to div infotext
var titleControl = L.control(geojson);

titleControl.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'titletext');
  this.update();
  return this._div;
};

titleControl.update = function (props) {
  var w = window.innerWidth;
  if (w < 767) {
  this._div.innerHTML = (props ?
    '<b>' + props.name + ' </b> (click for info)'
    : '<b>Select a Curry for Info</b>');
  }
  else {
  this._div.innerHTML = (props ?
    '<b>' + props.name + ' </b></i>'
    : '<b>Select a Curry for Info</b>');
  }
};

titleControl.addTo(map);

titleControl._container.remove();

document.getElementById('titlespace').appendChild(titleControl.onAdd(map));

//Control used with onEachFeature that updates info after click, adds insta photos to div photos using instafeed if available
var instaControl = L.control(geojson);

instaControl.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'p');
  this.update();
  return this._div;
};

var feed;

instaControl.update = function (props) {
  props ?
  instaloc = props.in
  : instaloc = "error: props isn't loaded yet";
  if (instaloc.length === 0) {
    $('#instafeed').empty();
    noInstaMessage = "<div id='morephotos'>No linked instagram photos yet. <a target='_blank' href='" + props.site_link + "dtlphotolst/1/'>(See photos on Tabelog)</a></div>";
  }
  else if (instaloc.length === 1) {
       $('#instafeed').empty();
      passThisId = parseInt(instaloc[0]);
      feed = new Instafeed({
        get: "location",
        locationId: passThisId,
        clientId: "8b2f37deafcb4e829893bd04dd6caaaa",
        resolution: 'standard_resolution',
        limit: 9,
        after: function () {
							var images = $("#instafeed a");
              $.each(images, function(index, image) {
                var delay = (index * 75) + 'ms';
                $(image).css('-webkit-animation-delay', delay);
                $(image).css('-moz-animation-delay', delay);
                $(image).css('-ms-animation-delay', delay);
                $(image).css('-o-animation-delay', delay);
                $(image).css('animation-delay', delay);
                $(image).addClass('animated flipInX');
              });
							var datadescription = "<a href='http://instagram.com/{{model.user.username}}'>{{model.user.username}}</a>: {{caption}} <br/> {{likes}} Likes";
            },
            template: '<div class="col-xs-3" id="{{id}}" style="padding: 0px; margin 0px;"><a href="{{model.images.standard_resolution.url}}" data-gallery="instaloc" title="{{model.user.username}}: {{caption}}"><img style="width:100%;" src="{{image}}" class="img-responsive"/></a><a href="{{link}}" target="_blank" class="btn btn-default btn-block" role="button"><i class="fa fa-instagram fa-lg"></i></a></div>'
          });
      feed.run();
      noInstaMessage = "<div id='morephotos'><a target='_blank' href='" + props.site_link + "dtlphotolst/1/'>See photos on Tabelog</a></div>";
  }
  else if (instaloc.length === 2) {
    $('#instafeed').empty();
    passThisId = parseInt(instaloc[0]);
    feed = new Instafeed({
      get: 'location',
      locationId: passThisId,
      clientId: '8b2f37deafcb4e829893bd04dd6caaaa',
      resolution: 'standard_resolution',
      limit: 9,
      after: function () {
							var images = $("#instafeed a");
              $.each(images, function(index, image) {
                var delay = (index * 75) + 'ms';
                $(image).css('-webkit-animation-delay', delay);
                $(image).css('-moz-animation-delay', delay);
                $(image).css('-ms-animation-delay', delay);
                $(image).css('-o-animation-delay', delay);
                $(image).css('animation-delay', delay);
                $(image).addClass('animated flipInX');
              });
							var datadescription = "<a href='http://instagram.com/{{model.user.username}}'>{{model.user.username}}</a>: {{caption}} <br/> {{likes}} Likes";
            },
      template: '<div class="col-xs-3" id="{{id}}" style="padding: 0px; margin 0px;"><a href="{{model.images.standard_resolution.url}}" data-gallery="instaloc" title="{{model.user.username}}: {{caption}}"><img style="width:100%;" src="{{image}}" class="img-responsive"/></a><a href="{{link}}" target="_blank" class="btn btn-default btn-block" role="button"><i class="fa fa-instagram fa-lg"></i></a></div>'
          });
    feed.run();
    noInstaMessage = "<div id='morephotos'><a target='_blank' href='" + props.site_link + "dtlphotolst/1/'>See photos on Tabelog</a></div>";
  }
  this._div.innerHTML = (props ?
    noInstaMessage
    : "");
};

instaControl.addTo(map);

instaControl._container.remove();

document.getElementById('photos').appendChild(instaControl.onAdd(map));

//Zoom in top right, zoomcontrol is false for L.map, this is used for custom position
new L.Control.Zoom({ position: 'topright' }).addTo(map);

//Locator Button using L.Control.locate
//Requires font-awesome.min.css for locate icon
L.control.locate({position: "topright"}).addTo(map);

var legend;
var legendHighlight;
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'legend'),
    grades = ["Japanese Curry", "S. Asian Curry", "Thai Curry", "Other Curry"],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(legendKey[grades[i]]) + '"></i>' +
      grades[i] + '</br />';
  }


  return div;
};

legend.addTo(map);

var legendHighlight = L.control({position: 'bottomright'});

legendHighlight.onAdd = function (map) {

var div = L.DomUtil.create('div', 'legendHighlight');

div.innerHTML += '<i style="background:#DB308B"></i> Featured </br /> <i style="background:#CCBEC5"></i> Not Featured'


return div;
};


geojson_c1 = L.geoJson().addTo(map);
geojson_c2 = L.geoJson().addTo(map);
geojson_c3 = L.geoJson().addTo(map);
geojson_c4 = L.geoJson().addTo(map);
geojson_c5 = L.geoJson().addTo(map);
geojson_c6 = L.geoJson().addTo(map);
geojson_c7 = L.geoJson().addTo(map);
geojson_c8 = L.geoJson().addTo(map);
geojson_c9 = L.geoJson().addTo(map);
geojson_c10 = L.geoJson().addTo(map);
stations = L.geoJson().addTo(map);

var stdMarkerPTL = function (data, latlng) {
    return L.circleMarker(latlng,
      {
        radius: radiusZoomCalculator(map.getZoom()),
        fillColor: getColor(data.properties.category),
        color: "#000",
        weight: 0,
        opactiy: getOpacity(data.properties.category),
        fillOpacity: getOpacity(data.properties.category),
        clickable: clickableFilter(data.properties.category)
      });
}

var highlightTabelogPTL = function (data, latlng) {
          return L.circleMarker(latlng,
            {
              radius: radiusZoomCalculator(map.getZoom()),
              fillColor: featureColor(data.properties.tt),
              color: "#000",
              weight: 0,
              opactiy: featureOpacity(data.properties.tt),
              fillOpacity: featureOpacity(data.properties.tt),
              clickable: clickableFilter(data.properties.category)
            });
        }
var highlightMyRecPTL = function (data, latlng) {
          return L.circleMarker(latlng,
            {
              radius: radiusZoomCalculator(map.getZoom()),
              fillColor: featureColor(data.properties.mr),
              color: "#000",
              weight: 0,
              opactiy: featureOpacity(data.properties.mr),
              fillOpacity: featureOpacity(data.properties.mr),
              clickable: clickableFilter(data.properties.category)
            });
        }
var highlightPopeyePTL = function (data, latlng) {
  console.log(data.properties.popi);
  return L.circleMarker(latlng,
    {

      radius: radiusZoomCalculator(map.getZoom()),
      fillColor: featureColor(data.properties.popi),
      color: "#000",
      weight: 0,
      opactiy: featureOpacity(data.properties.popi),
      fillOpacity: featureOpacity(data.properties.popi),
      clickable: clickableFilter(data.properties.category)
    });
}

var highlightnonnoPTL = function (data, latlng) {
  console.log(data.properties.nn);
  return L.circleMarker(latlng,
    {

      radius: radiusZoomCalculator(map.getZoom()),
      fillColor: featureColor(data.properties.nn),
      color: "#000",
      weight: 0,
      opactiy: featureOpacity(data.properties.nn),
      fillOpacity: featureOpacity(data.properties.nn),
      clickable: clickableFilter(data.properties.category)
    });
}

var highlightcmPTL = function (data, latlng) {
  console.log(data.properties.cm);
  return L.circleMarker(latlng,
    {

      radius: radiusZoomCalculator(map.getZoom()),
      fillColor: featureColor(data.properties.cm),
      color: "#000",
      weight: 0,
      opactiy: featureOpacity(data.properties.cm),
      fillOpacity: featureOpacity(data.properties.cm),
      clickable: clickableFilter(data.properties.category)
    });
}

var stationPTL = function(data, latlng) {
  return L.circleMarker(latlng,
      {
        radius: 1,
        fillColor: "white",
        color: "#000",
        weight: 0,
        opactiy: 0,
        fillOpacity: 0,
        clickable: false
      });
}

var currentTopButton = 'highlight_none';

var whichPTL = function (button_select) {
  return button_select === "highlight_none" ? stdMarkerPTL:
      button_select === "top_tabelog" ? highlightTabelogPTL:
      button_select === "my_rec" ? highlightMyRecPTL:
      button_select === "popeye" ? highlightPopeyePTL:
      button_select === "nonno" ? highlightnonnoPTL:
      button_select === "currymag" ? highlightcmPTL:
      stdMarkerPTL;
}

$.getJSON('clayers/tokyocurry_c1.geojson', function(data) {

geojson_c1 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c2.geojson', function(data) {

geojson_c2 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c3.geojson', function(data) {

geojson_c3 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c4.geojson', function(data) {

geojson_c4 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c5.geojson', function(data) {

geojson_c5 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c6.geojson', function(data) {

geojson_c6 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c7.geojson', function(data) {

geojson_c7 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c8.geojson', function(data) {

geojson_c8 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

$.getJSON('clayers/tokyocurry_c9.geojson', function(data) {

geojson_c9 = L.geoJson(data, {
  pointToLayer: stdMarkerPTL,
  onEachFeature: onEachFeature
}).addTo(map);

});

//do something with stations



$('#c1').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c1 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c1);
  }
});

$('#c2').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c2 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c2);
  }
});

$('#c3').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c3 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c3);
  }
});

$('#c4').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c4 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c4);
  }
});

$('#c5').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c5 = L.geoJson(data, {
      pointToLayer:whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c5);
  }
});

$('#c6').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c6 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c6);
  }
});

$('#c7').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c7 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c7);
  }
});

$('#c8').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c8 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c8);
  }
});

$('#c9').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c9 = L.geoJson(data, {
      pointToLayer: whichPTL(currentTopButton),
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c9);
  }
});

$('#c10').change(function() {
  if(this.checked) {
    var gjfile = 'clayers/' + this.value + '.geojson';
    $.getJSON(gjfile, function(data) {

    geojson_c10 = L.geoJson(data, {
      pointToLayer: stdMarkerPTL,
      onEachFeature: onEachFeature
    }).addTo(map);

    });
  }
  else if(!this.checked) {
    map.removeLayer(geojson_c10);
  }
});

$('#highlight_none').change(function() {
  if ($(".legendHighlight").length) {
    map.removeControl(legendHighlight);
    legend.addTo(map);
  }
  if(this.checked) {
    currentTopButton = "highlight_none";
    if(document.getElementById('c1').checked) {
      map.removeLayer(geojson_c1);
      $.getJSON('clayers/tokyocurry_c1.geojson', function(data) {

      geojson_c1 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c2').checked) {
      map.removeLayer(geojson_c2);
      $.getJSON('clayers/tokyocurry_c2.geojson', function(data) {

      geojson_c2 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c3').checked) {
      map.removeLayer(geojson_c3);
      $.getJSON('clayers/tokyocurry_c3.geojson', function(data) {

      geojson_c3 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c4').checked) {
      map.removeLayer(geojson_c4);
      $.getJSON('clayers/tokyocurry_c4.geojson', function(data) {

      geojson_c4 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c5').checked) {
      map.removeLayer(geojson_c5);
      $.getJSON('clayers/tokyocurry_c5.geojson', function(data) {

      geojson_c5 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c6').checked) {
      map.removeLayer(geojson_c6);
      $.getJSON('clayers/tokyocurry_c6.geojson', function(data) {

      geojson_c6 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c7').checked) {
      map.removeLayer(geojson_c7);
      $.getJSON('clayers/tokyocurry_c7.geojson', function(data) {

      geojson_c7 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c8').checked) {
      map.removeLayer(geojson_c8);
      $.getJSON('clayers/tokyocurry_c8.geojson', function(data) {

      geojson_c8 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c9').checked) {
      map.removeLayer(geojson_c9);
      $.getJSON('clayers/tokyocurry_c9.geojson', function(data) {

      geojson_c9 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c10').checked) {
      map.removeLayer(geojson_c10);
      $.getJSON('clayers/tokyocurry_c10.geojson', function(data) {

      geojson_c10 = L.geoJson(data, {
        pointToLayer: stdMarkerPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
  }
});

$('#top_tabelog').change(function() {
  if ($(".legend").length) {
    map.removeControl(legend);
    legendHighlight.addTo(map);
  }
  if(this.checked) {
    currentTopButton = "top_tabelog";
    if(document.getElementById('c1').checked) {
      map.removeLayer(geojson_c1);
      $.getJSON('clayers/tokyocurry_c1.geojson', function(data) {

      geojson_c1 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c2').checked) {
      map.removeLayer(geojson_c2);
      $.getJSON('clayers/tokyocurry_c2.geojson', function(data) {

      geojson_c2 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c3').checked) {
      map.removeLayer(geojson_c3);
      $.getJSON('clayers/tokyocurry_c3.geojson', function(data) {

      geojson_c3 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c4').checked) {
      map.removeLayer(geojson_c4);
      $.getJSON('clayers/tokyocurry_c4.geojson', function(data) {

      geojson_c4 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c5').checked) {
      map.removeLayer(geojson_c5);
      $.getJSON('clayers/tokyocurry_c5.geojson', function(data) {

      geojson_c5 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c6').checked) {
      map.removeLayer(geojson_c6);
      $.getJSON('clayers/tokyocurry_c6.geojson', function(data) {

      geojson_c6 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c7').checked) {
      map.removeLayer(geojson_c7);
      $.getJSON('clayers/tokyocurry_c7.geojson', function(data) {

      geojson_c7 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c8').checked) {
      map.removeLayer(geojson_c8);
      $.getJSON('clayers/tokyocurry_c8.geojson', function(data) {

      geojson_c8 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c9').checked) {
      map.removeLayer(geojson_c9);
      $.getJSON('clayers/tokyocurry_c9.geojson', function(data) {

      geojson_c9 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c10').checked) {
      map.removeLayer(geojson_c10);
      $.getJSON('clayers/tokyocurry_c10.geojson', function(data) {

      geojson_c10 = L.geoJson(data, {
        pointToLayer: highlightTabelogPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
  }
});

$('#my_rec').change(function() {
  if ($(".legend").length) {
    map.removeControl(legend);
    legendHighlight.addTo(map);
  }
  if(this.checked) {
    currentTopButton = "my_rec";
    if(document.getElementById('c1').checked) {
      map.removeLayer(geojson_c1);
      $.getJSON('clayers/tokyocurry_c1.geojson', function(data) {

      geojson_c1 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c2').checked) {
      map.removeLayer(geojson_c2);
      $.getJSON('clayers/tokyocurry_c2.geojson', function(data) {

      geojson_c2 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c3').checked) {
      map.removeLayer(geojson_c3);
      $.getJSON('clayers/tokyocurry_c3.geojson', function(data) {

      geojson_c3 = L.geoJson(data, {
        pointToLayer:  highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c4').checked) {
      map.removeLayer(geojson_c4);
      $.getJSON('clayers/tokyocurry_c4.geojson', function(data) {

      geojson_c4 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c5').checked) {
      map.removeLayer(geojson_c5);
      $.getJSON('clayers/tokyocurry_c5.geojson', function(data) {

      geojson_c5 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c6').checked) {
      map.removeLayer(geojson_c6);
      $.getJSON('clayers/tokyocurry_c6.geojson', function(data) {

      geojson_c6 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c7').checked) {
      map.removeLayer(geojson_c7);
      $.getJSON('clayers/tokyocurry_c7.geojson', function(data) {

      geojson_c7 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c8').checked) {
      map.removeLayer(geojson_c8);
      $.getJSON('clayers/tokyocurry_c8.geojson', function(data) {

      geojson_c8 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c9').checked) {
      map.removeLayer(geojson_c9);
      $.getJSON('clayers/tokyocurry_c9.geojson', function(data) {

      geojson_c9 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c10').checked) {
      map.removeLayer(geojson_c10);
      $.getJSON('clayers/tokyocurry_c10.geojson', function(data) {

      geojson_c10 = L.geoJson(data, {
        pointToLayer: highlightMyRecPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
  }
});

$('#popeye').change(function() {
  if ($(".legend").length) {
    map.removeControl(legend);
    legendHighlight.addTo(map);
  }
  if(this.checked) {
    currentTopButton = "popeye";
    if(document.getElementById('c1').checked) {
      map.removeLayer(geojson_c1);
      $.getJSON('clayers/tokyocurry_c1.geojson', function(data) {

      geojson_c1 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c2').checked) {
      map.removeLayer(geojson_c2);
      $.getJSON('clayers/tokyocurry_c2.geojson', function(data) {

      geojson_c2 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c3').checked) {
      map.removeLayer(geojson_c3);
      $.getJSON('clayers/tokyocurry_c3.geojson', function(data) {

      geojson_c3 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c4').checked) {
      map.removeLayer(geojson_c4);
      $.getJSON('clayers/tokyocurry_c4.geojson', function(data) {

      geojson_c4 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c5').checked) {
      map.removeLayer(geojson_c5);
      $.getJSON('clayers/tokyocurry_c5.geojson', function(data) {

      geojson_c5 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c6').checked) {
      map.removeLayer(geojson_c6);
      $.getJSON('clayers/tokyocurry_c6.geojson', function(data) {

      geojson_c6 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c7').checked) {
      map.removeLayer(geojson_c7);
      $.getJSON('clayers/tokyocurry_c7.geojson', function(data) {

      geojson_c7 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c8').checked) {
      map.removeLayer(geojson_c8);
      $.getJSON('clayers/tokyocurry_c8.geojson', function(data) {

      geojson_c8 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c9').checked) {
      map.removeLayer(geojson_c9);
      $.getJSON('clayers/tokyocurry_c9.geojson', function(data) {

      geojson_c9 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c10').checked) {
      map.removeLayer(geojson_c10);
      $.getJSON('clayers/tokyocurry_c10.geojson', function(data) {

      geojson_c10 = L.geoJson(data, {
        pointToLayer: highlightPopeyePTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
  }
});

$('#currymag').change(function() {
  if ($(".legend").length) {
    map.removeControl(legend);
    legendHighlight.addTo(map);
  }
  if(this.checked) {
    currentTopButton = "currymag";
    if(document.getElementById('c1').checked) {
      map.removeLayer(geojson_c1);
      $.getJSON('clayers/tokyocurry_c1.geojson', function(data) {

      geojson_c1 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c2').checked) {
      map.removeLayer(geojson_c2);
      $.getJSON('clayers/tokyocurry_c2.geojson', function(data) {

      geojson_c2 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c3').checked) {
      map.removeLayer(geojson_c3);
      $.getJSON('clayers/tokyocurry_c3.geojson', function(data) {

      geojson_c3 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c4').checked) {
      map.removeLayer(geojson_c4);
      $.getJSON('clayers/tokyocurry_c4.geojson', function(data) {

      geojson_c4 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c5').checked) {
      map.removeLayer(geojson_c5);
      $.getJSON('clayers/tokyocurry_c5.geojson', function(data) {

      geojson_c5 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c6').checked) {
      map.removeLayer(geojson_c6);
      $.getJSON('clayers/tokyocurry_c6.geojson', function(data) {

      geojson_c6 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c7').checked) {
      map.removeLayer(geojson_c7);
      $.getJSON('clayers/tokyocurry_c7.geojson', function(data) {

      geojson_c7 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c8').checked) {
      map.removeLayer(geojson_c8);
      $.getJSON('clayers/tokyocurry_c8.geojson', function(data) {

      geojson_c8 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c9').checked) {
      map.removeLayer(geojson_c9);
      $.getJSON('clayers/tokyocurry_c9.geojson', function(data) {

      geojson_c9 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c10').checked) {
      map.removeLayer(geojson_c10);
      $.getJSON('clayers/tokyocurry_c10.geojson', function(data) {

      geojson_c10 = L.geoJson(data, {
        pointToLayer: highlightcmPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
  }
});

$('#nonno').change(function() {
  if ($(".legend").length) {
    map.removeControl(legend);
    legendHighlight.addTo(map);
  }
  if(this.checked) {
    currentTopButton = "nonno";
    if(document.getElementById('c1').checked) {
      map.removeLayer(geojson_c1);
      $.getJSON('clayers/tokyocurry_c1.geojson', function(data) {

      geojson_c1 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c2').checked) {
      map.removeLayer(geojson_c2);
      $.getJSON('clayers/tokyocurry_c2.geojson', function(data) {

      geojson_c2 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c3').checked) {
      map.removeLayer(geojson_c3);
      $.getJSON('clayers/tokyocurry_c3.geojson', function(data) {

      geojson_c3 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c4').checked) {
      map.removeLayer(geojson_c4);
      $.getJSON('clayers/tokyocurry_c4.geojson', function(data) {

      geojson_c4 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c5').checked) {
      map.removeLayer(geojson_c5);
      $.getJSON('clayers/tokyocurry_c5.geojson', function(data) {

      geojson_c5 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c6').checked) {
      map.removeLayer(geojson_c6);
      $.getJSON('clayers/tokyocurry_c6.geojson', function(data) {

      geojson_c6 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c7').checked) {
      map.removeLayer(geojson_c7);
      $.getJSON('clayers/tokyocurry_c7.geojson', function(data) {

      geojson_c7 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c8').checked) {
      map.removeLayer(geojson_c8);
      $.getJSON('clayers/tokyocurry_c8.geojson', function(data) {

      geojson_c8 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c9').checked) {
      map.removeLayer(geojson_c9);
      $.getJSON('clayers/tokyocurry_c9.geojson', function(data) {

      geojson_c9 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
    if(document.getElementById('c10').checked) {
      map.removeLayer(geojson_c10);
      $.getJSON('clayers/tokyocurry_c10.geojson', function(data) {

      geojson_c10 = L.geoJson(data, {
        pointToLayer: highlightnonnoPTL,
        onEachFeature: onEachFeature
      }).addTo(map);

      });
    };
  }
});

//adjusts zoom to enlarge dots at higher zoom levels, hoping this is better for mobile
map.on('zoomend', function() {
  var currentZoom = map.getZoom();
  console.log(currentZoom)
  geojson_c1.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c2.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c3.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c4.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c5.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c6.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c7.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c8.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c9.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  geojson_c10.setStyle({
    radius: radiusZoomCalculator(currentZoom),
  });
  });

$(window).bind('resize load', function() {
  if ($(this).width() < 767) {
    $('#collapse2').removeClass('in');
    $('#collapse2').addClass('out');
		console.log('got small');
  } else {
    $('#collapse2').removeClass('out');
    $('#collapse2').addClass('in');
		console.log('got wide');
  }
});

$(window).bind('resize load', function() {
  if ($(this).width() < 992) {
    $('#map').css({height: '55vh'});
  } else {
    $('#map').css({height: '75vh'});
  }
});

var stlist = [{"lat": 35.549911000000002, "name_en": "Zoshiki Station", "ID": 0, "lng": 139.71519900000001, "name_jp": "\u96d1\u8272\u99c5"}, {"lat": 35.675069000000001, "name_en": "Yurakucho Station", "ID": 1, "lng": 139.763328, "name_jp": "\u6709\u697d\u753a\u99c5"}, {"lat": 35.669061999999997, "name_en": "Yoyogiuehara Station", "ID": 2, "lng": 139.679678, "name_jp": "\u4ee3\u3005\u6728\u4e0a\u539f\u99c5"}, {"lat": 35.669483999999997, "name_en": "Yoyogihachiman Station", "ID": 3, "lng": 139.688635, "name_jp": "\u4ee3\u3005\u6728\u516b\u5e61\u99c5"}, {"lat": 35.683061000000002, "name_en": "Yoyogi Station", "ID": 4, "lng": 139.70204200000001, "name_jp": "\u4ee3\u3005\u6728\u99c5"}, {"lat": 35.686014, "name_en": "Yotsuya Station", "ID": 5, "lng": 139.73066700000001, "name_jp": "\u56db\u30c4\u8c37\u99c5"}, {"lat": 35.687958000000002, "name_en": "Yotsuya Sanchome Station", "ID": 6, "lng": 139.72010299999999, "name_jp": "\u56db\u8c37\u4e09\u4e01\u76ee\u99c5"}, {"lat": 35.641674000000002, "name_en": "Yanokuchi Station", "ID": 7, "lng": 139.52045699999999, "name_jp": "\u77e2\u91ce\u53e3\u99c5"}, {"lat": 35.681424, "name_en": "Yaho Station", "ID": 8, "lng": 139.44659100000001, "name_jp": "\u8c37\u4fdd\u99c5"}, {"lat": 35.684961999999999, "name_en": "Yagawa Station", "ID": 9, "lng": 139.43212299999999, "name_jp": "\u77e2\u5ddd\u99c5"}, {"lat": 35.734561999999997, "name_en": "Ushihama Station", "ID": 10, "lng": 139.333665, "name_jp": "\u725b\u6d5c\u99c5"}, {"lat": 35.744402000000001, "name_en": "Ushida Station", "ID": 11, "lng": 139.811283, "name_jp": "\u725b\u7530\u99c5"}, {"lat": 35.567042000000001, "name_en": "Umeyashiki Station", "ID": 12, "lng": 139.728341, "name_jp": "\u6885\u5c4b\u6577\u99c5"}, {"lat": 35.772576000000001, "name_en": "Umejima Station", "ID": 13, "lng": 139.797652, "name_jp": "\u6885\u5cf6\u99c5"}, {"lat": 35.655920999999999, "name_en": "Umegaoka Station", "ID": 14, "lng": 139.653614, "name_jp": "\u6885\u30f6\u4e18\u99c5"}, {"lat": 35.791234000000003, "name_en": "Ukimafunado Station", "ID": 15, "lng": 139.69139100000001, "name_jp": "\u6d6e\u9593\u821f\u6e21\u99c5"}, {"lat": 35.720495, "name_en": "Uguisudani Station", "ID": 16, "lng": 139.77883700000001, "name_jp": "\u9daf\u8c37\u99c5"}, {"lat": 35.713768000000002, "name_en": "Ueno Station", "ID": 17, "lng": 139.777254, "name_jp": "\u4e0a\u91ce\u99c5"}, {"lat": 35.681381999999999, "name_en": "Tokyo Station", "ID": 18, "lng": 139.76608400000001, "name_jp": "\u6771\u4eac\u99c5"}, {"lat": 35.710366, "name_en": "Tokyo Skytree Station", "ID": 19, "lng": 139.80904899999999, "name_jp": "\u3068\u3046\u304d\u3087\u3046\u30b9\u30ab\u30a4\u30c4\u30ea\u30fc\u99c5"}, {"lat": 35.645735999999999, "name_en": "Tamachi Station", "ID": 20, "lng": 139.74757500000001, "name_jp": "\u7530\u753a\u99c5"}, {"lat": 35.794507000000003, "name_en": "Takenotsuka Station", "ID": 21, "lng": 139.79078799999999, "name_jp": "\u7af9\u30ce\u585a\u99c5"}, {"lat": 35.712285000000001, "name_en": "Takadanobaba Station", "ID": 22, "lng": 139.70378199999999, "name_jp": "\u9ad8\u7530\u99ac\u5834\u99c5"}, {"lat": 35.697899, "name_en": "Tachikawa Station", "ID": 23, "lng": 139.41395700000001, "name_jp": "\u7acb\u5ddd\u99c5"}, {"lat": 35.598452999999999, "name_en": "Tachiaigawa Station", "ID": 24, "lng": 139.73880299999999, "name_jp": "\u7acb\u4f1a\u5ddd\u99c5"}, {"lat": 35.738061999999999, "name_en": "Tabata Station", "ID": 25, "lng": 139.76086000000001, "name_jp": "\u7530\u7aef\u99c5"}, {"lat": 35.702030000000001, "name_en": "Suidobashi Station", "ID": 26, "lng": 139.75365300000001, "name_jp": "\u6c34\u9053\u6a4b\u99c5"}, {"lat": 35.733491999999998, "name_en": "Sugamo Station", "ID": 27, "lng": 139.73934499999999, "name_jp": "\u5de3\u9d28\u99c5"}, {"lat": 35.643189, "name_en": "Soshigayaokura Station", "ID": 28, "lng": 139.60929300000001, "name_jp": "\u7956\u5e2b\u30f6\u8c37\u5927\u8535\u99c5"}, {"lat": 35.811883000000002, "name_en": "Shiromaru Station", "ID": 29, "lng": 139.114811, "name_jp": "\u767d\u4e38\u99c5"}, {"lat": 35.658714000000003, "name_en": "Shiomi Station", "ID": 30, "lng": 139.81735699999999, "name_jp": "\u6f6e\u898b\u99c5"}, {"lat": 35.725793000000003, "name_en": "Shinotsuka Station", "ID": 31, "lng": 139.72991500000001, "name_jp": "\u65b0\u5927\u585a\u99c5"}, {"lat": 35.701306000000002, "name_en": "Shinokubo Station", "ID": 32, "lng": 139.70004399999999, "name_jp": "\u65b0\u5927\u4e45\u4fdd\u99c5"}, {"lat": 35.688687000000002, "name_en": "Shinnihonbashi Station", "ID": 33, "lng": 139.77323000000001, "name_jp": "\u65b0\u65e5\u672c\u6a4b\u99c5"}, {"lat": 35.697490999999999, "name_en": "Shinnakano Station", "ID": 34, "lng": 139.66902999999999, "name_jp": "\u65b0\u4e2d\u91ce\u99c5"}, {"lat": 35.716788999999999, "name_en": "Shinkoiwa Station", "ID": 35, "lng": 139.85828000000001, "name_jp": "\u65b0\u5c0f\u5ca9\u99c5"}, {"lat": 35.697985000000003, "name_en": "Shinkoenji Station", "ID": 36, "lng": 139.64806799999999, "name_jp": "\u65b0\u9ad8\u5186\u5bfa\u99c5"}, {"lat": 35.730809999999998, "name_en": "Shinkodaira Station", "ID": 37, "lng": 139.47051200000001, "name_jp": "\u65b0\u5c0f\u5e73\u99c5"}, {"lat": 35.646157000000002, "name_en": "Shinkiba Station", "ID": 38, "lng": 139.827426, "name_jp": "\u65b0\u6728\u5834\u99c5"}, {"lat": 35.688588000000003, "name_en": "Shinjukugyoenmae Station", "ID": 39, "lng": 139.71069, "name_jp": "\u65b0\u5bbf\u5fa1\u82d1\u524d\u99c5"}, {"lat": 35.690921000000003, "name_en": "Shinjuku Station", "ID": 40, "lng": 139.70025799999999, "name_jp": "\u65b0\u5bbf\u99c5"}, {"lat": 35.690615999999999, "name_en": "Shinjuku Sanchome Station", "ID": 41, "lng": 139.70627099999999, "name_jp": "\u65b0\u5bbf\u4e09\u4e01\u76ee\u99c5"}, {"lat": 35.665497999999999, "name_en": "Shinbashi Station", "ID": 42, "lng": 139.75963999999999, "name_jp": "\u65b0\u6a4b\u99c5"}, {"lat": 35.617620000000002, "name_en": "Shinbanba Station", "ID": 43, "lng": 139.741366, "name_jp": "\u65b0\u99ac\u5834\u99c5"}, {"lat": 35.68009, "name_en": "Shinanomachi Station", "ID": 44, "lng": 139.72024300000001, "name_jp": "\u4fe1\u6fc3\u753a\u99c5"}, {"lat": 35.777867000000001, "name_en": "Shinakitsu Station", "ID": 45, "lng": 139.49338599999999, "name_jp": "\u65b0\u79cb\u6d25\u99c5"}, {"lat": 35.630152000000002, "name_en": "Shinagawa Station", "ID": 46, "lng": 139.74044000000001, "name_jp": "\u54c1\u5ddd\u99c5"}, {"lat": 35.661636999999999, "name_en": "Shimokitazawa Station", "ID": 47, "lng": 139.66656, "name_jp": "\u4e0b\u5317\u6ca2\u99c5"}, {"lat": 35.658517000000003, "name_en": "Shibuya Station", "ID": 48, "lng": 139.701334, "name_jp": "\u6e0b\u8c37\u99c5"}, {"lat": 35.658174000000002, "name_en": "Setagayadaita Station", "ID": 49, "lng": 139.66125199999999, "name_jp": "\u4e16\u7530\u8c37\u4ee3\u7530\u99c5"}, {"lat": 35.638691999999999, "name_en": "Sengakuji Station", "ID": 50, "lng": 139.74001999999999, "name_jp": "\u6cc9\u5cb3\u5bfa\u99c5"}, {"lat": 35.681170000000002, "name_en": "Sendagaya Station", "ID": 51, "lng": 139.711444, "name_jp": "\u5343\u99c4\u30f6\u8c37\u99c5"}, {"lat": 35.640053000000002, "name_en": "Seijogakuenmae Station", "ID": 52, "lng": 139.59874099999999, "name_jp": "\u6210\u57ce\u5b66\u5712\u524d\u99c5"}, {"lat": 35.805787000000002, "name_en": "Sawai Station", "ID": 53, "lng": 139.19405800000001, "name_jp": "\u6ca2\u4e95\u99c5"}, {"lat": 35.678713999999999, "name_en": "Sangubashi Station", "ID": 54, "lng": 139.69356199999999, "name_jp": "\u53c2\u5bae\u6a4b\u99c5"}, {"lat": 35.605144000000003, "name_en": "Samezu Station", "ID": 55, "lng": 139.742547, "name_jp": "\u9bab\u6d32\u99c5"}, {"lat": 35.696123, "name_en": "Ryogoku Station", "ID": 56, "lng": 139.79251500000001, "name_jp": "\u4e21\u56fd\u99c5"}, {"lat": 35.540892999999997, "name_en": "Rokugodote Station", "ID": 57, "lng": 139.70778899999999, "name_jp": "\u516d\u90f7\u571f\u624b\u99c5"}, {"lat": 35.776304000000003, "name_en": "Ozaku Station", "ID": 58, "lng": 139.30193, "name_jp": "\u5c0f\u4f5c\u99c5"}, {"lat": 35.790284, "name_en": "Oume Station", "ID": 59, "lng": 139.25839300000001, "name_jp": "\u9752\u6885\u99c5"}, {"lat": 35.731400999999998, "name_en": "Otsuka Station", "ID": 60, "lng": 139.72866200000001, "name_jp": "\u5927\u585a\u99c5"}, {"lat": 35.684801, "name_en": "Otemachi Station", "ID": 61, "lng": 139.766086, "name_jp": "\u5927\u624b\u753a\u99c5"}, {"lat": 35.710701999999998, "name_en": "Oshiage Station", "ID": 62, "lng": 139.81293500000001, "name_jp": "\u62bc\u4e0a\u99c5"}, {"lat": 35.619700000000002, "name_en": "Osaki Station", "ID": 63, "lng": 139.72855300000001, "name_jp": "\u5927\u5d0e\u99c5"}, {"lat": 35.572622000000003, "name_en": "Omorimachi Station", "ID": 64, "lng": 139.732169, "name_jp": "\u5927\u68ee\u753a\u99c5"}, {"lat": 35.587694999999997, "name_en": "Omorikaigan Station", "ID": 65, "lng": 139.735465, "name_jp": "\u5927\u68ee\u6d77\u5cb8\u99c5"}, {"lat": 35.588442000000001, "name_en": "Omori Station", "ID": 66, "lng": 139.72792899999999, "name_jp": "\u5927\u68ee\u99c5"}, {"lat": 35.809215000000002, "name_en": "Okutama Station", "ID": 67, "lng": 139.09666100000001, "name_jp": "\u5965\u591a\u6469\u99c5"}, {"lat": 35.700721999999999, "name_en": "Okubo Station", "ID": 68, "lng": 139.69735800000001, "name_jp": "\u5927\u4e45\u4fdd\u99c5"}, {"lat": 35.746783000000001, "name_en": "Oku Station", "ID": 69, "lng": 139.75463500000001, "name_jp": "\u5c3e\u4e45\u99c5"}, {"lat": 35.707438000000003, "name_en": "Okachimachi Station", "ID": 70, "lng": 139.774632, "name_jp": "\u5fa1\u5f92\u753a\u99c5"}, {"lat": 35.752473999999999, "name_en": "Oji Station", "ID": 71, "lng": 139.73813899999999, "name_jp": "\u738b\u5b50\u99c5"}, {"lat": 35.606248999999998, "name_en": "Oimachi Station", "ID": 72, "lng": 139.73485500000001, "name_jp": "\u5927\u4e95\u753a\u99c5"}, {"lat": 35.704631999999997, "name_en": "Ogikubo Station", "ID": 73, "lng": 139.619981, "name_jp": "\u837b\u7aaa\u99c5"}, {"lat": 36.058492999999999, "name_en": "Ogawamachi Station", "ID": 74, "lng": 139.26127199999999, "name_jp": "\u5c0f\u5ddd\u753a\u99c5"}, {"lat": 35.699854999999999, "name_en": "Ochanomizu Station", "ID": 75, "lng": 139.76378600000001, "name_jp": "\u5fa1\u8336\u30ce\u6c34\u99c5"}, {"lat": 35.703589999999998, "name_en": "Nishitachikawa Station", "ID": 76, "lng": 139.39368400000001, "name_jp": "\u897f\u7acb\u5ddd\u99c5"}, {"lat": 35.694298000000003, "name_en": "Nishishinjuku Station", "ID": 77, "lng": 139.692778, "name_jp": "\u897f\u65b0\u5bbf\u99c5"}, {"lat": 35.601799, "name_en": "Nishioi Station", "ID": 78, "lng": 139.721812, "name_jp": "\u897f\u5927\u4e95\u99c5"}, {"lat": 35.703842000000002, "name_en": "Nishiogikubo Station", "ID": 79, "lng": 139.59936099999999, "name_jp": "\u897f\u837b\u7aaa\u99c5"}, {"lat": 35.732135, "name_en": "Nishinippori Station", "ID": 80, "lng": 139.76678699999999, "name_jp": "\u897f\u65e5\u66ae\u91cc\u99c5"}, {"lat": 35.693486, "name_en": "Nishikunitachi Station", "ID": 81, "lng": 139.42424199999999, "name_jp": "\u897f\u56fd\u7acb\u99c5"}, {"lat": 35.699769000000003, "name_en": "Nishikokubunji Station", "ID": 82, "lng": 139.46571399999999, "name_jp": "\u897f\u56fd\u5206\u5bfa\u99c5"}, {"lat": 35.670966999999997, "name_en": "Nishifu Station", "ID": 83, "lng": 139.45739900000001, "name_jp": "\u897f\u5e9c\u99c5"}, {"lat": 35.777235999999903, "name_en": "Nishiarai Station", "ID": 84, "lng": 139.79044400000001, "name_jp": "\u897f\u65b0\u4e95\u99c5"}, {"lat": 35.727772000000002, "name_en": "Nippori Station", "ID": 85, "lng": 139.77098699999999, "name_jp": "\u65e5\u66ae\u91cc\u99c5"}, {"lat": 35.692123000000002, "name_en": "Nakanoshinbashi Station", "ID": 86, "lng": 139.67399700000001, "name_jp": "\u4e2d\u91ce\u65b0\u6a4b\u99c5"}, {"lat": 35.697920000000003, "name_en": "Nakanosakaue Station", "ID": 87, "lng": 139.68290999999999, "name_jp": "\u4e2d\u91ce\u5742\u4e0a\u99c5"}, {"lat": 35.690514, "name_en": "Nakanofujimicho Station", "ID": 88, "lng": 139.666933, "name_jp": "\u4e2d\u91ce\u5bcc\u58eb\u898b\u753a\u99c5"}, {"lat": 35.706032, "name_en": "Nakano Station", "ID": 89, "lng": 139.66565199999999, "name_jp": "\u4e2d\u91ce\u99c5"}, {"lat": 35.709057999999999, "name_en": "Nakagami Station", "ID": 90, "lng": 139.37581599999999, "name_jp": "\u4e2d\u795e\u99c5"}, {"lat": 35.717305000000003, "name_en": "Myogadani Station", "ID": 91, "lng": 139.73673400000001, "name_jp": "\u8317\u8377\u8c37\u99c5"}, {"lat": 35.730862999999999, "name_en": "Musashimasuko Station", "ID": 92, "lng": 139.25590299999999, "name_jp": "\u6b66\u8535\u5897\u6238\u99c5"}, {"lat": 35.732247999999998, "name_en": "Musashiitsukaichi Station", "ID": 93, "lng": 139.228039, "name_jp": "\u6b66\u8535\u4e94\u65e5\u5e02\u99c5"}, {"lat": 35.729844, "name_en": "Musashihikida Station", "ID": 94, "lng": 139.27020999999999, "name_jp": "\u6b66\u8535\u5f15\u7530\u99c5"}, {"lat": 35.787615000000002, "name_en": "Miyanohira Station", "ID": 95, "lng": 139.23717500000001, "name_jp": "\u5bae\u30ce\u5e73\u99c5"}, {"lat": 35.801445999999999, "name_en": "Mitake Station", "ID": 96, "lng": 139.18289799999999, "name_jp": "\u5fa1\u5dbd\u99c5"}, {"lat": 35.702708000000001, "name_en": "Mitaka Station", "ID": 97, "lng": 139.56083100000001, "name_jp": "\u4e09\u9df9\u99c5"}, {"lat": 35.814571000000001, "name_en": "Minumadai-shinsuik\u014den Station", "ID": 98, "lng": 139.77073999999999, "name_jp": "\u898b\u6cbc\u4ee3\u89aa\u6c34\u516c\u5712\u99c5"}, {"lat": 35.649093000000001, "name_en": "Minamitama Station", "ID": 99, "lng": 139.489284, "name_jp": "\u5357\u591a\u6469\u99c5"}, {"lat": 35.683469000000002, "name_en": "Minamishinjuku Station", "ID": 100, "lng": 139.69851700000001, "name_jp": "\u5357\u65b0\u5bbf\u99c5"}, {"lat": 35.733336000000001, "name_en": "Minamisenju Station", "ID": 101, "lng": 139.799171, "name_jp": "\u5357\u5343\u4f4f\u99c5"}, {"lat": 35.699624, "name_en": "Minamiasagaya Station", "ID": 102, "lng": 139.63576, "name_jp": "\u5357\u963f\u4f50\u30f6\u8c37\u99c5"}, {"lat": 35.733485000000002, "name_en": "Mikawashima Station", "ID": 103, "lng": 139.77643399999999, "name_jp": "\u4e09\u6cb3\u5cf6\u99c5"}, {"lat": 35.721204, "name_en": "Mejiro Station", "ID": 104, "lng": 139.70658700000001, "name_jp": "\u76ee\u767d\u99c5"}, {"lat": 35.633997999999998, "name_en": "Meguro Station", "ID": 105, "lng": 139.71582799999999, "name_jp": "\u76ee\u9ed2\u99c5"}, {"lat": 35.651316000000001, "name_en": "Kyodo Station", "ID": 106, "lng": 139.636437, "name_jp": "\u7d4c\u5802\u99c5"}, {"lat": 35.728437999999997, "name_en": "Kumagawa Station", "ID": 107, "lng": 139.335396, "name_jp": "\u718a\u5ddd\u99c5"}, {"lat": 35.758938999999998, "name_en": "Kosuge Station", "ID": 108, "lng": 139.81284600000001, "name_jp": "\u5c0f\u83c5\u99c5"}, {"lat": 35.816226999999998, "name_en": "Kori Station", "ID": 109, "lng": 139.15208799999999, "name_jp": "\u53e4\u91cc\u99c5"}, {"lat": 35.707337000000003, "name_en": "Korakuen Station", "ID": 110, "lng": 139.75120000000001, "name_jp": "\u5f8c\u697d\u5712\u99c5"}, {"lat": 35.685465999999998, "name_en": "Komiya Station", "ID": 111, "lng": 139.368798, "name_jp": "\u5c0f\u5bae\u99c5"}, {"lat": 35.736488999999999, "name_en": "Komagome Station", "ID": 112, "lng": 139.74687499999999, "name_jp": "\u99d2\u8fbc\u99c5"}, {"lat": 35.673929999999999, "name_en": "Kokkaigijidomae Station", "ID": 113, "lng": 139.74521899999999, "name_jp": "\u56fd\u4f1a\u8b70\u4e8b\u5802\u524d\u99c5"}, {"lat": 35.732962000000001, "name_en": "Koiwa Station", "ID": 114, "lng": 139.88168200000001, "name_jp": "\u5c0f\u5ca9\u99c5"}, {"lat": 35.705385, "name_en": "Koenji Station", "ID": 115, "lng": 139.649867, "name_jp": "\u9ad8\u5186\u5bfa\u99c5"}, {"lat": 35.622715999999997, "name_en": "Kitashinagawa Station", "ID": 116, "lng": 139.73915199999999, "name_jp": "\u5317\u54c1\u5ddd\u99c5"}, {"lat": 35.749412, "name_en": "Kitasenju Station", "ID": 117, "lng": 139.80510799999999, "name_jp": "\u5317\u5343\u4f4f\u99c5"}, {"lat": 35.636691999999996, "name_en": "Kitami Station", "ID": 118, "lng": 139.587098, "name_jp": "\u559c\u591a\u898b\u99c5"}, {"lat": 35.669347999999999, "name_en": "Kitahachioji Station", "ID": 119, "lng": 139.36337900000001, "name_jp": "\u5317\u516b\u738b\u5b50\u99c5"}, {"lat": 35.680785999999998, "name_en": "Kitafuchu Station", "ID": 120, "lng": 139.47181399999999, "name_jp": "\u5317\u5e9c\u4e2d\u99c5"}, {"lat": 35.786704999999998, "name_en": "Kitaakabane Station", "ID": 121, "lng": 139.70618999999999, "name_jp": "\u5317\u8d64\u7fbd\u99c5"}, {"lat": 35.696437000000003, "name_en": "Kinshicho Station", "ID": 122, "lng": 139.81394900000001, "name_jp": "\u9326\u7cf8\u753a\u99c5"}, {"lat": 35.702810999999997, "name_en": "Kichijoji Station", "ID": 123, "lng": 139.579804, "name_jp": "\u5409\u7965\u5bfa\u99c5"}, {"lat": 35.560684999999999, "name_en": "Keikyukamata Station", "ID": 124, "lng": 139.72373099999999, "name_jp": "\u4eac\u6025\u84b2\u7530\u99c5"}, {"lat": 35.813830000000003, "name_en": "Kawai Station", "ID": 125, "lng": 139.16402600000001, "name_jp": "\u5ddd\u4e95\u99c5"}, {"lat": 35.673838000000003, "name_en": "Kasumigaseki Station", "ID": 126, "lng": 139.750899, "name_jp": "\u971e\u30f6\u95a2\u99c5"}, {"lat": 35.644404999999999, "name_en": "Kasairinkaikoen Station", "ID": 127, "lng": 139.861602, "name_jp": "\u845b\u897f\u81e8\u6d77\u516c\u5712\u99c5"}, {"lat": 35.733440000000002, "name_en": "Kanegafuchi Station", "ID": 128, "lng": 139.82001099999999, "name_jp": "\u9418\u30f6\u6df5\u99c5"}, {"lat": 35.691690000000001, "name_en": "Kanda Station", "ID": 129, "lng": 139.770883, "name_jp": "\u795e\u7530\u99c5"}, {"lat": 35.769548999999998, "name_en": "Kanamachi Station", "ID": 130, "lng": 139.87047899999999, "name_jp": "\u91d1\u753a\u99c5"}, {"lat": 35.746586000000001, "name_en": "Kaminakazato Station", "ID": 131, "lng": 139.746927, "name_jp": "\u4e0a\u4e2d\u91cc\u99c5"}, {"lat": 35.697586999999999, "name_en": "Kameido Station", "ID": 132, "lng": 139.826078, "name_jp": "\u4e80\u6238\u99c5"}, {"lat": 35.766621999999998, "name_en": "Kameari Station", "ID": 133, "lng": 139.84767500000001, "name_jp": "\u4e80\u6709\u99c5"}, {"lat": 35.562479000000003, "name_en": "Kamata Station", "ID": 134, "lng": 139.71605099999999, "name_jp": "\u84b2\u7530\u99c5"}, {"lat": 35.784548999999998, "name_en": "Kabe Station", "ID": 135, "lng": 139.284784, "name_jp": "\u6cb3\u8fba\u99c5"}, {"lat": 35.760261, "name_en": "Jujo Station", "ID": 136, "lng": 139.72223099999999, "name_jp": "\u5341\u6761\u99c5"}, {"lat": 35.746043999999998, "name_en": "Itabashi Station", "ID": 137, "lng": 139.71952300000001, "name_jp": "\u677f\u6a4b\u99c5"}, {"lat": 35.796733000000003, "name_en": "Ishigamimae Station", "ID": 138, "lng": 139.22505699999999, "name_jp": "\u77f3\u795e\u524d\u99c5"}, {"lat": 35.644264, "name_en": "Inaginaganuma Station", "ID": 139, "lng": 139.50274200000001, "name_jp": "\u7a32\u57ce\u9577\u6cbc\u99c5"}, {"lat": 35.807614999999998, "name_en": "Ikusabata Station", "ID": 140, "lng": 139.20773399999999, "name_jp": "\u8ecd\u7551\u99c5"}, {"lat": 35.728926000000001, "name_en": "Ikebukuro Station", "ID": 141, "lng": 139.71037999999999, "name_jp": "\u6c60\u888b\u99c5"}, {"lat": 35.702064999999997, "name_en": "Iidabashi Station", "ID": 142, "lng": 139.745015, "name_jp": "\u98ef\u7530\u6a4b\u99c5"}, {"lat": 35.691007999999997, "name_en": "Ichigaya Station", "ID": 143, "lng": 139.73558499999999, "name_jp": "\u5e02\u30f6\u8c37\u99c5"}, {"lat": 35.742952000000002, "name_en": "Horikiri Station", "ID": 144, "lng": 139.81773799999999, "name_jp": "\u5800\u5207\u99c5"}, {"lat": 35.706671, "name_en": "Hongo Sanchome Station", "ID": 145, "lng": 139.75991400000001, "name_jp": "\u672c\u90f7\u4e09\u4e01\u76ee\u99c5"}, {"lat": 35.683495999999998, "name_en": "Honancho Station", "ID": 146, "lng": 139.656498, "name_jp": "\u65b9\u5357\u753a\u99c5"}, {"lat": 35.706434000000002, "name_en": "Hirai Station", "ID": 147, "lng": 139.84251599999999, "name_jp": "\u5e73\u4e95\u99c5"}, {"lat": 35.787857000000002, "name_en": "Hinatawada Station", "ID": 148, "lng": 139.229964, "name_jp": "\u65e5\u5411\u548c\u7530\u99c5"}, {"lat": 35.718088000000002, "name_en": "Hikifune Station", "ID": 149, "lng": 139.816731, "name_jp": "\u66f3\u821f\u99c5"}, {"lat": 35.789904, "name_en": "Higashioume Station", "ID": 150, "lng": 139.272313, "name_jp": "\u6771\u9752\u6885\u99c5"}, {"lat": 35.706826999999997, "name_en": "Higashinakano Station", "ID": 151, "lng": 139.683029, "name_jp": "\u6771\u4e2d\u91ce\u99c5"}, {"lat": 35.706336999999998, "name_en": "Higashinakagami Station", "ID": 152, "lng": 139.38417899999999, "name_jp": "\u6771\u4e2d\u795e\u99c5"}, {"lat": 35.724960000000003, "name_en": "Higashimukojima Station", "ID": 153, "lng": 139.81949499999999, "name_jp": "\u6771\u5411\u5cf6\u99c5"}, {"lat": 35.697802000000003, "name_en": "Higashikoenji Station", "ID": 154, "lng": 139.65782200000001, "name_jp": "\u6771\u9ad8\u5186\u5bfa\u99c5"}, {"lat": 35.665609000000003, "name_en": "Higashikitazawa Station", "ID": 155, "lng": 139.67322799999999, "name_jp": "\u6771\u5317\u6ca2\u99c5"}, {"lat": 35.762946999999997, "name_en": "Higashijujo Station", "ID": 156, "lng": 139.72769400000001, "name_jp": "\u6771\u5341\u6761\u99c5"}, {"lat": 35.745758000000002, "name_en": "Higashifussa Station", "ID": 157, "lng": 139.33595099999999, "name_jp": "\u6771\u798f\u751f\u99c5"}, {"lat": 35.725906999999999, "name_en": "Higashiakiru Station", "ID": 158, "lng": 139.31092599999999, "name_jp": "\u6771\u79cb\u7559\u99c5"}, {"lat": 35.579073999999999, "name_en": "Heiwajima Station", "ID": 159, "lng": 139.734996, "name_jp": "\u5e73\u548c\u5cf6\u99c5"}, {"lat": 35.814931999999999, "name_en": "Hatonosu Station", "ID": 160, "lng": 139.128749, "name_jp": "\u9ce9\u30ce\u5de3\u99c5"}, {"lat": 35.674616999999998, "name_en": "Hatchobori Station", "ID": 161, "lng": 139.777705, "name_jp": "\u516b\u4e01\u5800\u99c5"}, {"lat": 35.670167999999997, "name_en": "Harajuku Station", "ID": 162, "lng": 139.702687, "name_jp": "\u539f\u5bbf\u99c5"}, {"lat": 35.758437000000001, "name_en": "Hamura Station", "ID": 163, "lng": 139.315944, "name_jp": "\u7fbd\u6751\u99c5"}, {"lat": 35.655645999999997, "name_en": "Hamamatsucho Station", "ID": 164, "lng": 139.75674900000001, "name_jp": "\u6d5c\u677e\u753a\u99c5"}, {"lat": 35.771391999999999, "name_en": "Hakonegasaki Station", "ID": 165, "lng": 139.34671599999999, "name_jp": "\u7bb1\u6839\u30f6\u5d0e\u99c5"}, {"lat": 35.721136000000001, "name_en": "Haijima Station", "ID": 166, "lng": 139.34365399999999, "name_jp": "\u62dd\u5cf6\u99c5"}, {"lat": 35.655641000000003, "name_en": "Hachioji Station", "ID": 167, "lng": 139.33896799999999, "name_jp": "\u516b\u738b\u5b50\u99c5"}, {"lat": 35.653635000000001, "name_en": "Gotokuji Station", "ID": 168, "lng": 139.647322, "name_jp": "\u8c6a\u5fb3\u5bfa\u99c5"}, {"lat": 35.765799000000001, "name_en": "Gotanno Station", "ID": 169, "lng": 139.81005099999999, "name_jp": "\u4e94\u53cd\u91ce\u99c5"}, {"lat": 35.626446000000001, "name_en": "Gotanda Station", "ID": 170, "lng": 139.723444, "name_jp": "\u4e94\u53cd\u7530\u99c5"}, {"lat": 35.671989000000004, "name_en": "Ginza Station", "ID": 171, "lng": 139.76396500000001, "name_jp": "\u9280\u5ea7\u99c5"}, {"lat": 35.804473999999999, "name_en": "Futamatao Station", "ID": 172, "lng": 139.21543800000001, "name_jp": "\u4e8c\u4fe3\u5c3e\u99c5"}, {"lat": 35.742356000000001, "name_en": "Fussa Station", "ID": 173, "lng": 139.32796300000001, "name_jp": "\u798f\u751f\u99c5"}, {"lat": 35.666204, "name_en": "Fuchuhonmachi Station", "ID": 174, "lng": 139.477203, "name_jp": "\u5e9c\u4e2d\u672c\u753a\u99c5"}, {"lat": 35.667946000000001, "name_en": "Etchujima Station", "ID": 175, "lng": 139.79271299999999, "name_jp": "\u8d8a\u4e2d\u5cf6\u99c5"}, {"lat": 35.64669, "name_en": "Ebisu Station", "ID": 176, "lng": 139.710106, "name_jp": "\u6075\u6bd4\u5bff\u99c5"}, {"lat": 35.647350000000003, "name_en": "Chitosefunabashi Station", "ID": 177, "lng": 139.62407999999999, "name_jp": "\u5343\u6b73\u8239\u6a4b\u99c5"}, {"lat": 35.668557, "name_en": "Bubaigawara Station", "ID": 178, "lng": 139.46872099999999, "name_jp": "\u5206\u500d\u6cb3\u539f\u99c5"}, {"lat": 35.693365, "name_en": "Bakurocho Station", "ID": 179, "lng": 139.78237999999999, "name_jp": "\u99ac\u55b0\u753a\u99c5"}, {"lat": 35.762214, "name_en": "Ayase Station", "ID": 180, "lng": 139.82491400000001, "name_jp": "\u7dbe\u702c\u99c5"}, {"lat": 35.695433999999999, "name_en": "Awajicho Station", "ID": 181, "lng": 139.76757499999999, "name_jp": "\u6de1\u8def\u753a\u99c5"}, {"lat": 35.697467000000003, "name_en": "Asakusabashi Station", "ID": 182, "lng": 139.78597600000001, "name_jp": "\u6d45\u8349\u6a4b\u99c5"}, {"lat": 35.712074000000001, "name_en": "Asakusa Station", "ID": 183, "lng": 139.79843, "name_jp": "\u6d45\u8349\u99c5"}, {"lat": 35.704773000000003, "name_en": "Asagaya Station", "ID": 184, "lng": 139.63526300000001, "name_jp": "\u963f\u4f50\u30f6\u8c37\u99c5"}, {"lat": 35.609350999999997, "name_en": "Aomonoyokocho Station", "ID": 185, "lng": 139.74290500000001, "name_jp": "\u9752\u7269\u6a2a\u4e01\u99c5"}, {"lat": 35.713543000000001, "name_en": "Akishima Station", "ID": 186, "lng": 139.36090799999999, "name_jp": "\u662d\u5cf6\u99c5"}, {"lat": 35.698683000000003, "name_en": "Akihabara Station", "ID": 187, "lng": 139.77421899999999, "name_jp": "\u79cb\u8449\u539f\u99c5"}, {"lat": 35.728064000000003, "name_en": "Akigawa Station", "ID": 188, "lng": 139.28666999999999, "name_jp": "\u79cb\u5ddd\u99c5"}, {"lat": 35.677021000000003, "name_en": "Akasakamitsuke Station", "ID": 189, "lng": 139.73704699999999, "name_jp": "\u8d64\u5742\u898b\u9644\u99c5"}, {"lat": 35.778050999999998, "name_en": "Akabane Station", "ID": 190, "lng": 139.720856, "name_jp": "\u8d64\u7fbd\u99c5"}, {"lat": 35.805666000000002, "name_en": "Toneri Station", "ID": 191, "lng": 139.770128, "name_jp": "\u820e\u4eba\u99c5"}, {"lat": 35.796379000000002, "name_en": "Toneri-k\u014den Station", "ID": 192, "lng": 139.770173, "name_jp": "\u820e\u4eba\u516c\u5712\u99c5"}, {"lat": 35.791401999999998, "name_en": "Nishi-Takashimadaira Station", "ID": 193, "lng": 139.64635899999999, "name_jp": "\u897f\u9ad8\u5cf6\u5e73\u99c5"}, {"lat": 35.789979000000002, "name_en": "Shin-Takashimadaira Station", "ID": 194, "lng": 139.65392299999999, "name_jp": "\u65b0\u9ad8\u5cf6\u5e73\u99c5"}, {"lat": 35.788913999999998, "name_en": "Takashimadaira Station", "ID": 195, "lng": 139.66126600000001, "name_jp": "\u9ad8\u5cf6\u5e73\u99c5"}, {"lat": 35.788763000000003, "name_en": "Yazaike Station", "ID": 196, "lng": 139.770061, "name_jp": "\u8c37\u5728\u5bb6\u99c5"}, {"lat": 35.787069000000002, "name_en": "Nishidai Station", "ID": 197, "lng": 139.67291, "name_jp": "\u897f\u53f0\u99c5"}, {"lat": 35.784857000000002, "name_en": "Rokuch\u014d Station", "ID": 198, "lng": 139.821844, "name_jp": "\u516d\u753a\u99c5"}, {"lat": 35.784593999999998, "name_en": "Hasune Station", "ID": 199, "lng": 139.68021899999999, "name_jp": "\u84ee\u6839\u99c5"}, {"lat": 35.783147, "name_en": "Akabane-iwabuchi Station", "ID": 200, "lng": 139.720044, "name_jp": "\u8d64\u7fbd\u5ca9\u6df5\u99c5"}, {"lat": 35.781491000000003, "name_en": "Nishiaraidaishi-nishi Station", "ID": 201, "lng": 139.77008799999999, "name_jp": "\u897f\u65b0\u4e95\u5927\u5e2b\u897f\u99c5"}, {"lat": 35.778494000000002, "name_en": "Akitsu Station", "ID": 202, "lng": 139.496714, "name_jp": "\u79cb\u6d25\u99c5"}, {"lat": 35.777881000000001, "name_en": "Shimo Station", "ID": 203, "lng": 139.73259999999999, "name_jp": "\u5fd7\u8302\u99c5"}, {"lat": 35.777428999999998, "name_en": "Shimura-sanch\u014dme Station", "ID": 204, "lng": 139.68577999999999, "name_jp": "\u5fd7\u6751\u4e09\u4e01\u76ee\u99c5"}, {"lat": 35.775880000000001, "name_en": "Chikatetsu-Narimasu Station", "ID": 205, "lng": 139.633005, "name_jp": "\u5730\u4e0b\u9244\u6210\u5897\u99c5"}, {"lat": 35.775143999999997, "name_en": "Shimura-sakaue Station", "ID": 206, "lng": 139.69573, "name_jp": "\u5fd7\u6751\u5742\u4e0a\u99c5"}, {"lat": 35.773912000000003, "name_en": "K\u014dhoku Station", "ID": 207, "lng": 139.770307, "name_jp": "\u6c5f\u5317\u99c5"}, {"lat": 35.772095999999998, "name_en": "Kiyose Station", "ID": 208, "lng": 139.51995700000001, "name_jp": "\u6e05\u702c\u99c5"}, {"lat": 35.771746, "name_en": "Aoi Station", "ID": 209, "lng": 139.82018600000001, "name_jp": "\u9752\u4e95\u99c5"}, {"lat": 35.769913000000003, "name_en": "Chikatetsu-Akatsuka Station", "ID": 210, "lng": 139.64412200000001, "name_jp": "\u5730\u4e0b\u9244\u8d64\u585a\u99c5"}, {"lat": 35.768957999999998, "name_en": "Motohasunuma Station", "ID": 211, "lng": 139.70244400000001, "name_jp": "\u672c\u84ee\u6cbc\u99c5"}, {"lat": 35.768645999999997, "name_en": "Keisei Kanamachi Station", "ID": 212, "lng": 139.870441, "name_jp": "\u4eac\u6210\u91d1\u753a\u99c5"}, {"lat": 35.768411, "name_en": "K\u014dya Station", "ID": 213, "lng": 139.77070000000001, "name_jp": "\u9ad8\u91ce\u99c5"}, {"lat": 35.767913, "name_en": "Seibuen Station", "ID": 214, "lng": 139.44844499999999, "name_jp": "\u897f\u6b66\u5712\u99c5"}, {"lat": 35.766177999999996, "name_en": "Seibu-Y\u016benchi Station", "ID": 215, "lng": 139.44257500000001, "name_jp": "\u897f\u6b66\u904a\u5712\u5730\u99c5"}, {"lat": 35.765808999999997, "name_en": "\u014cji-Kamiya Station", "ID": 216, "lng": 139.73567199999999, "name_jp": "\u738b\u5b50\u795e\u8c37\u99c5"}, {"lat": 35.763902000000002, "name_en": "\u014cgi-\u014dhashi Station", "ID": 217, "lng": 139.770814, "name_jp": "\u6247\u5927\u6a4b\u99c5"}, {"lat": 35.761074000000001, "name_en": "Itabashi-honch\u014d Station", "ID": 218, "lng": 139.70592099999999, "name_jp": "\u677f\u6a4b\u672c\u753a\u99c5"}, {"lat": 35.760264999999997, "name_en": "Higashi-Kurume Station", "ID": 219, "lng": 139.53404699999999, "name_jp": "\u6771\u4e45\u7559\u7c73\u99c5"}, {"lat": 35.759985, "name_en": "Higashi-Murayama Station", "ID": 220, "lng": 139.465847, "name_jp": "\u6771\u6751\u5c71\u99c5"}, {"lat": 35.759048, "name_en": "Hikarigaoka Station", "ID": 221, "lng": 139.629853, "name_jp": "\u5149\u304c\u4e18\u99c5"}, {"lat": 35.757810999999997, "name_en": "Heiwadai Station", "ID": 222, "lng": 139.65252599999999, "name_jp": "\u5e73\u548c\u53f0\u99c5"}, {"lat": 35.756394999999998, "name_en": "Shibamata Station", "ID": 223, "lng": 139.87510399999999, "name_jp": "\u67f4\u53c8\u99c5"}, {"lat": 35.756061000000003, "name_en": "Musashi-Yamato Station", "ID": 224, "lng": 139.44423, "name_jp": "\u6b66\u8535\u5927\u548c\u99c5"}, {"lat": 35.754677999999998, "name_en": "Adachi-Odai Station", "ID": 225, "lng": 139.770388, "name_jp": "\u8db3\u7acb\u5c0f\u53f0\u99c5"}, {"lat": 35.752954000000003, "name_en": "\u014cji Station", "ID": 226, "lng": 139.73803000000001, "name_jp": "\u738b\u5b50\u99c5\u524d\u99c5"}, {"lat": 35.751522999999999, "name_en": "Hibarigaoka Station", "ID": 227, "lng": 139.54553300000001, "name_jp": "\u3072\u3070\u308a\u30f6\u4e18\u99c5"}, {"lat": 35.751379, "name_en": "Itabashi-kuyakushomae Station", "ID": 228, "lng": 139.71010999999999, "name_jp": "\u677f\u6a4b\u533a\u5f79\u6240\u524d\u99c5"}, {"lat": 35.751088000000003, "name_en": "Shin-Shibamata Station", "ID": 229, "lng": 139.87918300000001, "name_jp": "\u65b0\u67f4\u53c8\u99c5"}, {"lat": 35.751075, "name_en": "Kajiwara Station", "ID": 230, "lng": 139.74806000000001, "name_jp": "\u68b6\u539f\u99c5"}, {"lat": 35.750942000000002, "name_en": "Keisei-Takasago Station", "ID": 231, "lng": 139.867276, "name_jp": "\u4eac\u6210\u9ad8\u7802\u99c5"}, {"lat": 35.750897999999999, "name_en": "Arakawa-Shakomae Station", "ID": 232, "lng": 139.75278700000001, "name_jp": "\u8352\u5ddd\u8eca\u5eab\u524d\u99c5"}, {"lat": 35.750891000000003, "name_en": "Sakaemachi Station", "ID": 233, "lng": 139.74214900000001, "name_jp": "\u6804\u753a\u99c5"}, {"lat": 35.750677000000003, "name_en": "Arakawayuenchimae Station", "ID": 234, "lng": 139.75783699999999, "name_jp": "\u8352\u5ddd\u904a\u5712\u5730\u524d\u99c5"}, {"lat": 35.750639, "name_en": "Nerima-kasugach\u014d Station", "ID": 235, "lng": 139.63984600000001, "name_jp": "\u7df4\u99ac\u6625\u65e5\u753a\u99c5"}, {"lat": 35.750525000000003, "name_en": "Odai Station", "ID": 236, "lng": 139.76225500000001, "name_jp": "\u5c0f\u53f0\u99c5"}, {"lat": 35.750177999999998, "name_en": "Asukayama Station", "ID": 237, "lng": 139.73740000000001, "name_jp": "\u98db\u9ce5\u5c71\u99c5"}, {"lat": 35.750089000000003, "name_en": "Miyanomae Station", "ID": 238, "lng": 139.76513399999999, "name_jp": "\u5bae\u30ce\u524d\u99c5"}, {"lat": 35.749952, "name_en": "Kumegawa Station", "ID": 239, "lng": 139.47221999999999, "name_jp": "\u4e45\u7c73\u5ddd\u99c5"}, {"lat": 35.749656999999999, "name_en": "\u014cizumi-gakuen Station", "ID": 240, "lng": 139.58631500000001, "name_jp": "\u5927\u6cc9\u5b66\u5712\u99c5"}, {"lat": 35.749637, "name_en": "Hikawadai Station", "ID": 241, "lng": 139.665763, "name_jp": "\u6c37\u5ddd\u53f0\u99c5"}, {"lat": 35.748945999999997, "name_en": "Shin-Itabashi Station", "ID": 242, "lng": 139.71929900000001, "name_jp": "\u65b0\u677f\u6a4b\u99c5"}, {"lat": 35.748519000000002, "name_en": "Kumanomae Station", "ID": 243, "lng": 139.76984200000001, "name_jp": "\u718a\u91ce\u524d\u99c5"}, {"lat": 35.748323999999997, "name_en": "H\u014dya Station", "ID": 244, "lng": 139.56780599999999, "name_jp": "\u4fdd\u8c37\u99c5"}, {"lat": 35.747692999999998, "name_en": "Horikiri-Sh\u014dbuen Station", "ID": 245, "lng": 139.82748599999999, "name_jp": "\u5800\u5207\u83d6\u84b2\u5712\u99c5"}, {"lat": 35.747611999999997, "name_en": "Ohanajaya Station", "ID": 246, "lng": 139.840249, "name_jp": "\u304a\u82b1\u8336\u5c4b\u99c5"}, {"lat": 35.747306000000002, "name_en": "Takinogawa Itchome Station", "ID": 247, "lng": 139.735399, "name_jp": "\u6edd\u91ce\u5ddd\u4e00\u4e01\u76ee\u99c5"}, {"lat": 35.746026000000001, "name_en": "Nishigahara Station", "ID": 248, "lng": 139.74220700000001, "name_jp": "\u897f\u30f6\u539f\u99c5"}, {"lat": 35.746012999999998, "name_en": "Kamikitadai Station", "ID": 249, "lng": 139.416189, "name_jp": "\u4e0a\u5317\u53f0\u99c5"}, {"lat": 35.745572000000003, "name_en": "Aoto Station", "ID": 250, "lng": 139.856123, "name_jp": "\u9752\u7825\u99c5"}, {"lat": 35.745344000000003, "name_en": "Higashiogu Sanchome Station", "ID": 251, "lng": 139.77447599999999, "name_jp": "\u6771\u5c3e\u4e45\u4e09\u4e01\u76ee\u99c5"}, {"lat": 35.745100999999998, "name_en": "Yasaka Station", "ID": 252, "lng": 139.466904, "name_jp": "\u516b\u5742\u99c5"}, {"lat": 35.744720999999998, "name_en": "Nishigahara Yonchome Station", "ID": 253, "lng": 139.73309399999999, "name_jp": "\u897f\u30f6\u539f\u56db\u4e01\u76ee\u99c5"}, {"lat": 35.743836000000002, "name_en": "Kotake-mukaihara Station", "ID": 254, "lng": 139.678574, "name_jp": "\u5c0f\u7af9\u5411\u539f\u99c5"}, {"lat": 35.743783999999998, "name_en": "Machiya Nichome Station", "ID": 255, "lng": 139.77675400000001, "name_jp": "\u753a\u5c4b\u4e8c\u4e01\u76ee\u99c5"}, {"lat": 35.743716999999997, "name_en": "Nishi-Sugamo Station", "ID": 256, "lng": 139.72858299999999, "name_jp": "\u897f\u5de3\u9d28\u99c5"}, {"lat": 35.743681000000002, "name_en": "Shakujii-k\u014den Station", "ID": 257, "lng": 139.60645199999999, "name_jp": "\u77f3\u795e\u4e95\u516c\u5712\u99c5"}, {"lat": 35.743516999999997, "name_en": "Keisei Sekiya Station", "ID": 258, "lng": 139.81181799999999, "name_jp": "\u4eac\u6210\u95a2\u5c4b\u99c5"}, {"lat": 35.74286, "name_en": "Akado-sh\u014dgakk\u014dmae Station", "ID": 259, "lng": 139.769024, "name_jp": "\u8d64\u571f\u5c0f\u5b66\u6821\u524d\u99c5"}, {"lat": 35.742778000000001, "name_en": "Machiya Ekimae", "ID": 260, "lng": 139.780959, "name_jp": "\u753a\u5c4b\u99c5\u524d"}, {"lat": 35.742716999999999, "name_en": "Machiya Station", "ID": 261, "lng": 139.78227899999999, "name_jp": "\u753a\u5c4b\u99c5"}, {"lat": 35.742432999999998, "name_en": "Senju-\u014chashi Station", "ID": 262, "lng": 139.797089, "name_jp": "\u5343\u4f4f\u5927\u6a4b\u99c5"}, {"lat": 35.742097000000001, "name_en": "Keisei Koiwa Station", "ID": 263, "lng": 139.88220000000001, "name_jp": "\u4eac\u6210\u5c0f\u5ca9\u99c5"}, {"lat": 35.742049000000002, "name_en": "Toshimaen Station", "ID": 264, "lng": 139.647955, "name_jp": "\u8c4a\u5cf6\u5712\u99c5"}, {"lat": 35.741990999999999, "name_en": "Arakawa Nanachome Station", "ID": 265, "lng": 139.78414000000001, "name_jp": "\u8352\u5ddd\u4e03\u4e01\u76ee\u99c5"}, {"lat": 35.741731000000001, "name_en": "Shin-K\u014dshinzuka Station", "ID": 266, "lng": 139.730818, "name_jp": "\u65b0\u5e9a\u7533\u585a\u99c5"}, {"lat": 35.740921, "name_en": "Nerima-Takanodai Station", "ID": 267, "lng": 139.61630500000001, "name_jp": "\u7df4\u99ac\u9ad8\u91ce\u53f0\u99c5"}, {"lat": 35.740858000000003, "name_en": "Shin-Sakuradai Station", "ID": 268, "lng": 139.668421, "name_jp": "\u65b0\u685c\u53f0\u99c5"}, {"lat": 35.740707999999998, "name_en": "Hagiyama Station", "ID": 269, "lng": 139.47706700000001, "name_jp": "\u8429\u5c71\u99c5"}, {"lat": 35.739277999999999, "name_en": "Sakura-Kaid\u014d Station", "ID": 270, "lng": 139.41665599999999, "name_jp": "\u685c\u8857\u9053\u99c5"}, {"lat": 35.738866000000002, "name_en": "Senkawa Station", "ID": 271, "lng": 139.68842699999999, "name_jp": "\u5343\u5ddd\u99c5"}, {"lat": 35.738723999999998, "name_en": "Sakuradai Station", "ID": 272, "lng": 139.66218900000001, "name_jp": "\u685c\u53f0\u99c5"}, {"lat": 35.738674000000003, "name_en": "Arakawa Nichome Station", "ID": 273, "lng": 139.78466499999999, "name_jp": "\u8352\u5ddd\u4e8c\u4e01\u76ee\u99c5"}, {"lat": 35.738577999999997, "name_en": "Nerima Station", "ID": 274, "lng": 139.65395000000001, "name_jp": "\u7df4\u99ac\u99c5"}, {"lat": 35.738227999999999, "name_en": "Keisei Tateishi Station", "ID": 275, "lng": 139.84796900000001, "name_jp": "\u4eac\u6210\u7acb\u77f3\u99c5"}, {"lat": 35.737751000000003, "name_en": "Edogawa Station", "ID": 276, "lng": 139.896051, "name_jp": "\u6c5f\u6238\u5ddd\u99c5"}, {"lat": 35.737372999999998, "name_en": "Ogawa Station", "ID": 277, "lng": 139.46346299999999, "name_jp": "\u5c0f\u5ddd\u99c5"}, {"lat": 35.737264000000003, "name_en": "Shin-Mikawashima Station", "ID": 278, "lng": 139.77447599999999, "name_jp": "\u65b0\u4e09\u6cb3\u5cf6\u99c5"}, {"lat": 35.737023999999998, "name_en": "Kodaira Station", "ID": 279, "lng": 139.488237, "name_jp": "\u5c0f\u5e73\u99c5"}, {"lat": 35.736794000000003, "name_en": "Nakamurabashi Station", "ID": 280, "lng": 139.63779299999999, "name_jp": "\u4e2d\u6751\u6a4b\u99c5"}, {"lat": 35.73677, "name_en": "Ekoda Station", "ID": 281, "lng": 139.67400499999999, "name_jp": "\u6c5f\u53e4\u7530\u99c5"}, {"lat": 35.735951999999997, "name_en": "Fujimidai Station", "ID": 282, "lng": 139.63000400000001, "name_jp": "\u5bcc\u58eb\u898b\u53f0\u99c5"}, {"lat": 35.735393999999999, "name_en": "Sugamo Shinden Station", "ID": 283, "lng": 139.72780700000001, "name_jp": "\u5de3\u9d28\u65b0\u7530\u99c5"}, {"lat": 35.734921999999997, "name_en": "Arakawa Kuyakushomae Station", "ID": 284, "lng": 139.78645800000001, "name_jp": "\u8352\u5ddd\u533a\u5f79\u6240\u524d\u99c5"}, {"lat": 35.734755999999997, "name_en": "Higashi-Yamatoshi Station", "ID": 285, "lng": 139.434954, "name_jp": "\u6771\u5927\u548c\u5e02\u99c5"}, {"lat": 35.733716999999999, "name_en": "Arakawaitchumae Station", "ID": 286, "lng": 139.78892999999999, "name_jp": "\u8352\u5ddd\u4e00\u4e2d\u524d\u99c5"}, {"lat": 35.733063000000001, "name_en": "Kanamech\u014d Station", "ID": 287, "lng": 139.700155, "name_jp": "\u8981\u753a\u99c5"}, {"lat": 35.732840000000003, "name_en": "Hinode Station", "ID": 288, "lng": 139.28265099999999, "name_jp": "\u65e5\u306e\u51fa\u99c5"}, {"lat": 35.732615000000003, "name_en": "Shin-egota Station", "ID": 289, "lng": 139.67037999999999, "name_jp": "\u65b0\u6c5f\u53e4\u7530\u99c5"}, {"lat": 35.732194999999997, "name_en": "Tamagawa-J\u014dsui Station", "ID": 290, "lng": 139.41855799999999, "name_jp": "\u7389\u5ddd\u4e0a\u6c34\u99c5"}, {"lat": 35.732129999999998, "name_en": "Minowabashi Station", "ID": 291, "lng": 139.79162700000001, "name_jp": "\u4e09\u30ce\u8f2a\u6a4b\u99c5"}, {"lat": 35.731729000000001, "name_en": "Yotsugi Station", "ID": 292, "lng": 139.834824, "name_jp": "\u56db\u30c4\u6728\u99c5"}, {"lat": 35.731448, "name_en": "\u014ctsuka Ekimae", "ID": 293, "lng": 139.72926000000001, "name_jp": "\u5927\u585a\u99c5\u524d\u99c5"}, {"lat": 35.730635999999997, "name_en": "\u014cmekaid\u014d Station", "ID": 294, "lng": 139.476551, "name_jp": "\u9752\u6885\u8857\u9053\u99c5"}, {"lat": 35.730545999999997, "name_en": "Higashi-Nagasaki Station", "ID": 295, "lng": 139.68271999999999, "name_jp": "\u6771\u9577\u5d0e\u99c5"}, {"lat": 35.730079000000003, "name_en": "Minowa Station", "ID": 296, "lng": 139.79213799999999, "name_jp": "\u4e09\u30ce\u8f2a\u99c5"}, {"lat": 35.728942000000004, "name_en": "Musashi-Sunagawa Station", "ID": 297, "lng": 139.39297300000001, "name_jp": "\u6b66\u8535\u7802\u5ddd\u99c5"}, {"lat": 35.728678000000002, "name_en": "Higashi-Fushimi Station", "ID": 298, "lng": 139.564347, "name_jp": "\u6771\u4f0f\u898b\u99c5"}, {"lat": 35.728628, "name_en": "Seibu-Yagisawa Station", "ID": 299, "lng": 139.55293800000001, "name_jp": "\u897f\u6b66\u67f3\u6ca2\u99c5"}, {"lat": 35.727978999999998, "name_en": "Sengoku Station", "ID": 300, "lng": 139.74476999999999, "name_jp": "\u5343\u77f3\u99c5"}, {"lat": 35.727536999999998, "name_en": "Musashi-Seki Station", "ID": 301, "lng": 139.57720900000001, "name_jp": "\u6b66\u8535\u95a2\u99c5"}, {"lat": 35.727283999999997, "name_en": "Tanashi Station", "ID": 302, "lng": 139.539874, "name_jp": "\u7530\u7121\u99c5"}, {"lat": 35.727108999999999, "name_en": "Yahiro Station", "ID": 303, "lng": 139.828273, "name_jp": "\u516b\u5e83\u99c5"}, {"lat": 35.726447999999998, "name_en": "Shiinamachi Station", "ID": 304, "lng": 139.69489200000001, "name_jp": "\u690e\u540d\u753a\u99c5"}, {"lat": 35.726286000000002, "name_en": "Hana-Koganei Station", "ID": 305, "lng": 139.51298399999999, "name_jp": "\u82b1\u5c0f\u91d1\u4e95\u99c5"}, {"lat": 35.726201000000003, "name_en": "Seibu-Tachikawa Station", "ID": 306, "lng": 139.370159, "name_jp": "\u897f\u6b66\u7acb\u5ddd\u99c5"}, {"lat": 35.726112999999998, "name_en": "Kami-Shakujii Station", "ID": 307, "lng": 139.59249700000001, "name_jp": "\u4e0a\u77f3\u795e\u4e95\u99c5"}, {"lat": 35.725580999999998, "name_en": "Higashi-Ikebukuro Station", "ID": 308, "lng": 139.719447, "name_jp": "\u6771\u6c60\u888b\u99c5"}, {"lat": 35.725546000000001, "name_en": "Sendagi Station", "ID": 309, "lng": 139.76331500000001, "name_jp": "\u5343\u99c4\u6728\u99c5"}, {"lat": 35.725358, "name_en": "Higashiikebukuro Yonchome Station", "ID": 310, "lng": 139.720451, "name_jp": "\u6771\u6c60\u888b\u56db\u4e01\u76ee\u99c5"}, {"lat": 35.725239999999999, "name_en": "Kami-Igusa Station", "ID": 311, "lng": 139.60314600000001, "name_jp": "\u4e0a\u4e95\u8349\u99c5"}, {"lat": 35.724857999999998, "name_en": "Iogi Station", "ID": 312, "lng": 139.614543, "name_jp": "\u4e95\u837b\u99c5"}, {"lat": 35.724764999999998, "name_en": "Hon-komagome Station", "ID": 313, "lng": 139.753704, "name_jp": "\u672c\u99d2\u8fbc\u99c5"}, {"lat": 35.724046000000001, "name_en": "Toden-Z\u014dshigaya Station", "ID": 314, "lng": 139.71772999999999, "name_jp": "\u90fd\u96fb\u96d1\u53f8\u30f6\u8c37\u99c5"}, {"lat": 35.723998999999999, "name_en": "Shimo-Igusa Station", "ID": 315, "lng": 139.62435500000001, "name_jp": "\u4e0b\u4e95\u8349\u99c5"}, {"lat": 35.723852000000001, "name_en": "Sunagawa-Nanaban Station", "ID": 316, "lng": 139.41826499999999, "name_jp": "\u7802\u5ddd\u4e03\u756a\u99c5"}, {"lat": 35.722727999999996, "name_en": "Ochiai-minami-nagasaki Station", "ID": 317, "lng": 139.68392499999999, "name_jp": "\u843d\u5408\u5357\u9577\u5d0e\u99c5"}, {"lat": 35.722622000000001, "name_en": "Saginomiya Station", "ID": 318, "lng": 139.639623, "name_jp": "\u9dfa\u30ce\u5bae\u99c5"}, {"lat": 35.722614, "name_en": "Takanodai Station", "ID": 319, "lng": 139.461051, "name_jp": "\u9df9\u306e\u53f0\u99c5"}, {"lat": 35.722257999999997, "name_en": "Toritsu-Kasei Station", "ID": 320, "lng": 139.64524700000001, "name_jp": "\u90fd\u7acb\u5bb6\u653f\u99c5"}, {"lat": 35.721755999999999, "name_en": "Hitotsubashi-Gakuen Station", "ID": 321, "lng": 139.48007799999999, "name_jp": "\u4e00\u6a4b\u5b66\u5712\u99c5"}, {"lat": 35.721190999999997, "name_en": "Hakusan Station", "ID": 322, "lng": 139.75205700000001, "name_jp": "\u767d\u5c71\u99c5"}, {"lat": 35.720725000000002, "name_en": "Iriya Station", "ID": 323, "lng": 139.78456299999999, "name_jp": "\u5165\u8c37\u99c5"}, {"lat": 35.720261000000001, "name_en": "Z\u014dshigaya Station", "ID": 324, "lng": 139.71481600000001, "name_jp": "\u96d1\u53f8\u304c\u8c37\u99c5"}, {"lat": 35.720080000000003, "name_en": "Kishibojinmae Station", "ID": 325, "lng": 139.714707, "name_jp": "\u9b3c\u5b50\u6bcd\u795e\u524d\u99c5"}, {"lat": 35.719576000000004, "name_en": "Numabukuro Station", "ID": 326, "lng": 139.66337300000001, "name_jp": "\u6cbc\u888b\u99c5"}, {"lat": 35.719028000000002, "name_en": "Gokokuji Station", "ID": 327, "lng": 139.72749999999999, "name_jp": "\u8b77\u56fd\u5bfa\u99c5"}, {"lat": 35.718727000000001, "name_en": "Keisei-Hikifune Station", "ID": 328, "lng": 139.820412, "name_jp": "\u4eac\u6210\u66f3\u821f\u99c5"}, {"lat": 35.718559999999997, "name_en": "Nogata Station", "ID": 329, "lng": 139.65312700000001, "name_jp": "\u91ce\u65b9\u99c5"}, {"lat": 35.718502999999998, "name_en": "Izumi-Taiikukan Station", "ID": 330, "lng": 139.419693, "name_jp": "\u6cc9\u4f53\u80b2\u9928\u99c5"}, {"lat": 35.717979, "name_en": "Nezu Station", "ID": 331, "lng": 139.76493300000001, "name_jp": "\u6839\u6d25\u99c5"}, {"lat": 35.717253999999997, "name_en": "T\u014ddaimae Station", "ID": 332, "lng": 139.75820200000001, "name_jp": "\u6771\u5927\u524d\u99c5"}, {"lat": 35.716476, "name_en": "Gakushuinshita Station", "ID": 333, "lng": 139.712546, "name_jp": "\u5b66\u7fd2\u9662\u4e0b\u99c5"}, {"lat": 35.715792, "name_en": "Araiyakushi-mae Station", "ID": 334, "lng": 139.67121599999999, "name_jp": "\u65b0\u4e95\u85ac\u5e2b\u524d\u99c5"}, {"lat": 35.715539, "name_en": "Shimo-Ochiai Station", "ID": 335, "lng": 139.694457, "name_jp": "\u4e0b\u843d\u5408\u99c5"}, {"lat": 35.714486000000001, "name_en": "Tachihi Station", "ID": 336, "lng": 139.417271, "name_jp": "\u7acb\u98db\u99c5"}, {"lat": 35.714275999999998, "name_en": "Nakai Station", "ID": 337, "lng": 139.68687499999999, "name_jp": "\u4e2d\u4e95\u99c5"}, {"lat": 35.712938000000001, "name_en": "Omokagebashi Station", "ID": 338, "lng": 139.71456599999999, "name_jp": "\u9762\u5f71\u6a4b\u99c5"}, {"lat": 35.711438000000001, "name_en": "Inarich\u014d Station", "ID": 339, "lng": 139.78241199999999, "name_jp": "\u7a32\u8377\u753a\u99c5"}, {"lat": 35.711418000000002, "name_en": "Koigakubo Station", "ID": 340, "lng": 139.46390500000001, "name_jp": "\u604b\u30f6\u7aaa\u99c5"}, {"lat": 35.711407999999999, "name_en": "Keisei Ueno Station", "ID": 341, "lng": 139.77411599999999, "name_jp": "\u4eac\u6210\u4e0a\u91ce\u99c5"}, {"lat": 35.710490999999998, "name_en": "Ochiai Station", "ID": 342, "lng": 139.68442200000001, "name_jp": "\u843d\u5408\u99c5"}, {"lat": 35.710362000000003, "name_en": "Omurai Station", "ID": 343, "lng": 139.82755299999999, "name_jp": "\u5c0f\u6751\u4e95\u99c5"}, {"lat": 35.710003999999998, "name_en": "Takamatsu Station", "ID": 344, "lng": 139.41318899999999, "name_jp": "\u9ad8\u677e\u99c5"}, {"lat": 35.709820000000001, "name_en": "Tawaramachi Station", "ID": 345, "lng": 139.79077799999999, "name_jp": "\u7530\u539f\u753a\u99c5"}, {"lat": 35.709771000000003, "name_en": "Shinozaki Station", "ID": 346, "lng": 139.916968, "name_jp": "\u7be0\u5d0e\u99c5"}, {"lat": 35.709522, "name_en": "Edogawabashi Station", "ID": 347, "lng": 139.73358099999999, "name_jp": "\u6c5f\u6238\u5ddd\u6a4b\u99c5"}, {"lat": 35.708615999999999, "name_en": "Honjo-azumabashi Station", "ID": 348, "lng": 139.80435900000001, "name_jp": "\u672c\u6240\u543e\u59bb\u6a4b\u99c5"}, {"lat": 35.708511999999999, "name_en": "Yushima Station", "ID": 349, "lng": 139.76972900000001, "name_jp": "\u6e6f\u5cf6\u99c5"}, {"lat": 35.708485000000003, "name_en": "Kasuga Station", "ID": 350, "lng": 139.75265099999999, "name_jp": "\u6625\u65e5\u99c5"}, {"lat": 35.708300999999999, "name_en": "Ueno-okachimachi Station", "ID": 351, "lng": 139.773021, "name_jp": "\u4e0a\u91ce\u5fa1\u5f92\u753a\u99c5"}, {"lat": 35.707925000000003, "name_en": "Nishi-Waseda Station", "ID": 352, "lng": 139.70905999999999, "name_jp": "\u897f\u65e9\u7a32\u7530\u99c5"}, {"lat": 35.707825999999997, "name_en": "Ueno-hirok\u014dji Station", "ID": 353, "lng": 139.77305000000001, "name_jp": "\u4e0a\u91ce\u5e83\u5c0f\u8def\u99c5"}, {"lat": 35.707375999999996, "name_en": "Higashi-Azuma Station", "ID": 354, "lng": 139.831738, "name_jp": "\u6771\u3042\u305a\u307e\u99c5"}, {"lat": 35.707036000000002, "name_en": "Shin-Okachimachi Station", "ID": 355, "lng": 139.782039, "name_jp": "\u65b0\u5fa1\u5f92\u753a\u99c5"}, {"lat": 35.706558999999999, "name_en": "Naka-Okachimachi Station", "ID": 356, "lng": 139.776174, "name_jp": "\u4ef2\u5fa1\u5f92\u753a\u99c5"}, {"lat": 35.705773999999998, "name_en": "Waseda Station", "ID": 357, "lng": 139.721283, "name_jp": "\u65e9\u7a32\u7530\u99c5"}, {"lat": 35.704099999999997, "name_en": "Kagurazaka Station", "ID": 358, "lng": 139.743493, "name_jp": "\u795e\u697d\u5742\u99c5"}, {"lat": 35.703221999999997, "name_en": "Kuramae Station", "ID": 359, "lng": 139.790944, "name_jp": "\u8535\u524d\u99c5"}, {"lat": 35.702944000000002, "name_en": "Suehiroch\u014d Station", "ID": 360, "lng": 139.77173999999999, "name_jp": "\u672b\u5e83\u753a\u99c5"}, {"lat": 35.702451000000003, "name_en": "Musashi-Sakai Station", "ID": 361, "lng": 139.545367, "name_jp": "\u6b66\u8535\u5883\u99c5"}, {"lat": 35.700913999999997, "name_en": "Ushigome-kagurazaka Station", "ID": 362, "lng": 139.73595, "name_jp": "\u725b\u8fbc\u795e\u697d\u5742\u99c5"}, {"lat": 35.700280999999997, "name_en": "Kokubunji Station", "ID": 363, "lng": 139.48000300000001, "name_jp": "\u56fd\u5206\u5bfa\u99c5"}, {"lat": 35.700049999999997, "name_en": "Kameidosuijin Station", "ID": 364, "lng": 139.83351999999999, "name_jp": "\u4e80\u6238\u6c34\u795e\u99c5"}, {"lat": 35.699468000000003, "name_en": "Ushigome-yanagich\u014d Station", "ID": 365, "lng": 139.72558799999999, "name_jp": "\u725b\u8fbc\u67f3\u753a\u99c5"}, {"lat": 35.699388999999996, "name_en": "Tachikawa-Kita Station", "ID": 366, "lng": 139.41248400000001, "name_jp": "\u7acb\u5ddd\u5317\u99c5"}, {"lat": 35.699300000000001, "name_en": "Wakamatsu-kawada Station", "ID": 367, "lng": 139.71843999999999, "name_jp": "\u82e5\u677e\u6cb3\u7530\u99c5"}, {"lat": 35.698926999999998, "name_en": "Higashi-Shinjuku Station", "ID": 368, "lng": 139.70765399999999, "name_jp": "\u6771\u65b0\u5bbf\u99c5"}, {"lat": 35.697912000000002, "name_en": "Shin-Ochanomizu Station", "ID": 369, "lng": 139.76594399999999, "name_jp": "\u65b0\u5fa1\u8336\u30ce\u6c34\u99c5"}, {"lat": 35.697521999999999, "name_en": "Inokashira-k\u014den Station", "ID": 370, "lng": 139.58281199999999, "name_jp": "\u4e95\u306e\u982d\u516c\u5712\u99c5"}, {"lat": 35.697352000000002, "name_en": "Ichinoe Station", "ID": 371, "lng": 139.88147799999999, "name_jp": "\u4e00\u4e4b\u6c5f\u99c5"}, {"lat": 35.696129999999997, "name_en": "Tachikawa-Minami Station", "ID": 372, "lng": 139.412587, "name_jp": "\u7acb\u5ddd\u5357\u99c5"}, {"lat": 35.696091000000003, "name_en": "Seibu-Shinjuku Station", "ID": 373, "lng": 139.70004599999999, "name_jp": "\u897f\u6b66\u65b0\u5bbf\u99c5"}, {"lat": 35.695929, "name_en": "Jimb\u014dch\u014d Station", "ID": 374, "lng": 139.75805199999999, "name_jp": "\u795e\u4fdd\u753a\u99c5"}, {"lat": 35.695706999999999, "name_en": "Kudanshita Station", "ID": 375, "lng": 139.752137, "name_jp": "\u4e5d\u6bb5\u4e0b\u99c5"}, {"lat": 35.695563, "name_en": "Iwamotoch\u014d Station", "ID": 376, "lng": 139.77556300000001, "name_jp": "\u5ca9\u672c\u753a\u99c5"}, {"lat": 35.694431999999999, "name_en": "Shin-Koganei Station", "ID": 377, "lng": 139.52664799999999, "name_jp": "\u65b0\u5c0f\u91d1\u4e95\u99c5"}, {"lat": 35.692886999999999, "name_en": "Mizue Station", "ID": 378, "lng": 139.89757900000001, "name_jp": "\u745e\u6c5f\u99c5"}, {"lat": 35.692833999999998, "name_en": "Shinjuku-Nishiguchi Station", "ID": 379, "lng": 139.69922500000001, "name_jp": "\u65b0\u5bbf\u897f\u53e3\u99c5"}, {"lat": 35.692388999999999, "name_en": "Akebonobashi Station", "ID": 380, "lng": 139.72286099999999, "name_jp": "\u66d9\u6a4b\u99c5"}, {"lat": 35.692250000000001, "name_en": "Mitakadai Station", "ID": 381, "lng": 139.58892700000001, "name_jp": "\u4e09\u9df9\u53f0\u99c5"}, {"lat": 35.692110999999997, "name_en": "Bakuro-yokoyama Station", "ID": 382, "lng": 139.78277800000001, "name_jp": "\u99ac\u55b0\u6a2a\u5c71\u99c5"}, {"lat": 35.692110999999997, "name_en": "Higashi-Nihonbashi Station", "ID": 383, "lng": 139.78488899999999, "name_jp": "\u6771\u65e5\u672c\u6a4b\u99c5"}, {"lat": 35.690753000000001, "name_en": "Kodemmach\u014d Station", "ID": 384, "lng": 139.77845199999999, "name_jp": "\u5c0f\u4f1d\u99ac\u753a\u99c5"}, {"lat": 35.690384999999999, "name_en": "Toch\u014dmae Station", "ID": 385, "lng": 139.691474, "name_jp": "\u90fd\u5e81\u524d\u99c5"}, {"lat": 35.690004000000002, "name_en": "Shibasaki-Taiikukan Station", "ID": 386, "lng": 139.409402, "name_jp": "\u67f4\u5d0e\u4f53\u80b2\u9928\u99c5"}, {"lat": 35.689990000000002, "name_en": "Nishi-Shinjuku-goch\u014dme Station", "ID": 387, "lng": 139.68477100000001, "name_jp": "\u897f\u65b0\u5bbf\u4e94\u4e01\u76ee\u99c5"}, {"lat": 35.689774, "name_en": "\u014cjima Station", "ID": 388, "lng": 139.83523199999999, "name_jp": "\u5927\u5cf6\u99c5"}, {"lat": 35.689427000000002, "name_en": "Takebashi Station", "ID": 389, "lng": 139.76102499999999, "name_jp": "\u7af9\u6a4b\u99c5"}, {"lat": 35.688918000000001, "name_en": "Higashi-\u014djima Station", "ID": 390, "lng": 139.849796, "name_jp": "\u6771\u5927\u5cf6\u99c5"}, {"lat": 35.688848999999998, "name_en": "Sumiyoshi Station", "ID": 391, "lng": 139.81566900000001, "name_jp": "\u4f4f\u5409\u99c5"}, {"lat": 35.688471999999997, "name_en": "Hamach\u014d Station", "ID": 392, "lng": 139.788139, "name_jp": "\u6d5c\u753a\u99c5"}, {"lat": 35.688352000000002, "name_en": "Kikukawa Station", "ID": 393, "lng": 139.80602300000001, "name_jp": "\u83ca\u5ddd\u99c5"}, {"lat": 35.687823000000002, "name_en": "Morishita Station", "ID": 394, "lng": 139.796243, "name_jp": "\u68ee\u4e0b\u99c5"}, {"lat": 35.687658999999996, "name_en": "Kugayama Station", "ID": 395, "lng": 139.60088500000001, "name_jp": "\u4e45\u6211\u5c71\u99c5"}, {"lat": 35.686303000000002, "name_en": "Ningy\u014dch\u014d Station", "ID": 396, "lng": 139.78226900000001, "name_jp": "\u4eba\u5f62\u753a\u99c5"}, {"lat": 35.685679, "name_en": "Hanz\u014dmon Station", "ID": 397, "lng": 139.74162899999999, "name_jp": "\u534a\u8535\u9580\u99c5"}, {"lat": 35.685129000000003, "name_en": "Mitsukoshimae Station", "ID": 398, "lng": 139.77117799999999, "name_jp": "\u4e09\u8d8a\u524d\u99c5"}, {"lat": 35.684866999999997, "name_en": "Fujimigaoka Station", "ID": 399, "lng": 139.60701900000001, "name_jp": "\u5bcc\u58eb\u898b\u30f6\u4e18\u99c5"}, {"lat": 35.684027999999998, "name_en": "K\u014djimachi Station", "ID": 400, "lng": 139.73766699999999, "name_jp": "\u9eb9\u753a\u99c5"}, {"lat": 35.684013, "name_en": "Funabori Station", "ID": 401, "lng": 139.86389600000001, "name_jp": "\u8239\u5800\u99c5"}, {"lat": 35.683261000000002, "name_en": "Takaido Station", "ID": 402, "lng": 139.614914, "name_jp": "\u9ad8\u4e95\u6238\u99c5"}, {"lat": 35.682056000000003, "name_en": "Suiteng\u016bmae Station", "ID": 403, "lng": 139.78602799999999, "name_jp": "\u6c34\u5929\u5bae\u524d\u99c5"}, {"lat": 35.682031000000002, "name_en": "Kiyosumi-shirakawa Station", "ID": 404, "lng": 139.79878299999999, "name_jp": "\u6e05\u6f84\u767d\u6cb3\u99c5"}, {"lat": 35.681930999999999, "name_en": "Hamadayama Station", "ID": 405, "lng": 139.627127, "name_jp": "\u6d5c\u7530\u5c71\u99c5"}, {"lat": 35.681649, "name_en": "Nihombashi Station", "ID": 406, "lng": 139.776195, "name_jp": "\u65e5\u672c\u6a4b\u99c5"}, {"lat": 35.681279000000004, "name_en": "Hatsudai Station", "ID": 407, "lng": 139.68588800000001, "name_jp": "\u521d\u53f0\u99c5"}, {"lat": 35.680911999999999, "name_en": "Kayabach\u014d Station", "ID": 408, "lng": 139.77803399999999, "name_jp": "\u8305\u5834\u753a\u99c5"}, {"lat": 35.680351999999999, "name_en": "Nij\u016bbashimae Station", "ID": 409, "lng": 139.76157900000001, "name_jp": "\u4e8c\u91cd\u6a4b\u524d\u99c5"}, {"lat": 35.679999000000002, "name_en": "Kokuritsu-Ky\u014dgij\u014d Station", "ID": 410, "lng": 139.71420599999999, "name_jp": "\u56fd\u7acb\u7af6\u6280\u5834\u99c5"}, {"lat": 35.678719999999998, "name_en": "Nishi-eifuku Station", "ID": 411, "lng": 139.635346, "name_jp": "\u897f\u6c38\u798f\u99c5"}, {"lat": 35.678581000000001, "name_en": "Nagatach\u014d Station", "ID": 412, "lng": 139.740287, "name_jp": "\u6c38\u7530\u753a\u99c5"}, {"lat": 35.678488999999999, "name_en": "Kitasand\u014d Station", "ID": 413, "lng": 139.70545799999999, "name_jp": "\u5317\u53c2\u9053\u99c5"}, {"lat": 35.678288999999999, "name_en": "K\u014dsh\u016b-Kaid\u014d Station", "ID": 414, "lng": 139.40922900000001, "name_jp": "\u7532\u5dde\u8857\u9053\u99c5"}, {"lat": 35.677360999999998, "name_en": "Sakuradamon Station", "ID": 415, "lng": 139.75174999999999, "name_jp": "\u685c\u7530\u9580\u99c5"}, {"lat": 35.677128000000003, "name_en": "Hatagaya Station", "ID": 416, "lng": 139.676918, "name_jp": "\u5e61\u30f6\u8c37\u99c5"}, {"lat": 35.676544999999997, "name_en": "Ky\u014dbashi Station", "ID": 417, "lng": 139.76988499999999, "name_jp": "\u4eac\u6a4b\u99c5"}, {"lat": 35.676488999999997, "name_en": "Tama Station", "ID": 418, "lng": 139.51729900000001, "name_jp": "\u591a\u78e8\u99c5"}, {"lat": 35.676203000000001, "name_en": "Eifukuch\u014d Station", "ID": 419, "lng": 139.642607, "name_jp": "\u6c38\u798f\u753a\u99c5"}, {"lat": 35.675429999999999, "name_en": "Takarach\u014d Station", "ID": 420, "lng": 139.77188000000001, "name_jp": "\u5b9d\u753a\u99c5"}, {"lat": 35.674245999999997, "name_en": "Sasazuka Station", "ID": 421, "lng": 139.66724199999999, "name_jp": "\u7b39\u585a\u99c5"}, {"lat": 35.674101, "name_en": "Hibiya Station", "ID": 422, "lng": 139.76106999999999, "name_jp": "\u65e5\u6bd4\u8c37\u99c5"}, {"lat": 35.673560999999999, "name_en": "Ginza-itch\u014dme Station", "ID": 423, "lng": 139.76773700000001, "name_jp": "\u9280\u5ea7\u4e00\u4e01\u76ee\u99c5"}, {"lat": 35.673257, "name_en": "Yoyogi-K\u014den Station", "ID": 424, "lng": 139.69737499999999, "name_jp": "\u4ee3\u3005\u6728\u516c\u5712\u99c5"}, {"lat": 35.672778000000001, "name_en": "Aoyama-itch\u014dme Station", "ID": 425, "lng": 139.724028, "name_jp": "\u9752\u5c71\u4e00\u4e01\u76ee\u99c5"}, {"lat": 35.672514999999997, "name_en": "Monzen-Nakach\u014d Station", "ID": 426, "lng": 139.79493600000001, "name_jp": "\u9580\u524d\u4ef2\u753a\u99c5"}, {"lat": 35.672288000000002, "name_en": "Akasaka Station", "ID": 427, "lng": 139.7364, "name_jp": "\u8d64\u5742\u99c5"}, {"lat": 35.672271000000002, "name_en": "Fuch\u016b Station", "ID": 428, "lng": 139.48004299999999, "name_jp": "\u5e9c\u4e2d\u99c5"}, {"lat": 35.671101999999998, "name_en": "Tameike-Sann\u014d Station", "ID": 429, "lng": 139.74230499999999, "name_jp": "\u6e9c\u6c60\u5c71\u738b\u99c5"}, {"lat": 35.670976000000003, "name_en": "Daitabashi Station", "ID": 430, "lng": 139.65876299999999, "name_jp": "\u4ee3\u7530\u6a4b\u99c5"}, {"lat": 35.670628000000001, "name_en": "Roka-k\u014den Station", "ID": 431, "lng": 139.608847, "name_jp": "\u82a6\u82b1\u516c\u5712\u99c5"}, {"lat": 35.670499999999997, "name_en": "Shintomich\u014d Station", "ID": 432, "lng": 139.77372199999999, "name_jp": "\u65b0\u5bcc\u753a\u99c5"}, {"lat": 35.670309000000003, "name_en": "Gaiemmae Station", "ID": 433, "lng": 139.71792600000001, "name_jp": "\u5916\u82d1\u524d\u99c5"}, {"lat": 35.670161999999998, "name_en": "Toranomon Station", "ID": 434, "lng": 139.75041200000001, "name_jp": "\u864e\u30ce\u9580\u99c5"}, {"lat": 35.670062000000001, "name_en": "Manganji Station", "ID": 435, "lng": 139.41967299999999, "name_jp": "\u4e07\u9858\u5bfa\u99c5"}, {"lat": 35.669969999999999, "name_en": "Higashi-ginza Station", "ID": 436, "lng": 139.76682600000001, "name_jp": "\u6771\u9280\u5ea7\u99c5"}, {"lat": 35.669652999999997, "name_en": "Chitose-karasuyama Station", "ID": 437, "lng": 139.599908, "name_jp": "\u5343\u6b73\u70cf\u5c71\u99c5"}, {"lat": 35.669589999999999, "name_en": "T\u014dy\u014dch\u014d Station", "ID": 438, "lng": 139.817342, "name_jp": "\u6771\u967d\u753a\u99c5"}, {"lat": 35.669556, "name_en": "Hachimanyama Station", "ID": 439, "lng": 139.61708899999999, "name_jp": "\u516b\u5e61\u5c71\u99c5"}, {"lat": 35.669410999999997, "name_en": "Kiba Station", "ID": 440, "lng": 139.80653000000001, "name_jp": "\u6728\u5834\u99c5"}, {"lat": 35.668889999999998, "name_en": "Higashi-fuch\u016b Station", "ID": 441, "lng": 139.495003, "name_jp": "\u6771\u5e9c\u4e2d\u99c5"}, {"lat": 35.668819999999997, "name_en": "Kami-kitazawa Station", "ID": 442, "lng": 139.623299, "name_jp": "\u4e0a\u5317\u6ca2\u99c5"}, {"lat": 35.668782999999998, "name_en": "Meidaimae Station", "ID": 443, "lng": 139.65048300000001, "name_jp": "\u660e\u5927\u524d\u99c5"}, {"lat": 35.66872, "name_en": "Minami-Sunamachi Station", "ID": 444, "lng": 139.83159900000001, "name_jp": "\u5357\u7802\u753a\u99c5"}, {"lat": 35.668546999999997, "name_en": "Meiji-Jing\u016bmae Station", "ID": 445, "lng": 139.70494199999999, "name_jp": "\u660e\u6cbb\u795e\u5bae\u524d\u99c5"}, {"lat": 35.668354000000001, "name_en": "Uchisaiwaich\u014d Station", "ID": 446, "lng": 139.754741, "name_jp": "\u5185\u5e78\u753a\u99c5"}, {"lat": 35.668114000000003, "name_en": "Tsukiji Station", "ID": 447, "lng": 139.77256299999999, "name_jp": "\u7bc9\u5730\u99c5"}, {"lat": 35.667717000000003, "name_en": "Sakuraj\u014dsui Station", "ID": 448, "lng": 139.63192100000001, "name_jp": "\u685c\u4e0a\u6c34\u99c5"}, {"lat": 35.666626999999998, "name_en": "Tama-reien Station", "ID": 449, "lng": 139.50150300000001, "name_jp": "\u591a\u78e8\u970a\u5712\u99c5"}, {"lat": 35.666463, "name_en": "Shiraitodai Station", "ID": 450, "lng": 139.50981100000001, "name_jp": "\u767d\u7cf8\u53f0\u99c5"}, {"lat": 35.666168999999996, "name_en": "Shimo-takaido Station", "ID": 451, "lng": 139.641435, "name_jp": "\u4e0b\u9ad8\u4e95\u6238\u99c5"}, {"lat": 35.665804000000001, "name_en": "Omotesand\u014d Station", "ID": 452, "lng": 139.712908, "name_jp": "\u8868\u53c2\u9053\u99c5"}, {"lat": 35.665731000000001, "name_en": "Nogizaka Station", "ID": 453, "lng": 139.725606, "name_jp": "\u4e43\u6728\u5742\u99c5"}, {"lat": 35.665154999999999, "name_en": "Roppongi-itch\u014dme Station", "ID": 454, "lng": 139.73843400000001, "name_jp": "\u516d\u672c\u6728\u4e00\u4e01\u76ee\u99c5"}, {"lat": 35.664613000000003, "name_en": "Tsukishima Station", "ID": 455, "lng": 139.78531899999999, "name_jp": "\u6708\u5cf6\u99c5"}, {"lat": 35.664256000000002, "name_en": "Musashinodai Station", "ID": 456, "lng": 139.51093900000001, "name_jp": "\u6b66\u8535\u91ce\u53f0\u99c5"}, {"lat": 35.664099, "name_en": "Nishi-Kasai Station", "ID": 457, "lng": 139.859182, "name_jp": "\u897f\u845b\u897f\u99c5"}, {"lat": 35.663642000000003, "name_en": "Roppongi Station", "ID": 458, "lng": 139.732775, "name_jp": "\u516d\u672c\u6728\u99c5"}, {"lat": 35.663542999999997, "name_en": "Kasai Station", "ID": 459, "lng": 139.872657, "name_jp": "\u845b\u897f\u99c5"}, {"lat": 35.662975000000003, "name_en": "Kamiyach\u014d Station", "ID": 460, "lng": 139.745036, "name_jp": "\u795e\u8c37\u753a\u99c5"}, {"lat": 35.662906999999997, "name_en": "Shiodome Station", "ID": 461, "lng": 139.759972, "name_jp": "\u6c50\u7559\u99c5"}, {"lat": 35.662644999999998, "name_en": "Higashi-matsubara Station", "ID": 462, "lng": 139.65570399999999, "name_jp": "\u6771\u677e\u539f\u99c5"}, {"lat": 35.662579999999998, "name_en": "Shindaita Station", "ID": 463, "lng": 139.66052500000001, "name_jp": "\u65b0\u4ee3\u7530\u99c5"}, {"lat": 35.662045999999997, "name_en": "Sengawa Station", "ID": 464, "lng": 139.58525599999999, "name_jp": "\u4ed9\u5ddd\u99c5"}, {"lat": 35.661501000000001, "name_en": "Takahatafud\u014d Station", "ID": 465, "lng": 139.41521900000001, "name_jp": "\u9ad8\u5e61\u4e0d\u52d5\u99c5"}, {"lat": 35.661499999999997, "name_en": "Tsukijishij\u014d Station", "ID": 466, "lng": 139.769822, "name_jp": "\u7bc9\u5730\u5e02\u5834\u99c5"}, {"lat": 35.660547000000001, "name_en": "Ikenoue Station", "ID": 467, "lng": 139.67304100000001, "name_jp": "\u6c60\u30ce\u4e0a\u99c5"}, {"lat": 35.660066999999998, "name_en": "Tobitaky\u016b Station", "ID": 468, "lng": 139.52347, "name_jp": "\u98db\u7530\u7d66\u99c5"}, {"lat": 35.660021999999998, "name_en": "Matsubara Station", "ID": 469, "lng": 139.64196999999999, "name_jp": "\u677e\u539f\u99c5"}, {"lat": 35.659585999999997, "name_en": "Nakagawara Station", "ID": 470, "lng": 139.45789400000001, "name_jp": "\u4e2d\u6cb3\u539f\u99c5"}, {"lat": 35.659374999999997, "name_en": "Onarimon Station", "ID": 471, "lng": 139.75046, "name_jp": "\u5fa1\u6210\u9580\u99c5"}, {"lat": 35.658943000000001, "name_en": "Kachidoki Station", "ID": 472, "lng": 139.77720299999999, "name_jp": "\u52dd\u3069\u304d\u99c5"}, {"lat": 35.658901999999998, "name_en": "Komaba-t\u014ddaimae Station", "ID": 473, "lng": 139.68336300000001, "name_jp": "\u99d2\u5834\u6771\u5927\u524d\u99c5"}, {"lat": 35.658093000000001, "name_en": "Tsutsujigaoka Station", "ID": 474, "lng": 139.575334, "name_jp": "\u3064\u3064\u3058\u30f6\u4e18\u99c5"}, {"lat": 35.657581999999998, "name_en": "Kei\u014d-hachi\u014dji Station", "ID": 475, "lng": 139.34382199999999, "name_jp": "\u4eac\u738b\u516b\u738b\u5b50\u99c5"}, {"lat": 35.657228000000003, "name_en": "Shinsen Station", "ID": 476, "lng": 139.69364300000001, "name_jp": "\u795e\u6cc9\u99c5"}, {"lat": 35.657150000000001, "name_en": "Mogusaen Station", "ID": 477, "lng": 139.43036900000001, "name_jp": "\u767e\u8349\u5712\u99c5"}, {"lat": 35.657024999999997, "name_en": "Nishi-ch\u014dfu Station", "ID": 478, "lng": 139.53017, "name_jp": "\u897f\u8abf\u5e03\u99c5"}, {"lat": 35.656793999999998, "name_en": "Daimon Station", "ID": 479, "lng": 139.75469200000001, "name_jp": "\u5927\u9580\u99c5"}, {"lat": 35.656252000000002, "name_en": "Koremasa Station", "ID": 480, "lng": 139.488879, "name_jp": "\u662f\u653f\u99c5"}, {"lat": 35.656222, "name_en": "Ky\u014dteij\u014d-mae Station", "ID": 481, "lng": 139.49973199999999, "name_jp": "\u7af6\u8247\u5834\u524d\u99c5"}, {"lat": 35.655569999999997, "name_en": "Azabu-J\u016bban Station", "ID": 482, "lng": 139.737382, "name_jp": "\u9ebb\u5e03\u5341\u756a\u99c5"}, {"lat": 35.655360000000002, "name_en": "Hodokubo Station", "ID": 483, "lng": 139.41087999999999, "name_jp": "\u7a0b\u4e45\u4fdd\u99c5"}, {"lat": 35.655327, "name_en": "Shibak\u014den Station", "ID": 484, "lng": 139.749832, "name_jp": "\u829d\u516c\u5712\u99c5"}, {"lat": 35.655163000000002, "name_en": "Minamidaira Station", "ID": 485, "lng": 139.392516, "name_jp": "\u5357\u5e73\u99c5"}, {"lat": 35.654969999999999, "name_en": "Akabanebashi Station", "ID": 486, "lng": 139.74389300000001, "name_jp": "\u8d64\u7fbd\u6a4b\u99c5"}, {"lat": 35.654680999999997, "name_en": "Toyosu Station", "ID": 487, "lng": 139.796978, "name_jp": "\u8c4a\u6d32\u99c5"}, {"lat": 35.654204, "name_en": "Shibasaki Station", "ID": 488, "lng": 139.567002, "name_jp": "\u67f4\u5d0e\u99c5"}, {"lat": 35.653973999999998, "name_en": "Takeshiba Station", "ID": 489, "lng": 139.76190700000001, "name_jp": "\u7af9\u829d\u99c5"}, {"lat": 35.653815999999999, "name_en": "Yamashita Station", "ID": 490, "lng": 139.64515, "name_jp": "\u5c71\u4e0b\u99c5"}, {"lat": 35.651829999999997, "name_en": "Ch\u014dfu Station", "ID": 491, "lng": 139.54446100000001, "name_jp": "\u8abf\u5e03\u99c5"}, {"lat": 35.651533999999998, "name_en": "Hiroo Station", "ID": 492, "lng": 139.72219999999999, "name_jp": "\u5e83\u5c3e\u99c5"}, {"lat": 35.651445000000002, "name_en": "Seiseki-sakuragaoka Station", "ID": 493, "lng": 139.447058, "name_jp": "\u8056\u8e5f\u685c\u30f6\u4e18\u99c5"}, {"lat": 35.651031000000003, "name_en": "Ikejiri-\u014chashi Station", "ID": 494, "lng": 139.6848, "name_jp": "\u6c60\u5c3b\u5927\u6a4b\u99c5"}, {"lat": 35.650334000000001, "name_en": "Kokury\u014d Station", "ID": 495, "lng": 139.55757399999999, "name_jp": "\u56fd\u9818\u99c5"}, {"lat": 35.649892999999999, "name_en": "Fuda Station", "ID": 496, "lng": 139.551231, "name_jp": "\u5e03\u7530\u99c5"}, {"lat": 35.649498999999999, "name_en": "Tama-d\u014dbutsuk\u014den Station", "ID": 497, "lng": 139.405439, "name_jp": "\u591a\u6469\u52d5\u7269\u516c\u5712\u99c5"}, {"lat": 35.648865999999998, "name_en": "Mita Station", "ID": 498, "lng": 139.74876, "name_jp": "\u4e09\u7530\u99c5"}, {"lat": 35.648805000000003, "name_en": "Shin-toyosu Station", "ID": 499, "lng": 139.79019299999999, "name_jp": "\u65b0\u8c4a\u6d32\u99c5"}, {"lat": 35.648206999999999, "name_en": "Daikanyama Station", "ID": 500, "lng": 139.703262, "name_jp": "\u4ee3\u5b98\u5c71\u99c5"}, {"lat": 35.647838999999998, "name_en": "Miyanosaka Station", "ID": 501, "lng": 139.644993, "name_jp": "\u5bae\u306e\u5742\u99c5"}, {"lat": 35.647635999999999, "name_en": "Hirayamaj\u014dshi-k\u014den Station", "ID": 502, "lng": 139.38081700000001, "name_jp": "\u5e73\u5c71\u57ce\u5740\u516c\u5712\u99c5"}, {"lat": 35.645871999999997, "name_en": "Wakabayashi Station", "ID": 503, "lng": 139.65986699999999, "name_jp": "\u82e5\u6797\u99c5"}, {"lat": 35.645808000000002, "name_en": "Shij\u014d-mae Station", "ID": 504, "lng": 139.78575799999999, "name_jp": "\u5e02\u5834\u524d\u99c5"}, {"lat": 35.645555999999999, "name_en": "Tatsumi Station", "ID": 505, "lng": 139.81055599999999, "name_jp": "\u8fb0\u5df3\u99c5"}, {"lat": 35.644607000000001, "name_en": "Nishi-Taishid\u014d Station", "ID": 506, "lng": 139.66622799999999, "name_jp": "\u897f\u592a\u5b50\u5802\u99c5"}, {"lat": 35.644437000000003, "name_en": "Kitano Station", "ID": 507, "lng": 139.35428899999999, "name_jp": "\u5317\u91ce\u99c5"}, {"lat": 35.644385, "name_en": "Naka-Meguro Station", "ID": 508, "lng": 139.69912500000001, "name_jp": "\u4e2d\u76ee\u9ed2\u99c5"}, {"lat": 35.644362999999998, "name_en": "Kei\u014d-katakura Station", "ID": 509, "lng": 139.33700300000001, "name_jp": "\u4eac\u738b\u7247\u5009\u99c5"}, {"lat": 35.644198000000003, "name_en": "Yamada Station", "ID": 510, "lng": 139.32136199999999, "name_jp": "\u5c71\u7530\u99c5"}, {"lat": 35.643965000000001, "name_en": "Sh\u014din-Jinjamae Station", "ID": 511, "lng": 139.65530999999999, "name_jp": "\u677e\u9670\u795e\u793e\u524d\u99c5"}, {"lat": 35.643726000000001, "name_en": "Sangen-Jaya Station", "ID": 512, "lng": 139.67196200000001, "name_jp": "\u4e09\u8ed2\u8336\u5c4b\u99c5"}, {"lat": 35.643552, "name_en": "Kei\u014d-tamagawa Station", "ID": 513, "lng": 139.539368, "name_jp": "\u4eac\u738b\u591a\u6469\u5ddd\u99c5"}, {"lat": 35.643504, "name_en": "Setagaya Station", "ID": 514, "lng": 139.65071699999999, "name_jp": "\u4e16\u7530\u8c37\u99c5"}, {"lat": 35.643267999999999, "name_en": "Shirokane-takanawa Station", "ID": 515, "lng": 139.734678, "name_jp": "\u767d\u91d1\u9ad8\u8f2a\u99c5"}, {"lat": 35.643197000000001, "name_en": "Mejirodai Station", "ID": 516, "lng": 139.307355, "name_jp": "\u3081\u3058\u308d\u53f0\u99c5"}, {"lat": 35.642785000000003, "name_en": "Naganuma Station", "ID": 517, "lng": 139.366027, "name_jp": "\u9577\u6cbc\u99c5"}, {"lat": 35.642758999999998, "name_en": "Kamimachi Station", "ID": 518, "lng": 139.646714, "name_jp": "\u4e0a\u753a\u99c5"}, {"lat": 35.642389000000001, "name_en": "Takao Station", "ID": 519, "lng": 139.282939, "name_jp": "\u9ad8\u5c3e\u99c5"}, {"lat": 35.641804999999998, "name_en": "Ch\u016b\u014d-Daigaku-Meisei-Daigaku Station", "ID": 520, "lng": 139.408557, "name_jp": "\u4e2d\u592e\u5927\u5b66\u30fb\u660e\u661f\u5927\u5b66\u99c5"}, {"lat": 35.641722999999999, "name_en": "Shibaura-fut\u014d Station", "ID": 521, "lng": 139.75777600000001, "name_jp": "\u829d\u6d66\u3075\u982d\u99c5"}, {"lat": 35.640687999999997, "name_en": "Hazama Station", "ID": 522, "lng": 139.29325700000001, "name_jp": "\u72ed\u9593\u99c5"}, {"lat": 35.640597999999997, "name_en": "Shinonome Station", "ID": 523, "lng": 139.80323300000001, "name_jp": "\u6771\u96f2\u99c5"}, {"lat": 35.640126000000002, "name_en": "Ariake-tennis-no-mori Station", "ID": 524, "lng": 139.788861, "name_jp": "\u6709\u660e\u30c6\u30cb\u30b9\u306e\u68ee\u99c5"}, {"lat": 35.638134000000001, "name_en": "Shirokanedai Station\u00a0", "ID": 525, "lng": 139.726572, "name_jp": "\u767d\u91d1\u53f0\u99c5"}, {"lat": 35.637678999999999, "name_en": "Y\u016btenji Station", "ID": 526, "lng": 139.69146599999999, "name_jp": "\u7950\u5929\u5bfa\u99c5"}, {"lat": 35.636882999999997, "name_en": "\u014ctsuka-Teiky\u014d-Daigaku Station", "ID": 527, "lng": 139.41645199999999, "name_jp": "\u5927\u585a\u30fb\u5e1d\u4eac\u5927\u5b66\u99c5"}, {"lat": 35.635834000000003, "name_en": "Inagi Station", "ID": 528, "lng": 139.500383, "name_jp": "\u7a32\u57ce\u99c5"}, {"lat": 35.634585999999999, "name_en": "Ariake Station", "ID": 529, "lng": 139.793319, "name_jp": "\u6709\u660e\u99c5"}, {"lat": 35.633510000000001, "name_en": "Komazawa-daigaku Station", "ID": 530, "lng": 139.66177099999999, "name_jp": "\u99d2\u6ca2\u5927\u5b66\u99c5"}, {"lat": 35.633490000000002, "name_en": "Kokusai-Tenjij\u014d Station", "ID": 531, "lng": 139.79220100000001, "name_jp": "\u56fd\u969b\u5c55\u793a\u5834\u99c5"}, {"lat": 35.632548999999997, "name_en": "Kei\u014d-yomiuri-land Station", "ID": 532, "lng": 139.516381, "name_jp": "\u4eac\u738b\u3088\u307f\u3046\u308a\u30e9\u30f3\u30c9\u99c5"}, {"lat": 35.632523999999997, "name_en": "Takaosanguchi Station", "ID": 533, "lng": 139.26983200000001, "name_jp": "\u9ad8\u5c3e\u5c71\u53e3\u99c5"}, {"lat": 35.631816000000001, "name_en": "Matsugaya Station", "ID": 534, "lng": 139.42202900000001, "name_jp": "\u677e\u304c\u8c37\u99c5"}, {"lat": 35.631675999999999, "name_en": "Sakura-shimmachi Station", "ID": 535, "lng": 139.64433500000001, "name_jp": "\u685c\u65b0\u753a\u99c5"}, {"lat": 35.631675999999999, "name_en": "Takanawadai Station", "ID": 536, "lng": 139.73068499999999, "name_jp": "\u9ad8\u8f2a\u53f0\u99c5"}, {"lat": 35.630257999999998, "name_en": "Nagayama Station", "ID": 537, "lng": 139.44835599999999, "name_jp": "\u4eac\u738b\u6c38\u5c71\u99c5"}, {"lat": 35.630056000000003, "name_en": "Kokusai-tenjij\u014d-seimon Station", "ID": 538, "lng": 139.7912, "name_jp": "\u56fd\u969b\u5c55\u793a\u5834\u6b63\u9580\u99c5"}, {"lat": 35.629883, "name_en": "Nagayama Station", "ID": 539, "lng": 139.44819799999999, "name_jp": "\u5c0f\u7530\u6025\u6c38\u5c71\u99c5"}, {"lat": 35.629786000000003, "name_en": "Odaiba-kaihink\u014den Station", "ID": 540, "lng": 139.77871500000001, "name_jp": "\u304a\u53f0\u5834\u6d77\u6d5c\u516c\u5712\u99c5"}, {"lat": 35.628925000000002, "name_en": "Gakugei-daigaku Station", "ID": 541, "lng": 139.68534399999999, "name_jp": "\u5b66\u82b8\u5927\u5b66\u99c5"}, {"lat": 35.627642999999999, "name_en": "Tokyo Teleport Station", "ID": 542, "lng": 139.77878200000001, "name_jp": "\u6771\u4eac\u30c6\u30ec\u30dd\u30fc\u30c8\u99c5"}, {"lat": 35.626443000000002, "name_en": "Y\u014dga Station", "ID": 543, "lng": 139.63324499999999, "name_jp": "\u7528\u8cc0\u99c5"}, {"lat": 35.625855999999999, "name_en": "Daiba Station", "ID": 544, "lng": 139.77137500000001, "name_jp": "\u53f0\u5834\u99c5"}, {"lat": 35.625340999999999, "name_en": "Fud\u014d-mae Station", "ID": 545, "lng": 139.713054, "name_jp": "\u4e0d\u52d5\u524d\u99c5"}, {"lat": 35.625335999999997, "name_en": "Tama-Center Station", "ID": 546, "lng": 139.424553, "name_jp": "\u4eac\u738b\u591a\u6469\u30bb\u30f3\u30bf\u30fc\u99c5"}, {"lat": 35.624718000000001, "name_en": "Kei\u014d-horinouchi Station", "ID": 547, "lng": 139.40102200000001, "name_jp": "\u4eac\u738b\u5800\u4e4b\u5185\u99c5"}, {"lat": 35.624597999999999, "name_en": "Aomi Station", "ID": 548, "lng": 139.78106099999999, "name_jp": "\u9752\u6d77\u99c5"}, {"lat": 35.622729, "name_en": "\u014csaki-Hirok\u014dji Station", "ID": 549, "lng": 139.72275300000001, "name_jp": "\u5927\u5d0e\u5e83\u5c0f\u8def\u99c5"}, {"lat": 35.622684999999997, "name_en": "Tenn\u014dzu Isle Station", "ID": 550, "lng": 139.75082900000001, "name_jp": "\u5929\u738b\u6d32\u30a2\u30a4\u30eb\u99c5"}, {"lat": 35.619909, "name_en": "Musashi-Koyama Station", "ID": 551, "lng": 139.70357300000001, "name_jp": "\u6b66\u8535\u5c0f\u5c71\u99c5"}, {"lat": 35.619894000000002, "name_en": "Fune-no-kagakukan Station", "ID": 552, "lng": 139.77413200000001, "name_jp": "\u8239\u306e\u79d1\u5b66\u9928\u99c5"}, {"lat": 35.617556, "name_en": "Toritsu-Daigaku Station", "ID": 553, "lng": 139.67617300000001, "name_jp": "\u90fd\u7acb\u5927\u5b66\u99c5"}, {"lat": 35.617432000000001, "name_en": "Telecom Center Station", "ID": 554, "lng": 139.77891099999999, "name_jp": "\u30c6\u30ec\u30b3\u30e0\u30bb\u30f3\u30bf\u30fc\u99c5"}, {"lat": 35.616073, "name_en": "Togoshi-Ginza Station", "ID": 555, "lng": 139.71502000000001, "name_jp": "\u6238\u8d8a\u9280\u5ea7\u99c5"}, {"lat": 35.615470000000002, "name_en": "Nishi-Koyama Station", "ID": 556, "lng": 139.69874799999999, "name_jp": "\u897f\u5c0f\u5c71\u99c5"}, {"lat": 35.615403000000001, "name_en": "Karakida Station", "ID": 557, "lng": 139.41082399999999, "name_jp": "\u5510\u6728\u7530\u99c5"}, {"lat": 35.614474999999999, "name_en": "Togoshi Station", "ID": 558, "lng": 139.71635499999999, "name_jp": "\u6238\u8d8a\u99c5"}, {"lat": 35.614030999999997, "name_en": "Minami-\u014dsawa Station", "ID": 559, "lng": 139.38066499999999, "name_jp": "\u5357\u5927\u6ca2\u99c5"}, {"lat": 35.611868999999999, "name_en": "Kaminoge Station", "ID": 560, "lng": 139.638249, "name_jp": "\u4e0a\u91ce\u6bdb\u99c5"}, {"lat": 35.610218000000003, "name_en": "Senzoku Station", "ID": 561, "lng": 139.69424699999999, "name_jp": "\u6d17\u8db3\u99c5"}, {"lat": 35.609954999999999, "name_en": "Ebara-Nakanobu Station", "ID": 562, "lng": 139.71195299999999, "name_jp": "\u834f\u539f\u4e2d\u5ef6\u99c5"}, {"lat": 35.609723000000002, "name_en": "Shinagawa Seaside Station", "ID": 563, "lng": 139.74985899999999, "name_jp": "\u54c1\u5ddd\u30b7\u30fc\u30b5\u30a4\u30c9\u99c5"}, {"lat": 35.608893000000002, "name_en": "Togoshi-k\u014den Station", "ID": 564, "lng": 139.718242, "name_jp": "\u6238\u8d8a\u516c\u5712\u99c5"}, {"lat": 35.608708, "name_en": "Shimo-Shimmei Station", "ID": 565, "lng": 139.72645, "name_jp": "\u4e0b\u795e\u660e\u99c5"}, {"lat": 35.608507000000003, "name_en": "Todoroki Station", "ID": 566, "lng": 139.64741699999999, "name_jp": "\u7b49\u3005\u529b\u99c5"}, {"lat": 35.608351999999996, "name_en": "Jiy\u016bgaoka Station", "ID": 567, "lng": 139.66703699999999, "name_jp": "\u81ea\u7531\u304c\u4e18\u99c5"}, {"lat": 35.607568999999998, "name_en": "Oyamadai Station", "ID": 568, "lng": 139.65378699999999, "name_jp": "\u5c3e\u5c71\u53f0\u99c5"}, {"lat": 35.607411999999997, "name_en": "\u014cokayama Station", "ID": 569, "lng": 139.68541099999999, "name_jp": "\u5927\u5ca1\u5c71\u99c5"}, {"lat": 35.606920000000002, "name_en": "Mukaihara Station", "ID": 570, "lng": 139.331718, "name_jp": "\u5411\u539f\u99c5"}, {"lat": 35.606254, "name_en": "Kita-Senzoku Station", "ID": 571, "lng": 139.693592, "name_jp": "\u5317\u5343\u675f\u99c5"}, {"lat": 35.606147, "name_en": "Midorigaoka Station", "ID": 572, "lng": 139.67851899999999, "name_jp": "\u7dd1\u304c\u4e18\u99c5"}, {"lat": 35.605738000000002, "name_en": "Nakanobu Station", "ID": 573, "lng": 139.71265, "name_jp": "\u4e2d\u5ef6\u99c5"}, {"lat": 35.605409999999999, "name_en": "Kuhombutsu Station", "ID": 574, "lng": 139.661193, "name_jp": "\u4e5d\u54c1\u4ecf\u99c5"}, {"lat": 35.604838999999998, "name_en": "Hatanodai Station", "ID": 575, "lng": 139.702709, "name_jp": "\u65d7\u306e\u53f0\u99c5"}, {"lat": 35.604038000000003, "name_en": "Okusawa Station", "ID": 576, "lng": 139.67276799999999, "name_jp": "\u5965\u6ca2\u99c5"}, {"lat": 35.603817999999997, "name_en": "Ebaramachi Station", "ID": 577, "lng": 139.70758799999999, "name_jp": "\u834f\u539f\u753a\u99c5"}, {"lat": 35.602316000000002, "name_en": "Nagahara Station", "ID": 578, "lng": 139.69811799999999, "name_jp": "\u9577\u539f\u99c5"}, {"lat": 35.602142999999998, "name_en": "Tamasakai Station", "ID": 579, "lng": 139.36637099999999, "name_jp": "\u591a\u6469\u5883\u99c5"}, {"lat": 35.599805000000003, "name_en": "Senzoku-Ike Station", "ID": 580, "lng": 139.691295, "name_jp": "\u6d17\u8db3\u6c60\u99c5"}, {"lat": 35.597973000000003, "name_en": "Den-en-ch\u014dfu Station", "ID": 581, "lng": 139.66731799999999, "name_jp": "\u7530\u5712\u8abf\u5e03\u99c5"}, {"lat": 35.596981, "name_en": "Ishikawadai Station", "ID": 582, "lng": 139.685216, "name_jp": "\u77f3\u5ddd\u53f0\u99c5"}, {"lat": 35.595668000000003, "name_en": "Magome Station", "ID": 583, "lng": 139.711715, "name_jp": "\u99ac\u8fbc\u99c5"}, {"lat": 35.594892000000002, "name_en": "\u014ci Keibaj\u014d-mae Station", "ID": 584, "lng": 139.74704500000001, "name_jp": "\u5927\u4e95\u7af6\u99ac\u5834\u524d\u99c5"}, {"lat": 35.592016999999998, "name_en": "Yukigaya-\u014ctsuka Station", "ID": 585, "lng": 139.680983, "name_jp": "\u96ea\u304c\u8c37\u5927\u585a\u99c5"}, {"lat": 35.586917999999997, "name_en": "Tamagawa Station", "ID": 586, "lng": 139.66939600000001, "name_jp": "\u591a\u6469\u5ddd\u99c5"}, {"lat": 35.586061000000001, "name_en": "Nishi-magome Station", "ID": 587, "lng": 139.70536999999999, "name_jp": "\u897f\u99ac\u8fbc\u99c5"}, {"lat": 35.585250000000002, "name_en": "Ontakesan Station", "ID": 588, "lng": 139.682456, "name_jp": "\u5fa1\u5dbd\u5c71\u99c5"}, {"lat": 35.582777999999998, "name_en": "Numabe Station", "ID": 589, "lng": 139.67307600000001, "name_jp": "\u6cbc\u90e8\u99c5"}, {"lat": 35.581401, "name_en": "Ry\u016bts\u016b Center Station", "ID": 590, "lng": 139.74924100000001, "name_jp": "\u6d41\u901a\u30bb\u30f3\u30bf\u30fc\u99c5"}, {"lat": 35.579608999999998, "name_en": "Kugahara Station", "ID": 591, "lng": 139.68563399999999, "name_jp": "\u4e45\u304c\u539f\u99c5"}, {"lat": 35.575476999999999, "name_en": "Unoki Station", "ID": 592, "lng": 139.68058500000001, "name_jp": "\u9d5c\u306e\u6728\u99c5"}, {"lat": 35.572899, "name_en": "Chidorich\u014d Station", "ID": 593, "lng": 139.691551, "name_jp": "\u5343\u9ce5\u753a\u99c5"}, {"lat": 35.572073000000003, "name_en": "Ikegami Station", "ID": 594, "lng": 139.702933, "name_jp": "\u6c60\u4e0a\u99c5"}, {"lat": 35.571401000000002, "name_en": "Shimo-Maruko Station", "ID": 595, "lng": 139.68560099999999, "name_jp": "\u4e0b\u4e38\u5b50\u99c5"}, {"lat": 35.570559000000003, "name_en": "Sh\u014dwajima Station", "ID": 596, "lng": 139.74998199999999, "name_jp": "\u662d\u548c\u5cf6\u99c5"}, {"lat": 35.568147000000003, "name_en": "Musashi-Nitta Station", "ID": 597, "lng": 139.69262699999999, "name_jp": "\u6b66\u8535\u65b0\u7530\u99c5"}, {"lat": 35.564396000000002, "name_en": "Hasunuma Station", "ID": 598, "lng": 139.70752400000001, "name_jp": "\u84ee\u6cbc\u99c5"}, {"lat": 35.562582999999997, "name_en": "Yaguchinowatashi Station", "ID": 599, "lng": 139.700256, "name_jp": "\u77e2\u53e3\u6e21\u99c5"}, {"lat": 35.554913999999997, "name_en": "Seibij\u014d Station", "ID": 600, "lng": 139.753355, "name_jp": "\u6574\u5099\u5834\u99c5"}, {"lat": 35.553356000000001, "name_en": "K\u014djiya Station", "ID": 601, "lng": 139.73024000000001, "name_jp": "\u7cc0\u8c37\u99c5"}, {"lat": 35.552582000000001, "name_en": "\u014ctorii Station", "ID": 602, "lng": 139.739306, "name_jp": "\u5927\u9ce5\u5c45\u99c5"}, {"lat": 35.550297, "name_en": "Anamori-inari Station", "ID": 603, "lng": 139.746746, "name_jp": "\u7a74\u5b88\u7a32\u8377\u99c5"}, {"lat": 35.548991000000001, "name_en": "Tenk\u016bbashi Station", "ID": 604, "lng": 139.75438399999999, "name_jp": "\u5929\u7a7a\u6a4b\u99c5"}, {"lat": 35.542493999999998, "name_en": "Shin-Seibij\u014d Station", "ID": 605, "lng": 139.78842700000001, "name_jp": "\u65b0\u6574\u5099\u5834\u99c5"}, {"lat": 35.539178999999997, "name_en": "K\u014dshinzuka Station", "ID": 606, "lng": 139.53738799999999, "name_jp": "\u5e9a\u7533\u585a\u99c5"}, {"lat": 35.689287999999998, "name_en": "Nishi-\u014djima Station", "ID": 607, "lng": 139.82645299999999, "name_jp": "\u897f\u5927\u5cf6\u99c5"}];

var options = {
  keys: ['name_en', 'name_jp'],   // keys to search in
}
var f = new Fuse(stlist, options);

var inputBox = document.getElementById('locateinput');

var resultSet;

inputBox.onkeyup = function(){
  if (inputBox.value) {
    fuseresult = f.search(inputBox.value);
    resultSet = fuseresult.slice(0, 5);
    document.getElementById('locateinputtext').innerHTML = "";
    document.getElementById('locateinputtext').innerHTML =
      '<button type="button" id="result1" class="btn btn-default btn-block"><b>' + fuseresult[0]['name_en'] + '</b><br />' + fuseresult[0]["name_jp"] + '</button>' +
      '<button type="button" id="result2" class="btn btn-default btn-block"><b>' + fuseresult[1]['name_en'] + '</b><br />' + fuseresult[1]["name_jp"] + '</button>' +
      '<button type="button" id="result3" class="btn btn-default btn-block"><b>' + fuseresult[2]['name_en'] + '</b><br />' + fuseresult[2]["name_jp"] + '</button>' +
      '<button type="button" id="result4" class="btn btn-default btn-block"><b>' + fuseresult[3]['name_en'] + '</b><br />' + fuseresult[3]["name_jp"] + '</button>' +
      '<button type="button" id="result5" class="btn btn-default btn-block"><b>' + fuseresult[4]['name_en'] + '</b><br />' + fuseresult[4]["name_jp"] + '</button>';
    $('#result1').on('click', function (){
    console.log('click');
     map.setView(new L.LatLng(resultSet[0]['lat'], resultSet[0]['lng']));
    });
    $('#result2').on('click', function (){
    console.log('click');
     map.setView(new L.LatLng(resultSet[1]['lat'], resultSet[1]['lng']));
    });
    $('#result3').on('click', function (){
    console.log('click');
     map.panTo(new L.LatLng(resultSet[2]['lat'], resultSet[2]['lng']));
    });
    $('#result4').on('click', function (){
    console.log('click');
     map.panTo(new L.LatLng(resultSet[3]['lat'], resultSet[3]['lng']));
    });
    $('#result5').on('click', function (){
    console.log('click'); 
     map.panTo(new L.LatLng(resultSet[4]['lat'], resultSet[4]['lng']));
    });
  }
  else {
    document.getElementById('locateinputtext').innerHTML = "";
  }
}

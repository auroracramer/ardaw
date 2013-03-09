var onGUI = function() {
    // For now, assume markers and instruments are globally available

};

var makeListMarker = function(id, instr, param) {
    var marker_list = document.getElementById('marker_list');
    var entry = document.createElement('div');
    entry.setAttribute('class','portlet');
    entry.id = id;
    var header = document.createElement('div');
    header.setAttribute("class", "portlet-header");
    var content = document.createElement('div');
    content.setAttribute("class", "portlet-content");
    header.innerHTML = id;
    if (instr && param) {
        content.innerHTML = instr.name + ', ' + param;
    } else {
        content.innerHTML = "Marker unassigned.";
        var register = document.createElement('button');
        register.setAttribute('class', 'regbutton');
        register.setAttribute('id', 'b' + id);
        register.innerHTML = 'Register Marker';
        content.appendChild(register);
    }
    entry.appendChild(header);
    entry.appendChild(content);
    marker_list.appendChild(entry);
    refreshMarkerList("marker_list", id);

            $( "#b"+ id ).click(function() {
                setupMarkerDialog(id);
                $( "#marker_dialog" ).dialog( "open" );
            });

    return entry;
}

var makeListInstrument = function(instr) {
    var marker_list = document.getElementById('instr_list');
    var entry = document.createElement('div');
    entry.setAttribute('class','portlet');
    entry.id = instr.name;
    var header = document.createElement('div');
    header.setAttribute("class", "portlet-header");
    var content = document.createElement('div');
    content.setAttribute("class", "portlet-content");
    header.innerHTML = instr.name;
    entry.appendChild(header);
    var play = document.createElement('button');
    play.innerHTML = "PLAY";
    play.setAttribute('onclick', "instruments[" + instr.num + "].play();");

    var stop = document.createElement('button');
    stop.innerHTML = "STOP";
    stop.setAttribute('onclick', "instruments[" + instr.num + "].stop();");

    content.appendChild(play);
    content.appendChild(stop);

    entry.appendChild(content);
    marker_list.appendChild(entry);
    refreshMarkerList("instr_list", instr.name);
    return entry;

};

var refreshMarkerList = function(ltype, id) {
                $( "#" + ltype + ".column" ).sortable({
                connectWith: "#" + ltype + ".column"
                });
 
                $( "#" + id ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                    .find( ".portlet-header" )
                    .addClass( "ui-widget-header ui-corner-all" )
                    .prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
                    .end()
                    .find( ".portlet-content" );
 
                $( ".portlet-header .ui-icon" ).click(function() {
                $( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
                $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
    });
 
};

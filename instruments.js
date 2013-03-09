// Instrument class
var tempo = 120;


var avail_instrs = ['sin'];
var instruments = [];

// Constructor
var Instrument = function(instr) {
    // For now, we'll just have the sin until we know that it works
    this.name = instr;
    this.type = instr;
    if ( instr === 'sin' ) {
        this.synth = T('osc', wave='sin', freq=440, mul=1, add=0);        
        var synth = this.synth;
        this.metro = T("interval", tempo, function() {
            // Dunno if we need anything in here yet.    
        });
    }
    var metro = this.metro;
    this.synth.onplay = function() {
        
        metro.on();
    }

    this.synth.onpause = function() {
        metro.off();
    }

    // Add this instrument to the list of instruments 
    instruments.push(this);
    this.num = instruments.length - 1;

    // Add self to GUI list of instruments (horrible design I know)
    makeListInstrument(this);
};

Instrument.prototype.remove = function() {
    // Make sure all markers are unregistered, this should be handled
    // by the marker handler.
    instruments.pop(this);
}

Instrument.prototype.getParameters = function() {
    // Returns an array of the available parameters that
    // can be assigned to a marker. Used for listing it
    // for the user to assign a marker to

    if ( this.type === 'sin' ) {
        return ['freq', 'phase', 'mul', 'add'];
    } else {
        return [];
    }
};

Instrument.prototype.play = function() {
    this.synth.play();
};

Instrument.prototype.stop = function() {
    this.synth.pause();
};

Instrument.prototype.updateParam = function(param, normVal) {
    // Updates a parameter using the normalized rotation value

    if ( this.type === 'sin' ) {
        if ( param === 'freq' ) {
            this.synth.freq = 4200 * normVal;
        } else if ( param === 'phase' ) {
            this.synth.phase = normVal/this.synth.freq;
        } else if ( param === 'mul' ) {
            this.synth.mul = 10*normVal;
        } else if ( param === 'add' ) {
            this.synth.add = 10*normVal;
        }
    }

};

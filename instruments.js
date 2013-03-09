// Instrument class
var tempo = 120;

// Constructor
var Instrument = function(instr) {
    // For now, we'll just have the sin until we know that it works
    if ( instr === "sin" ) {
        this.synth = T('osc', wave='sin', freq=440, mul=1, add=0);        
        this.metro = T("interval", tempo, function() {
            // Dunno if we need anything in here yet.    
        });

    }

    synth.onplay = function() {
        metro.on();
    }
};

Instrument.prototype.getParameters = function() {
    // Returns an array of the available parameters that
    // can be assigned to a marker. Used for listing it
    // for the user to assign a marker to
    if ( this.synth.wave === 'sin' ) {
        return ['freq', 'phase', 'mul', 'add'];
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

    if ( wave === 'sin' ) {
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

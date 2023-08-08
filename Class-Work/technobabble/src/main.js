"use strict";
let sentences = [];
let myButton = document.querySelector("#myButton");
let fiveButton = document.querySelector("#fiveButton");
	
const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];

const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];

const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];


myButton.onclick = generateTechnobabble;
fiveButton.onclick = generateTechnobabble;


function generateTechnobabble(e){
    let buttonName = e.target.id;

    if(buttonName == "myButton"){
            let sentence = " " +randomElement(words1) + " " + randomElement(words2)+ " "+ randomElement(words3);
            document.querySelector("#output").innerHTML = sentence;
    }
    else{
        for (let i = 0; i < 5; i++){
            let sentence = " " +randomElement(words1) + " " + randomElement(words2)+ " "+ randomElement(words3);
                sentences.push(sentence);
            }

        document.querySelector("#output").innerHTML = sentences;
        sentences = [];
    }

}

function randomElement(array){
    return array[Math.floor(Math.random()* array.length)];
}
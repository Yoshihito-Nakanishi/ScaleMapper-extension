import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import Cast from '../../util/cast';
import translations from './translations.json';
import blockIcon from './block-icon.png';

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyBpZD0i44Os44Kk44Ok44O8XzEiIGRhdGEtbmFtZT0i44Os44Kk44Ok44O8IDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQwIDQwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ExMWYyNTt9LmNscy0ye2ZvbnQtc2l6ZTo3Ljk1cHg7ZmlsbDojZmRmZGZlO2ZvbnQtZmFtaWx5OktvekdvUHI2Ti1SZWd1bGFyLTkwbXMtUktTSi1ILCBLb3p1a2EgR290aGljIFByNk47fTwvc3R5bGU+PC9kZWZzPjxyZWN0IGNsYXNzPSJjbHMtMSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIi8+PHRleHQgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjEyIDIyLjE1KSI+TWFwcGVyPC90ZXh0Pjwvc3ZnPg==';

/**
 * Icon svg to be displayed in the category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyBpZD0i44Os44Kk44Ok44O8XzEiIGRhdGEtbmFtZT0i44Os44Kk44Ok44O8IDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDQwIDQwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ExMWYyNTt9LmNscy0ye2ZvbnQtc2l6ZTo3Ljk1cHg7ZmlsbDojZmRmZGZlO2ZvbnQtZmFtaWx5OktvekdvUHI2Ti1SZWd1bGFyLTkwbXMtUktTSi1ILCBLb3p1a2EgR290aGljIFByNk47fTwvc3R5bGU+PC9kZWZzPjxyZWN0IGNsYXNzPSJjbHMtMSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIi8+PHRleHQgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2LjEyIDIyLjE1KSI+TWFwcGVyPC90ZXh0Pjwvc3ZnPg==';


/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {object} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = messageData => messageData.defaultMessage;

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
    const localeSetup = formatMessage.setup();
    if (localeSetup && localeSetup.translations[localeSetup.locale]) {
        Object.assign(
            localeSetup.translations[localeSetup.locale],
            translations[localeSetup.locale]
        );
    }
};

const EXTENSION_ID = 'scaleMapper';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://Yoshihito-Nakanishi.github.io/ScaleMapper-extension/dist/scaleMapper.mjs';


let DorianTable = [
    0, 2, 3, 5, 7, 9, 10,
    12, 14, 15, 17, 19, 21, 22,
    24, 26, 27, 29, 31, 33, 34,
    36, 38, 39, 41, 43, 45, 46,
    48, 50, 51, 53, 55, 57, 58,
    60, 62, 63, 65, 67, 69, 70,
    72, 74, 75, 77, 79, 81, 82,
    84, 86, 87, 89, 91, 93, 94,
    96, 98, 99, 101, 103, 105, 106,
    108, 110, 111, 113, 115, 117, 118,
    120, 122, 123, 125, 127
];

let IonianTable = [
    0, 2, 4, 5, 7, 9, 11,
    12, 14, 16, 17, 19, 21, 23,
    24, 26, 28, 29, 31, 33, 35,
    36, 38, 40, 41, 43, 45, 47,
    48, 50, 52, 53, 55, 57, 59,
    60, 62, 64, 65, 67, 69, 71,
    72, 74, 76, 77, 79, 81, 83,
    84, 86, 88, 89, 91, 93, 95,
    96, 98, 100, 101, 103, 105, 107,
    108, 110, 112, 113, 115, 117, 119,
    120, 122, 124, 125, 127
]

let minPentaTable = [
    0, 3, 5, 7, 10,
    12, 15, 17, 19, 22,
    24, 27, 29, 31, 34,
    36, 39, 41, 43, 46,
    48, 51, 53, 55, 58,
    60, 63, 65, 67, 70,
    72, 75, 77, 79, 82,
    84, 87, 89, 91, 94,
    96, 99, 101, 103, 106,
    108, 111, 113, 115, 118,
    120, 123, 125, 127
]

let majPentaTable = [
    0, 2, 4, 7, 9,
    12, 14, 16, 19, 21,
    24, 26, 28, 31, 33,
    36, 38, 40, 43, 45,
    48, 50, 52, 55, 57,
    60, 62, 64, 67, 69,
    72, 74, 76, 79, 81,
    84, 86, 88, 91, 93,
    96, 98, 100, 103, 105,
    108, 110, 112, 115, 117,
    120, 122, 124, 127
]

let scaleValue = 0;

var midiIn = [];
var midiOut = [];

function midiConnect() {
    navigator.requestMIDIAccess()
    .then(
      (midi) => midiReady(midi),
      (err) => console.log('Something went wrong', err));
  }
  
  function midiReady(midi) {
    // Also react to device changes.
    midi.addEventListener('statechange', (event) => initMidiDevice(event.target));
    initMidiDevice(midi); // see the next section!
  }

  function initMidiDevice(midi) {
    // Reset.
    midiIn = [];
    midiOut = [];

    var message = "[Available MIDI Ports: 使えるMIDIポート]\n";
    
    // MIDI devices that send you data.
    const inputs = midi.inputs.values();
    var count = 0;
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      midiIn.push(input.value);
      message = message + "input[" + count + "]: " + input.value.name + "\n"; 
      count++;
    }
    
    // MIDI devices that you send data to.
    const outputs = midi.outputs.values();
    count = 0;
    for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
      midiOut.push(output.value);
      message = message + "output[" + count + "]: " + output.value.name + "\n"; 
      count++;
    }

    console.log(message);
    alert(message);
    
  }

  function sendMidiMessage(ch, pitch, velocity, duration, index) {
    const NOTE_ON = 0x90;
    const NOTE_OFF = 0x80;
    
    const device = midiOut[index];
    const msgOn = [NOTE_ON, pitch, velocity];
    const msgOff = [NOTE_OFF, pitch, velocity];
    
    // note on
    device.send(msgOn); 
      
    // note off
    device.send(msgOff, Date.now() + duration); 
  }

  function sendCCMessage(ch, value, index) {
    const CC = 0xB0;
    
    const device = midiOut[index];
    const msgCC = [CC, 0, value];

    // First send the note on;
    device.send(msgCC); 
  }

/**
 * Scratch 3.0 blocks for example of Xcratch.
 */
class ExtensionBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME() {
        return formatMessage({
            id: 'scaleMapper.name',
            default: 'ScaleMapper',
            description: 'name of the extension'
        });
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID() {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL() {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * The extensionURL will be changed to the URL of the loading server.
     * @param {string} url - URL
     */
    static set extensionURL(url) {
        extensionURL = url;
    }

    /**
     * Construct a set of blocks for ScaleMapper.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor(runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        midiConnect();

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }

    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        setupTranslations();
        return {
            id: ExtensionBlocks.EXTENSION_ID,
            name: ExtensionBlocks.EXTENSION_NAME,
            extensionURL: ExtensionBlocks.extensionURL,
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            showStatusButton: false,
            blocks: [
                {
                    opcode: 'scaler',
                    text: formatMessage({
                        id: 'scaleMapper.scaler',
                        default: 'Converts sensor values [data] to a musical scale [scale]'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        data: {
                            type: ArgumentType.NOTE,
                            defaultValue: "0",
                        },
                        scale: {
                            type: ArgumentType.NUMBER,
                            menu: 'scaleMenu',
                            defaultValue: "0",
                        }
                    }
                },                
                {
                    opcode: 'oneshotGreater',
                    text: formatMessage({
                        id: 'scaleMapper.oneshotGreater',
                        default: 'the sensor value [data] is greater than [thresh] output [note]'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        data: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        thresh: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        note: {
                            type: ArgumentType.NOTE,
                            defaultValue: "60",
                        }
                    }
                }, 
                {
                    opcode: 'oneshotLesser',
                    text: formatMessage({
                        id: 'scaleMapper.oneshotLesser',
                        default: 'the sensor value [data] is lesser than [thresh] output [note]'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        data: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        thresh: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        note: {
                            type: ArgumentType.NOTE,
                            defaultValue: "60",
                        }
                    }
                }, 
                {
                    opcode: 'map',
                    text: formatMessage({
                        id: 'scaleMapper.map',
                        default: 'Convert the range of sensor value [data] from min [in_min] max [in_max] to min [out_min] to max [out_max]'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        data: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        in_min: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        in_max: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        out_min: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        out_max: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        }
                    }
                }, 
                {
                    opcode: 'constrain',
                    text: formatMessage({
                        id: 'scaleMapper.constrain',
                        default: 'data [data] low [low] high [high]'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        data: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        low: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        high: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        }
                    }
                }, 
                {
                    opcode: 'sendMIDI',
                    text: formatMessage({
                        id: 'scaleMapper.sendMIDI',
                        default: 'ch [ch] pitch [pitch] velocity [velocity] duration [duration] outDevice[outDevice]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ch: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        pitch: {
                            type: ArgumentType.NOTE,
                            defaultValue: "60",
                        },
                        velocity: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "60",
                        },
                        duration: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "100",
                        },
                        outDevice: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        }
                    }
                }, 
                {
                    opcode: 'sendCC',
                    text: formatMessage({
                        id: 'scaleMapper.sendCC',
                        default: 'ch [ch] value [value] outDevice[outDevice]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ch: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        value: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        outDevice: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        }
                    }
                }, 
            ],
            menus: {
                scaleMenu: {
                    acceptReporters: true,
                    items: this.getScaleMenu()
                },
            }
        };
    }

    /* ================================ */
    // Functions

    getScaleMenu () {
        return [
            {
                text: `Ionian`,
                value: '0'
            },
            {
                text: `Dorian`,
                value: '1'
            },
            {
                text: `majorPentatonic`,
                value: '2'
            },
            {
                text: `minorPentatonic`,
                value: '3'
            }
        ];
    }

    scaler(args) {
        
        var result = 0;
        var midiNote = 0;

        if(args.data > 0 && args.data < 128){
            midiNote = args.data; 
        } else {
            midiNote = 0;
        }

        switch (args.scale) {
            case '0':
                var value = (midiNote) / (127 / 75);
                result = IonianTable[Math.round(value)];
                break;

            case '1':
                var value = (midiNote) / (127 / 75);
                result = DorianTable[Math.round(value)];
                break;

            case '2':
                var value = (midiNote) / (127 / 54);
                result = majPentaTable[Math.round(value)];
                break;
            case '3':
                var value = (midiNote) / (127 / 54);
                result = minPentaTable[Math.round(value)];
                break;
            default: 
                break;
        }
        
        return result;
    };

    oneshotGreater(args){

        var result = 0;

        if(args.data > args.thresh){
            result = args.note; 
        } else {
            result = 0;
        }

        return result;
    };

    oneshotLesser(args){

        var result = 0;

        if(args.data < args.thresh){
            result = args.note; 
        } else {
            result = 0;
        }

        return result;
    };

    map(args){
        return (args.data - args.in_min) * (args.out_max - args.out_min) / (args.in_max - args.in_min) + args.out_min;
    };

    constrain(args){
        return (args.data)<(args.low)?(args.low):((args.data)>(args.high)?(args.high):(args.data));
    }

    sendMIDI(args){
        sendMidiMessage(args.ch, args.pitch, args.velocity, args.duration, args.outDevice);
    };

    sendCC(args){
        sendCCMessage(args.ch, args.value, args.outDevice);
    };

}

export {
    ExtensionBlocks as default,
    ExtensionBlocks as blockClass
};

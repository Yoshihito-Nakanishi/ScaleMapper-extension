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


var IonianTable = [
    0,  2,  4,  5,  7,  9,  11,
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
];

var DorianTable = [
    0,  2,  3,  5,  7,  9,  10,
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

var PhrygianTable = [
    0,  1,  3,  5,  7,  8,  10,
    12, 13, 15, 17, 19, 20, 22,
    24, 25, 27, 29, 31, 32, 34,
    36, 37, 39, 41, 43, 44, 46,
    48, 49, 51, 53, 55, 56, 58,
    60, 61, 63, 65, 67, 68, 70,
    72, 73, 75, 77, 79, 80, 82,
    84, 85, 87, 89, 91, 92, 94,
    96, 97, 99, 101, 103, 104, 106,
    108, 109, 111, 113, 115, 116, 118,
    120, 121, 123, 125, 127
];


var LydianTable = [
    0,  2,  4,  6,  7,  9,  11,
    12, 14, 16, 18, 19, 21, 23,
    24, 26, 28, 30, 31, 33, 35,
    36, 38, 40, 42, 43, 45, 47,
    48, 50, 52, 54, 55, 57, 59,
    60, 62, 64, 66, 67, 69, 71,
    72, 74, 76, 78, 79, 81, 83,
    84, 86, 88, 90, 91, 93, 95,
    96, 98, 100, 102, 103, 105, 107,
    108, 110, 112, 114, 115, 117, 119,
    120, 122, 124, 126, 127
];


var MixolydianTable = [
    0,  2,  4,  5,  7,  9,  10,
    12, 14, 16, 17, 19, 21, 22,
    24, 26, 28, 29, 31, 33, 34,
    36, 38, 40, 41, 43, 45, 46,
    48, 50, 52, 53, 55, 57, 58,
    60, 62, 64, 65, 67, 69, 70,
    72, 74, 76, 77, 79, 81, 83,
    84, 86, 88, 89, 91, 93, 95,
    96, 98, 100, 101, 103, 105, 107,
    108, 110, 112, 113, 115, 117, 119,
    120, 122, 124, 125, 127
];


var AeolianTable = [
    0,  2,  3,  5,  7,  8,  10,
    12, 14, 15, 17, 19, 20, 22,
    24, 26, 27, 29, 31, 32, 34,
    36, 38, 39, 41, 43, 44, 46,
    48, 50, 51, 53, 55, 56, 58,
    60, 62, 63, 65, 67, 68, 70,
    72, 74, 75, 77, 79, 80, 82,
    84, 86, 87, 89, 91, 92, 94,
    96, 98, 99, 101, 103, 104, 106,
    108, 110, 111, 113, 115, 116, 118,
    120, 122, 123, 125, 127
];


var LocrianTable = [
    0,  1,  3,  5,  6,  8,  10,
    12, 13, 15, 17, 18, 20, 22,
    24, 25, 27, 29, 30, 32, 34,
    36, 37, 39, 41, 42, 44, 46,
    48, 49, 51, 53, 54, 56, 58,
    60, 61, 63, 65, 66, 68, 70,
    72, 73, 75, 77, 78, 80, 82,
    84, 85, 87, 89, 90, 92, 94,
    96, 97, 99, 101, 102, 104, 106,
    108, 109, 111, 113, 115, 117, 119,
    120, 121, 123, 125, 127
];


var WholetoneTable = [
    0,  2,  4,  6,  8,  10,
    12, 14, 16, 18, 20, 22,
    24, 26, 28, 30, 32, 34,
    36, 38, 40, 42, 44, 46,
    48, 50, 52, 54, 56, 58,
    60, 62, 64, 66, 68, 70,
    72, 74, 76, 78, 80, 82,
    84, 86, 88, 90, 92, 94,
    96, 98, 100, 102, 104, 106,
    108, 110, 112, 114, 116, 118,
    120, 122, 124, 126
];


var octaveTable = [
    0,  12, 24, 36, 48,
    60, 72, 84, 96, 108,
    120
];


var Octatonic2_1Table = [
    0,  2,  3,  5,  6,  8,  9, 11,
    12, 14, 15, 17, 18, 20, 21, 23,
    24, 26, 27, 29, 30, 32, 33, 35,
    36, 38, 39, 41, 42, 44, 45, 47,
    48, 50, 51, 53, 54, 56, 57, 59,
    60, 62, 63, 65, 66, 68, 69, 71,
    72, 74, 75, 77, 78, 80, 81, 83,
    84, 86, 87, 89, 90, 92, 93, 95,
    96, 98, 99, 101, 102, 104, 105, 107,
    108, 110, 111, 113, 114, 116, 117, 119,
    120, 122, 123, 125, 127
];


var Octatonic1_2Table = [
    0,  1,  3,  4,  6,  7,  9,  10,
    12, 13, 15, 16, 18, 19, 21, 22,
    24, 25, 27, 28, 30, 31, 33, 34,
    36, 37, 39, 40, 42, 43, 45, 46,
    48, 49, 51, 52, 54, 55, 57, 58,
    60, 61, 63, 64, 66, 67, 69, 70,
    72, 73, 75, 76, 78, 79, 81, 82,
    84, 85, 87, 88, 90, 91, 93, 94,
    96, 97, 99, 100, 102, 103, 105, 106,
    108, 109, 111, 113, 115, 116, 118, 119,
    120, 121, 123, 125, 127
];


var minPentaTable = [
    0,  3,  5,  7,  10,
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
];

var majPentaTable = [
    0,  2,  4,  7,  9,
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
];


var maj3rdTable = [
    0,  4,  8,
    12, 16, 20,
    24, 28, 32,
    36, 40, 44,
    48, 52, 56,
    60, 64, 68,
    72, 76, 80,
    84, 88, 92,
    96, 100, 104,
    108, 112, 116,
    120, 124
];


var min3rdTable = [
    0,  3,  6,  9,
    12, 15, 18, 21,
    24, 27, 30, 33,
    36, 39, 42, 45,
    48, 51, 54, 57,
    60, 63, 66, 69,
    72, 75, 78, 81,
    84, 87, 90, 93,
    96, 99, 102, 105,
    108, 111, 114, 117,
    120, 123, 126
];


var RyukyuTable = [
    0,  4,  5,  7,  11,
    12, 16, 17, 19, 23,
    24, 28, 29, 31, 35,
    36, 40, 41, 43, 47,
    48, 52, 53, 55, 59,
    60, 64, 65, 67, 71,
    72, 76, 77, 79, 83,
    84, 88, 89, 91, 95,
    96, 100, 101, 103, 107,
    108, 112, 113, 115, 119,
    120, 124, 125, 127
];


var ChromaTable = [
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
    84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
    96, 97, 98, 99, 100, 101, 102,103,104,105,106,107,
    108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122, 123, 124, 125, 126, 127
];


let scaleValue = 0;

var midiIn = [];
var midiOut = [];


var prevLesser = false;
var prevGreater = false;

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
    
      if (pitch > -1  && value < 128) {
          // note on
          device.send(msgOn);

          // note off
          const noteOff = function(){
            device.send(msgOff);
            console.log("NoteOff:" + msgOff);
          };

          console.log("NoteOn:" + msgOn);
          setTimeout(noteOff, duration);

      } 

  }

  function sendCCMessage(ch, value, index) {
    const CC = 0xB0;
    
    const device = midiOut[index];
    const msgCC = [CC, 0, value];

    // First send the note on;
    if(value > -1 && value < 128){

        device.send(msgCC);
        console.log("ControlChange:" + msgCC);
    }

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
                            defaultValue: "60",
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
                            defaultValue: "60",
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
                            defaultValue: "100",
                        },
                        out_min: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        out_max: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "200",
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
                            defaultValue: "100",
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
                text: `Phrygian`,
                value: '2'
            },
            {
                text: `Lydian`,
                value: '3'
            },
            {
                text: `Mixolydian`,
                value: '4'
            },
            {
                text: `Aeolian`,
                value: '5'
            },
            {
                text: `Locrian`,
                value: '6'
            },
            {
                text: `Wholetone`,
                value: '7'
            },
            {
                text: `octave`,
                value: '8'
            },
            {
                text: `Octatonic2_1`,
                value: '9'
            },
            {
                text: `Octatonic1_2`,
                value: '10'
            },
            {
                text: `majPentatonic`,
                value: '11'
            },
            {
                text: `minPentatonic`,
                value: '12'
            },
            {
                text: `maj3rd`,
                value: '13'
            },
            {
                text: `min3rdTable`,
                value: '14'
            },
            {
                text: `Ryukyu`,
                value: '15'
            },
            {
                text: `Chromatic`,
                value: '16'
            }
        ];
    }

    scaler(args) {
        
        var rawValue =  args.data;
        var midi_output = 0;
        var data = 0;

        if(rawValue > 127){
            data = 127
        } else if (rawValue < 0){
            data = 0
        } else if (rawValue < 128 && rawValue > 0){
            data = rawValue
        }

        switch (args.scale) {
            case '0':
                var value = data / (127/75);
                if(value > 74){
                    value = 74;
                }
                midi_output = IonianTable[Math.round(value)];
                break;
                
            case '1':
                var value = data / (127/75);
                if(value > 74){
                    value = 74;
                }
                midi_output = DorianTable[Math.round(value)];
                break;

            case '2':
                var value = data / (127/75);
                if(value > 74){
                    value = 74;
                }
                midi_output = PhrygianTable[Math.round(value)];
                break;

            case '3':
                var value = data / (127/75);
                if(value > 74){
                    value = 74;
                }
                midi_output = LydianTable[Math.round(value)];
                break;

            case '4':
                var value = data / (127/75);
                if(value > 74){
                    value = 74;
                }
                midi_output = MixolydianTable[Math.round(value)];
                break;

            case '5':
                var value = data / (127/75);
                if(value > 74){
                    value = 74;
                }
                midi_output = AeolianTable[Math.round(value)];
                break;
                
            case '6':
                var value = data / (127/75);
                if(value > 74){
                    value = 74;
                }
                midi_output = LocrianTable[Math.round(value)];
                break;

            case '7':
                var value = data / (127/63);
                if(value > 63){
                    value = 62;
                }
                midi_output = WholetoneTable[Math.round(value)];
                break;

            case '8':
                var value = data / (127/10);
                if(value > 10){
                    value = 9;
                }
                midi_output = octaveTable[Math.round(value)];
                break;

            case '9':
                var value = data / (127/82);
                if(value > 82){
                    value = 81;
                }
                midi_output = Octatonic2_1Table[Math.round(value)];
                break;

            case '10':
                var value = data / (127/82);
                if(value > 82){
                    value = 81;
                }
                midi_output = Octatonic1_2Table[Math.round(value)];
                break;

            case '11':
                var value = data / (127 / 53);
                if (value > 53) {
                    value = 52;
                }
                midi_output = majPentaTable[Math.round(value)];   
                break;

            case '12':
                var value = data / (127/53);
                if(value > 53){
                    value = 52;
                }
                midi_output = minPentaTable[Math.round(value)];
                break;

            case '13':
                var value = data / (127/31);
                if(value > 31){
                    value = 30;
                }
                midi_output = maj3rdTable[Math.round(value)];
                break;

            case '14':
                var value = data / (127/42);
                if(value > 42){
                    value = 41;
                }
                midi_output = min3rdTable[Math.round(value)];
                break;

            case '15':
                var value = data / (127/53);
                if(value > 53){
                    value = 52;
                }
                midi_output = RyukyuTable[Math.round(value)];
                break;

            case '16':
                var value = data / (127/125);
                if(value > 125){
                    value = 124;
                }
                midi_output = ChromaTable[Math.round(value)];
                break;

            default:break;
        }
        
        return Math.round(midi_output);
    };

    oneshotGreater(args){

        var result = 0;

        if(args.data > args.thresh){
            result = args.note; 
            prevGreater = true;
        } else {
            result = 0;
            prevGreater = false;
        }

        return result;
    };

    oneshotLesser(args){

        var result = 0;

        if(args.data < args.thresh && !prevLesser){
            result = args.note; 
            prevLesser = true;
        } else if (args.data > args.thresh && prevLesser){
            result = 0;
            prevLesser = false;
        }

        return result;
    };

    map(args){
        var mapped = (args.data - args.in_min) * (args.out_max - args.out_min) / (args.in_max - args.in_min) + args.out_min;
        return mapped;
    };

    constrain(args){
        if(args.data < args.low) {
            return args.low;
        }
        else if(args.high < args.data) {
            return args.high;
        }
        else
            return args.data;
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

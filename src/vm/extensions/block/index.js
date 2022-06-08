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
let extensionURL = 'https://Yoshihito-Nakanishi.github.io/xcx-my-extension/dist/scaleMapper.mjs';


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
                    text: 'data [data] scale [scale]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        data: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        },
                        scale: {
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        }
                    }
                },                
                {
                    opcode: 'oneshot',
                    text: 'data [data] threshold [thresh] note [note]',
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
                            type: ArgumentType.NUMBER,
                            defaultValue: "0",
                        }
                    }
                }, 
            ],
            menus: {
            }
        };
    }

    /* ================================ */
    // Functions

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

    oneshot(args){

        var result = 0;

        if(args.data > args.thresh){
            result = args.note; 
        } else {
            result = 0;
        }

        return result;
    };

}

export {
    ExtensionBlocks as default,
    ExtensionBlocks as blockClass
};

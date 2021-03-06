/**
 * This is an extension for Xcratch.
 */

import iconURL from './mapperext.png';
import insetIconURL from './mapperextmin.png';
import translations from './translations.json';

/**
 * Formatter to translate the messages in this extension.
 * This will be replaced which is used in the React component.
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'scaleMapper.entry.name',
            default: 'ScaleMapper',
            description: 'name of the extension'
        });
    },
    extensionId: 'scaleMapper',
    extensionURL: 'https://Yoshihito-Nakanishi.github.io/ScaleMapper-extension/dist/scaleMapper.mjs',
    collaborator: 'Yoshihito-Nakanishi',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    get description () {
        return formatMessage({
            defaultMessage: 'Sensor mapping extension for Xcratch',
            description: 'Description for this extension',
            id: 'scaleMapper.entry.description'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    helpLink: 'https://Yoshihito-Nakanishi.github.io/ScaleMapper-extension/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // loadable-extension needs this line.
export default entry;

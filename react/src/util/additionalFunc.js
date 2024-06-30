import {createTw} from "react-pdf-tailwind";
import {StyleSheet} from "@react-pdf/renderer";

/**
 *
 * @param ms time in millisecond
 * @returns {Promise<unknown>}
 */
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

/**
 *
 * @param string name to be converted
 * @returns {string} hex color code
 */
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export const tw = createTw({
    theme: {
        fontFamily: {
            sans: ["Comic Sans"],
        },
        extend: {
            colors: {
                custom: "#bada55",
            },
            fontSize: {
                "heading1-bold": [
                    "36px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "heading1-semibold": [
                    "36px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "heading2-bold": [
                    "30px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "heading2-semibold": [
                    "30px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "heading3-bold": [
                    "24px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "heading4-medium": [
                    "20px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "body-bold": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "body-semibold": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "body-medium": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "body-normal": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "400",
                    },
                ],
                "body1-bold": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "base-regular": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "400",
                    },
                ],
                "base-medium": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "base-semibold": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "base1-semibold": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "small-regular": [
                    "14px",
                    {
                        lineHeight: "140%",
                        fontWeight: "400",
                    },
                ],
                "small-medium": [
                    "14px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "small-semibold": [
                    "14px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "subtle-medium": [
                    "12px",
                    {
                        lineHeight: "16px",
                        fontWeight: "500",
                    },
                ],
                "subtle-semibold": [
                    "12px",
                    {
                        lineHeight: "16px",
                        fontWeight: "600",
                    },
                ],
                "tiny-medium": [
                    "10px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "x-small-semibold": [
                    "7px",
                    {
                        lineHeight: "9.318px",
                        fontWeight: "600",
                    },
                ],
            }
        },
    },
});

export const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        lineHeight: 1.5,
        flexDirection: 'column'
    },

    spaceBetween: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: "#3E3E3E"
    },

    titleContainer: {
        flexDirection: 'row',
        marginTop: 24
    },

    logo: {width: 90},

    reportTitle: {fontSize: 16, textAlign: 'center'},

    addressTitle: {fontSize: 11, fontStyle: 'bold'},

    invoice: {fontWeight: 'bold', fontSize: 20},

    invoiceNumber: {fontSize: 11, fontWeight: 'bold'},

    address: {fontWeight: 400, fontSize: 10},

    theader: {
        marginTop: 20,
        fontSize: 10,
        fontStyle: 'bold',
        paddingTop: 4,
        paddingLeft: 7,
        flex: 1,
        height: 20,
        backgroundColor: '#DEDEDE',
        borderColor: 'whitesmoke',
        borderRightWidth: 1,
        borderBottomWidth: 1
    },

    theader2: {flex: 2, borderRightWidth: 0, borderBottomWidth: 1},

    tbody: {
        fontSize: 9,
        paddingTop: 4,
        paddingLeft: 7,
        flex: 1,
        borderColor: 'whitesmoke',
        borderRightWidth: 1,
        borderBottomWidth: 1
    },

    total: {
        fontSize: 9,
        paddingTop: 4,
        paddingLeft: 7,
        flex: 1.5,
        borderColor: 'whitesmoke',
        borderBottomWidth: 1
    },

    tbody2: {flex: 2, borderRightWidth: 1,}

});

/**
 *
 * @param weight in kg
 * @param height in m
 * @returns {number} body mass index (BMI)
 * @constructor
 */
export const BMI = (weight, height) => {
    return weight / (height * height);
}


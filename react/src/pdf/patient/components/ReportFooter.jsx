import React from 'react';
import {Image, Text, View} from "@react-pdf/renderer";
import {tw} from "../../../util/additionalFunc";

const ReportFooter = () => {
    return (
        <View style={tw("flex flex-row p-2 bg-white shadow-md mb-2 gap-1 border rounded-lg")}>
            <View style={tw("w-full p-2")}>
                <View style={tw("flex flex-row gap-1")}>
                    <Text style={tw("text-sm font-light p-1")}>
                         Manager Signature:
                    </Text>
                    <Image style={tw("w-[100px]")} src="/assets/Ahmed Sig.png"/>
                </View>
            </View>
            <View style={tw("w-full p-2")}>
                <Text style={tw("text-sm")}>Doctor Signature: AbdRaboh</Text>
            </View>
        </View>
    );
};

export default ReportFooter;
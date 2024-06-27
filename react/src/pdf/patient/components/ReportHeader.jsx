import React from 'react';
import {View, Image, Text} from "@react-pdf/renderer";
import {tw} from "../../../util/additionalFunc";


const ReportHeader = () => {
    return (
        <View style={tw("flex flex-row p-4 bg-[#323584]")}>
            <View style={tw("flex flex-1 justify-between flex-row text-white items-center ")}>
                <Image style={tw("w-[24px]")} src="/assets/logo.png"/>
                <Text style={tw("text-base-medium")}>Medica</Text>
            </View>
        </View>
    );
};

export default ReportHeader;
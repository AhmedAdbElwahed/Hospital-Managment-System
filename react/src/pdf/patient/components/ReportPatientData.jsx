import React from 'react';
import {Image, Text, View} from "@react-pdf/renderer";
import {tw} from "../../../util/additionalFunc";
import dayjs from "dayjs";

const ReportPatientData = ({patient}) => {
    return (
        <View style={tw("flex flex-row p-2 bg-white mb-2 gap-1 border rounded-lg")}>
            <View style={tw("flex flex-row gap-4 w-full")}>
                <View style={tw("w-[200px] rounded-lg border border-blue-500")}>
                    <Image src="/assets/icons/broken user.jpg"/>
                </View>
                <View style={tw("flex flex-col gap-4 w-full")}>
                    <Text style={tw("font-bold")}>
                        {patient && patient.requiredInfoDto.firstname} {patient && patient.requiredInfoDto.lastname}
                    </Text>
                    <View style={tw("flex flex-row gap-1")}>
                        <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/user icon.png"/>
                        <Text style={tw("text-sm font-light p-1")}>
                            {patient && dayjs().diff(dayjs(patient.requiredInfoDto.dob), "years")} years,
                            {patient && patient.requiredInfoDto.gender.toLowerCase()}
                        </Text>
                    </View>
                    <View style={tw("flex flex-row gap-1")}>
                        <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/home icon.png"/>
                        <Text style={tw("text-sm font-light p-1")}>
                            {patient && patient.requiredInfoDto.address}
                        </Text>
                    </View>
                </View>
                <View style={tw("flex flex-col gap-4 w-full")}>
                    <View style={tw("flex flex-row gap-1")}>
                        <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/email icon.png"/>
                        <Text style={tw("text-sm font-light p-1")}>
                            {patient && patient.requiredInfoDto.email}
                        </Text>
                    </View>
                    <View style={tw("flex flex-row gap-1")}>
                        <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/phone icon.jpg"/>
                        <Text style={tw("text-sm font-light p-1")}>
                            {patient && patient.requiredInfoDto.phone}
                        </Text>
                    </View>
                    <View style={tw("flex flex-row gap-1")}>
                        <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/flag icon.jpg"/>
                        <Text style={tw("text-sm font-light p-1")}>
                            {patient && patient.additionalInfoDto.nationality}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ReportPatientData;
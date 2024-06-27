import React from 'react';
import {Image, Text, View} from "@react-pdf/renderer";
import {tw} from "../../../util/additionalFunc";
import {familyHistoryObj, pastHistoryObj, physicalHistoryObj} from "../../../constants/patientHistoryFormCheckBoxes";

const ReportPatientHistory = ({patientHist}) => {
    return (
        patientHist ? (
            <View style={tw("flex flex-col gap-4 p-2 border rounded-lg h-full")}>
                <View style={tw("flex flex-col gap-4")}>
                    <View style={tw("flex flex-row gap-2")}>
                        <View style={tw("w-full")}>
                            <View style={tw("flex flex-row")}>
                                <View style={tw("flex flex-row gap-1")}>
                                    <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/group icon.jpg"/>
                                    <Text style={tw("text-sm font-light p-1")}>
                                        Family History:
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("")}>
                                {
                                    familyHistoryObj.map((value, index) => (
                                        <View style={tw("flex flex-row")}>
                                            <Text
                                                style={tw("text-sm font-light p-1 w-full")}>{index + 1}-{value.label}</Text>
                                            <Image style={tw("w-[18px] h-[18px]")} src={`/assets/icons/${
                                                patientHist && patientHist[`${value.value}`] ? "checked" : "unchecked"
                                            } checkbox.jpg`}/>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={tw("w-full")}>
                            <View style={tw("flex flex-row")}>
                                <View style={tw("flex flex-row gap-1")}>
                                    <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/past icon.jpg"/>
                                    <Text style={tw("text-sm font-light p-1")}>
                                        Past History:
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("")}>
                                {
                                    pastHistoryObj.map((value, index) => (
                                        <View style={tw("flex flex-row")}>
                                            <Text
                                                style={tw("text-sm font-light p-1 w-full")}>{index + 1}-{value.label}</Text>
                                            <Image style={tw("w-[18px] h-[18px]")} src={`/assets/icons/${
                                                patientHist && patientHist[`${value.value}`] ? "checked" : "unchecked"
                                            } checkbox.jpg`}/>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={tw("")}>
                            <View style={tw("flex flex-row gap-1")}>
                                <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/man icon.jpg"/>
                                <Text style={tw("text-sm font-light p-1")}>
                                    Physiological History:
                                </Text>
                            </View>
                        </View>
                        <View style={tw("")}>
                            {
                                physicalHistoryObj.map((value, index) => (
                                    <View style={tw("flex flex-row")}>
                                        <Text
                                            style={tw("text-sm font-light p-1 w-1/2")}>{index + 1}-{value.label}</Text>
                                        <Image style={tw("w-[18px] h-[18px]")} src={`/assets/icons/${
                                            patientHist && patientHist[`${value.value}`] ? "checked" : "unchecked"
                                        } checkbox.jpg`}/>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                    {/*<View>*/}
                    {/*    <View style={tw("flex flex-row")}>*/}
                    {/*        <View style={tw("flex flex-row gap-1")}>*/}
                    {/*            <Image style={tw("w-[18px] h-[18px]")} src="/assets/icons/additional icon.jpeg"/>*/}
                    {/*            <Text style={tw("text-sm font-light p-1")}>*/}
                    {/*                Additional History:*/}
                    {/*            </Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </View>

            </View>
        ) : (
            <View style={tw("h-full")}>
                <Text>No Patient History</Text>
            </View>
        )
    );
};

export default ReportPatientHistory;
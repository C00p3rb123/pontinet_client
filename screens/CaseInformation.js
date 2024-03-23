import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colours } from "../utils/colours";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import PaitentInformationCard from "../components/PaitentInformationCard";

const CaseInformation = () => {

  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.header}>
          <Text>HEADER</Text>
        </View>
        <View style={styles.caseInformation}>
            <View style={styles.paitnentInformation}>
                <PaitentInformationCard />
            </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaseInformation;

const styles = StyleSheet.create({
  container: {},
  header: {
    flex: 1,
  },
  caseInformation: {
    flex: 4,
    backgroundColor: Colours.pontinetCaseBackground,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  paitnentInformation: {
    backgroundColor: "white",
    marginTop: 20,
    width: "95%",
    borderRadius: 10,
    flexDirection: "row",
  }
});

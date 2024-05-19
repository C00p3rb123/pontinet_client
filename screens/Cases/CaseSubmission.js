import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Colours } from "../../utils/colours";
import PageTitle from "../../components/PageTitle";
import { useLanguage } from "../../LanguageContext";

import { useNavigation } from "@react-navigation/native";
//Component to display the case submission confirmation screen.
// Provides options to return to the dashboard or view more cases.
const CaseSubmission = ({ route }) => {
  const screenHeight = Dimensions.get("window").height;
  const subtitle = route.params;
  const { translation } = useLanguage();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.header}>
          <PageTitle
            title={translation.screens.authScreens.caseSubmission.title}
            showBackButton={false}
          />
          <Text style={{ paddingLeft: 15, fontWeight: "300", fontSize: 18 }}>
            {translation.screens.authScreens.caseReply.case} - {subtitle}
          </Text>
        </View>

        <View
          style={{
            ...styles.caseSubmission,
            height: screenHeight - 250,
            paddingHorizontal: 30,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}
            >
              {translation.screens.authScreens.caseSubmission.thankyou}
            </Text>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 10 }}>
              {translation.screens.authScreens.caseSubmission.appreciate}
            </Text>
          </View>
          <Text
            style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}
          >
            {translation.screens.authScreens.caseSubmission.next}
          </Text>
          <View style={{ display: "flex", gap: 10 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Image
                  style={{
                    marginStart: 12,
                    marginHorizontal: 15,
                    height: 45,
                    width: 45,
                  }}
                  source={require("../../assets/home.png")}
                />
                <Text style={styles.buttonText}>
                  {translation.screens.authScreens.caseSubmission.return}
                </Text>
                <Image
                  style={{
                    marginStart: 5,
                    marginEnd: 5,
                    height: 20,
                    width: 20,
                  }}
                  source={require("../../assets/rightarrow.png")}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.button }}
              onPress={() => navigation.navigate("CaseSelection")}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Image
                  style={{
                    marginStart: 20,
                    marginHorizontal: 15,
                    height: 45,
                    width: 45,
                  }}
                  source={require("../../assets/newcase2.png")}
                />
                <Text style={styles.buttonText}>
                  {translation.screens.authScreens.caseSubmission.moreCases}
                </Text>
                <Image
                  style={{
                    marginStart: 30,
                    marginEnd: 5,
                    height: 20,
                    width: 20,
                  }}
                  source={require("../../assets/rightarrow.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaseSubmission;

const styles = StyleSheet.create({
  container: {},
  header: {
    gap: 15,
    justifyContent: "center",
  },
  caseReply: {
    backgroundColor: Colours.pontinetCaseBackground,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  caseSubmission: {
    backgroundColor: Colours.pontinetCaseBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  paitnentInformation: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
  },
  additionalButtons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: Colours.pontinetPrimary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 45,

    marginRight: 5,
    color: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});

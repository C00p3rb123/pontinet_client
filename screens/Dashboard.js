import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useLanguage } from "../LanguageContext";
import React from "react";
import { Colours } from "../utils/colours";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";

//Component to display the dashboard screen.
//Provides navigation to case selection and case history screens.
const Dashboard = () => {
  const screenHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const { translation } = useLanguage();
  const { user } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { height: screenHeight }]}>
      <View style={styles.header}>
        <View style={styles.header2}>
          <Image source={require("../assets/dashboard_header_icon.png")} />
          <Text style={styles.header2Text}>{user.clinic}</Text>
        </View>
        <View style={styles.header2}>
          <Image source={require("../assets/dashboard_header_icon2.png")} />
          <Text style={styles.header2Text}>{user.country}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.caseButtonContainer}
          onPress={() => navigation.navigate("CaseSelection")}
        >
          <View style={styles.caseButton}>
            <Image source={require("../assets/new_case_symbol.png")} />
            <View style={{ paddingLeft: 10, alignSelf: "center" }}>
              <Text style={styles.caseButtonHeader}>
                {translation.screens.authScreens.dashboard.newCaseButtonHeader}
              </Text>
              <Text style={styles.caseButtonText}>
                {translation.screens.authScreens.dashboard.newCaseButtonText}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.caseButtonContainer}
          onPress={() => navigation.navigate("CaseHistory")}
        >
          <View style={styles.caseButton}>
            <Image source={require("../assets/case_history_symbol.png")} />
            <View style={{ paddingLeft: 10, alignSelf: "center" }}>
              <Text style={styles.caseButtonHeader}>
                {
                  translation.screens.authScreens.dashboard
                    .caseHistoryButtonHeader
                }
              </Text>
              <Text style={styles.caseButtonText}>
                {
                  translation.screens.authScreens.dashboard
                    .caseHistoryButtonText
                }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.pontinetDashboardBackground,
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colours.pontinetAccent2,
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 10,
    paddingLeft: 20,
  },
  header2: {
    flexDirection: "row",
    paddingRight: 20,
    alignItems: "center",
  },
  header2Text: {
    fontSize: 16,
    paddingLeft: 5,
  },
  caseButtonContainer: {
    paddingTop: 10,
    paddingBottom: 15,
  },
  caseButton: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowColor: "#171717",
    borderRadius: 11,
    alignSelf: "center",
    justifyContent: "flex-start",
    paddingLeft: 35,
    paddingTop: 30,
    paddingBottom: 25,
    borderRadius: 10,
  },
  caseButtonHeader: {
    fontSize: 20,
    fontWeight: "500",
    color: Colours.pontinetButtonHeader,
    paddingBottom: 5,
  },
  caseButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colours.pontinetButtonText,
  },
});

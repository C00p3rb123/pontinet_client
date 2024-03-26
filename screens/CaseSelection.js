import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import CaseCard from "../components/CaseCard";
import { useFetchCases } from "../hooks/useFetchCases";
import Loader from "../components/Loader";
import AccountHeader from "../components/AccountHeader";
import PageTitle from "../components/PageTitle";

const CaseSelecton = () => {
  const screenHeight = Dimensions.get("window").height;
  const url = `${process.env.EXPO_PUBLIC_CASES_URL}/retrieve`;
  const title = `View New Cases`
  const { isLoading, data } = useFetchCases(url);

  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.top}>
          <AccountHeader />
          <PageTitle title={title} />
        </View>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.caseList}>
            <Text style={styles.title}>Cases</Text>
            <FlatList
              data={data}
              contentContainerStyle={{ gap: 10 }}
              renderItem={(caseDetails) => (
                <CaseCard caseDetails={caseDetails.item} />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CaseSelecton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  caseList: {
    width: "90%",
    flex: 3,
  },
  top: {
    flex: 1,
    gap: 15
  },
  title: {
    textAlign: "center",
    paddingBottom: 10,
    fontWeight: "bold",
  },
});

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";
import CaseCard from "../components/CaseCard";
import { useFetchCases } from "../hooks/useFetchCases";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

const CaseSelecton = () => {
  const screenHeight = Dimensions.get("window").height;
  const url = `${process.env.EXPO_PUBLIC_CASES_URL}/retrieve`;
  const title = `View New Cases`;
  const { isLoading, data, refresh, onRefresh} = useFetchCases(url);
  const noCases = data.length === 0;

  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <View style={styles.top}>
          <PageTitle title={title} />
        </View>
        {isLoading ? (
          <View style={styles.caseList}>
            <Loader />
          </View>
        ) : (
          <View style={styles.caseList}>
            <Text style={styles.title}>Cases</Text>
            <FlatList
              data={data}
              contentContainerStyle={{ gap: 10 }}
              ListEmptyComponent={<Text style={styles.noCases}>No cases to display</Text>}
              renderItem={(caseDetails) => (
                <CaseCard caseDetails={caseDetails.item} />
              )               
            }
            refreshControl ={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
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
    width: "100%",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    paddingBottom: 10,
    fontWeight: "bold",
  },
  noCases: {
    alignSelf: 'center',
    paddingTop: 15
  }
});

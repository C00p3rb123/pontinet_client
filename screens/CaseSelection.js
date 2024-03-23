import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from "react-native";
import React from "react";
import { cases } from "../mocks/cases";
import CaseCard from "../components/CaseCard";

const CaseSelecton = () => {
  const screenHeight = Dimensions.get("window").height;
  
  return (
    <SafeAreaView>
      <View style={[styles.container, { height: screenHeight }]}>
        <Text style={styles.top }>X</Text>
        <View style={styles.caseList}>
          <Text style={styles.title}>Cases</Text>
          <FlatList data={cases} contentContainerStyle={{ gap: 10 }} renderItem={(caseDetails) => <CaseCard caseDetails={caseDetails.item}/>}/>
        </View>
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
    flex:2
  },
  top: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold'
  }
});

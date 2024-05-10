import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    FlatList,
    RefreshControl,
  } from "react-native";
  import React, {useCallback}  from "react";
  import CaseHistoryCard from "../../components/Cards/CaseHistoryCard";
  import { useFetchCases } from "../../hooks/useFetchCases";
  import Loader from "../../components/Loader";
  import PageTitle from "../../components/PageTitle";
  import { useLanguage } from "../../LanguageContext";
  import { useFocusEffect } from '@react-navigation/native';
  
  const CaseHistory = () => {
    const screenHeight = Dimensions.get("window").height;
    const url = `${process.env.EXPO_PUBLIC_CASES_URL}/retrieve/user`;
    const { isLoading, data, refresh, onRefresh, getCases} = useFetchCases(url);
    const {translation } = useLanguage();

    useFocusEffect(useCallback(() => {
      getCases();
    }, []))
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.container, { height: screenHeight }]}>
          <View style={styles.top}>
            <PageTitle title={translation.screens.authScreens.caseHistory.title}/>
          </View>
          {isLoading ? (
            <View style={styles.caseList}>
              <Loader />
            </View>
          ) : (
            <View style={styles.caseList}>
              <Text style={styles.title}>{translation.screens.authScreens.caseSelection.cases}</Text>
              <FlatList
                data={data}
                contentContainerStyle={{ gap: 10 }}
                ListEmptyComponent={<Text style={styles.noCases}>{translation.screens.authScreens.caseSelection.noCases}</Text>}
                renderItem={(caseDetails) => (
                  <CaseHistoryCard caseDetails={caseDetails.item} />
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
  
  export default CaseHistory;
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      paddingBottom: 10
    },
    caseList: {
      width: "93%",
      flex: 3,
    },
    top: {
      flex: 0.5,
      width: "100%",
      justifyContent: "space-around",
    },
    title: {
      textAlign: "center",
      paddingBottom: 10,
      fontWeight: '500',
      fontSize: 20
    },
    noCases: {
      alignSelf: 'center',
      paddingTop: 15
    }
  });
  
// MainScreenWithDrawer.tsx
import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  DrawerLayoutAndroid,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomCalendarMain from "./CustomCalendar";
import styles from "./MainScreen.styles";

// 더미 일정 데이터
const dummySchedules = [
  { id: "1", date: "2025-05-31", time: "14:00", title: "스터디 모임" },
  { id: "2", date: "2025-05-31", time: "17:00", title: "팀 회의" },
  { id: "3", date: "2025-06-01", time: "09:00", title: "출근" },
];

export default function MainScreenWithDrawer() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  const todayHandlerRef = useRef<() => void>(() => {});
  const searchHandlerRef = useRef<(dateStr: string) => void>(() => {});

  const filteredSchedules = dummySchedules.filter(
    (item) => item.date === selectedDate
  );

  const searchResults = dummySchedules.filter((item) =>
    item.title.includes(searchText)
  );

  const openDrawer = () => drawerRef.current?.openDrawer();
  const goToToday = () => {
    if (todayHandlerRef.current) todayHandlerRef.current();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={240}
        drawerPosition="left"
        renderNavigationView={() => (
          <View style={styles.drawerContainer}>
            <Text style={styles.drawerTitle}>PlanGenie 메뉴</Text>
            {/* 향후 메뉴 추가 */}
          </View>
        )}
      >
        <View style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={openDrawer}>
              <Feather name="menu" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={goToToday}>
                <Feather name="calendar" size={22} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSearchMode(!searchMode)}>
                <Feather
                  name="search"
                  size={22}
                  color="#333"
                  style={{ marginLeft: 12 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 검색창 */}
          {searchMode && (
            <TextInput
              style={styles.searchBox}
              placeholder="일정 검색..."
              value={searchText}
              onChangeText={setSearchText}
            />
          )}

          {/* 검색 결과 */}
          {searchMode && searchText.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (searchHandlerRef.current) {
                      searchHandlerRef.current(item.date); // 날짜 이동
                    }
                    setSearchMode(false); // 검색 모드 종료
                    setSearchText(""); // 검색어 초기화
                  }}
                >
                  <Text style={styles.searchResult}>
                    {item.date} - {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* 캘린더 */}
          <CustomCalendarMain
            onRefTodayHandler={(fn) => (todayHandlerRef.current = fn)}
            onRefSearchHandler={(fn) => (searchHandlerRef.current = fn)}
          />

          {/* 오늘의 일정 */}
          <Text style={styles.sectionTitle}>📌 오늘의 일정</Text>
          <FlatList
            data={filteredSchedules}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.scheduleItem}>
                <Text style={styles.scheduleTime}>{item.time}</Text>
                <Text style={styles.scheduleTitle}>{item.title}</Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

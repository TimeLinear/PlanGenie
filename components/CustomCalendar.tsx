// CustomCalendarMain.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import dayjs from "dayjs";

interface CustomCalendarProps {
  onRefTodayHandler?: (fn: () => void) => void;
  onRefSearchHandler?: (fn: (date: string) => void) => void;
}

// 주 단위 요일
const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 달력 셀 구성
function generateMonthDates(baseDate: dayjs.Dayjs) {
  const startOfMonth = baseDate.startOf("month");
  const endOfMonth = baseDate.endOf("month");

  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const prevMonth = baseDate.subtract(1, "month");
  const prevMonthEndDate = prevMonth.endOf("month").date();

  const dates = [];

  // 지난 달 날짜 채우기
  for (let i = startDay - 1; i >= 0; i--) {
    dates.push({
      date: prevMonth.set("date", prevMonthEndDate - i),
      currentMonth: false,
    });
  }

  // 이번 달 날짜 채우기
  for (let i = 1; i <= totalDays; i++) {
    dates.push({
      date: baseDate.set("date", i),
      currentMonth: true,
    });
  }

  // 다음 달 날짜 채우기 (6주 뷰 유지)
  while (dates.length % 7 !== 0) {
    const nextDate = endOfMonth.add(
      dates.length - (startDay + totalDays),
      "day"
    );
    dates.push({
      date: nextDate,
      currentMonth: false,
    });
  }

  return dates;
}

export default function CustomCalendarMain({
  onRefTodayHandler,
  onRefSearchHandler,
}: CustomCalendarProps) {
  const [baseDate, setBaseDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const dates = generateMonthDates(baseDate);

  const goPrevMonth = () => setBaseDate(baseDate.subtract(1, "month"));
  const goNextMonth = () => setBaseDate(baseDate.add(1, "month"));

  const goToToday = () => {
    const today = dayjs();
    setBaseDate(today);
    setSelectedDate(today);
  };

  const goToDateFromSearch = (dateStr: string) => {
    const date = dayjs(dateStr);
    setBaseDate(date);
    setSelectedDate(date);
  };

  useEffect(() => {
    if (onRefTodayHandler) onRefTodayHandler(goToToday);
    if (onRefSearchHandler) onRefSearchHandler(goToDateFromSearch);
  }, [onRefTodayHandler, onRefSearchHandler]);

  const renderItem = ({ item }: any) => {
    const isSelected = item.date.isSame(selectedDate, "day");
    const isToday = item.date.isSame(dayjs(), "day");

    return (
      <TouchableOpacity
        style={[
          styles.cell,
          !item.currentMonth && styles.dimmedCell,
          isSelected && styles.selectedBorder,
        ]}
        onPress={() => setSelectedDate(item.date)}
      >
        <Text style={[styles.cellText, isToday && styles.todayText]}>
          {item.date.date()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton} onPress={goPrevMonth}>
          <Text style={styles.navText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{baseDate.format("YYYY년 MM월")}</Text>
        <TouchableOpacity style={styles.navButton} onPress={goNextMonth}>
          <Text style={styles.navText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* 요일 */}
      <View style={styles.weekRow}>
        {WEEK_DAYS.map((day, idx) => (
          <Text key={idx} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* 날짜 */}
      <FlatList
        data={dates}
        keyExtractor={(item) => item.date.format("YYYY-MM-DD")}
        numColumns={7}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navText: {
    fontSize: 20,
    color: "#555",
  },
  monthText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekDayText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontWeight: "500",
    color: "#888",
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
  },
  cellText: {
    fontSize: 16,
    color: "#333",
  },
  dimmedCell: {
    opacity: 0.4,
  },
  todayText: {
    color: "#FF7043",
    fontWeight: "bold",
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: "gray",
  },
});

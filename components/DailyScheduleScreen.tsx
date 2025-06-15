import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// 초기 일정 데이터
const initialScheduleData = [
  { time: '00:00', activity: '' },
  { time: '01:00', activity: '' },
  { time: '02:00', activity: '' },
  { time: '03:00', activity: '' },
  { time: '04:00', activity: '새벽 운동 - 헬스장' },
  { time: '05:00', activity: '' },
  { time: '06:00', activity: '' },
  { time: '07:00', activity: '아침 산책 - 한강공원' },
  { time: '08:00', activity: '' },
  { time: '09:00', activity: '출근' },
  { time: '10:00', activity: '' },
  { time: '11:00', activity: '' },
  { time: '12:00', activity: '점심 약속 - 회사 근처' },
  { time: '12:30', activity: '점심 약속 - 회사 근처' },
  { time: '13:00', activity: '' },
  { time: '14:00', activity: '회의' },
  { time: '14:30', activity: '점심 약속 - 레스토랑' },
  { time: '15:00', activity: '' },
  { time: '16:00', activity: '' },
  { time: '17:00', activity: '' },
  { time: '18:00', activity: '' },
  { time: '19:00', activity: '' },
  { time: '20:00', activity: '' },
  { time: '21:00', activity: '' },
  { time: '22:00', activity: '' },
  { time: '23:00', activity: '하루 마무리' },
];

const ScheduleScreen = () => {
  const [scheduleData, setScheduleData] = useState(initialScheduleData);
  const [newActivity, setNewActivity] = useState('');
  const [newTime, setNewTime] = useState('00');
  const [newMinutes, setNewMinutes] = useState('00');
  const [showModal, setShowModal] = useState(false);

  // 일정 추가 함수
  const addSchedule = () => {
    if (newTime && newActivity) {
      const newSchedule = { time: `${newTime}:${newMinutes}`, activity: newActivity };

      // 새로운 일정 데이터를 기존 일정에 추가하고 시간순으로 정렬
      const updatedScheduleData = [...scheduleData, newSchedule].sort((a, b) =>
        a.time.localeCompare(b.time)
      );

      setScheduleData(updatedScheduleData); // 상태 업데이트
      setNewTime('00'); // 시간 입력 초기화
      setNewMinutes('00'); // 분 입력 초기화
      setNewActivity(''); // 활동 입력 초기화
      setShowModal(false); // 모달 닫기
    }
  };

  return (
    <View style={styles.container}>
      {/* 날짜 표시 */}
      <Text style={styles.dateText}>2025년 6월 13일 일정</Text>

      {/* 일정 항목 리스트 */}
      <FlatList
        data={scheduleData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.time}>{item.time}</Text>
            {item.activity ? (
              <View style={styles.activityContainer}>
                <Text style={styles.activity}>{item.activity}</Text>
              </View>
            ) : (
              <View style={styles.line}></View> // 일정이 없으면 점선 구분선 표시
            )}
          </View>
        )}
      />

      {/* 일정 추가 버튼 */}
      <Button title="일정 추가" onPress={() => setShowModal(true)} />

      {/* 일정 추가 모달 */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>시간 선택</Text>

            {/* 시간 선택기 */}
            <Picker
              selectedValue={newTime}
              style={styles.picker}
              onValueChange={(itemValue: string) => setNewTime(itemValue)} // 타입 명시
            >
              {[...Array(24).keys()].map((hour) => (
                <Picker.Item key={hour} label={`${String(hour).padStart(2, '0')}`} value={String(hour).padStart(2, '0')} />
              ))}
            </Picker>

            <Text>분 선택</Text>

            {/* 분 선택기 */}
            <Picker
              selectedValue={newMinutes}
              style={styles.picker}
              onValueChange={(itemValue: string) => setNewMinutes(itemValue)} // 타입 명시
            >
              {[...Array(60).keys()].map((minute) => (
                <Picker.Item key={minute} label={`${String(minute).padStart(2, '0')}`} value={String(minute).padStart(2, '0')} />
              ))}
            </Picker>

            {/* 일정 내용 입력 */}
            <TextInput
              style={styles.input}
              placeholder="일정 내용"
              value={newActivity}
              onChangeText={setNewActivity}
            />

            {/* 일정 추가 버튼 */}
            <Button title="추가" onPress={addSchedule} />
            <Button title="닫기" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    minHeight: 60,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width: 70,
  },
  activityContainer: {
    backgroundColor: '#d4f1e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 10,
    width: '75%',
  },
  activity: {
    fontSize: 18,
    color: '#333',
  },
  line: {
    width: '100%',
    height: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderStyle: 'dashed',
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  picker: {
    width: 100,
    height: 50,
  },
});

export default ScheduleScreen;

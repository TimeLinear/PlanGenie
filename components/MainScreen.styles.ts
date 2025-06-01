import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FAFAFA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  searchResult: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 15,
  },
  calendar: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: 350,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
    color: "#444",
  },
  scheduleItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 2,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleTime: {
    fontSize: 14,
    color: "#555",
    width: 60,
  },
  scheduleTitle: {
    fontSize: 16,
    color: "#333",
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    padding: 14,
    position: "absolute",
    bottom: 50,
    right: 20,
    elevation: 3,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
});

export default styles;

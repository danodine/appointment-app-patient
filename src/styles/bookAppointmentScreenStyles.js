const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    backgroundColor: "#70C1E3",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  doctorCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 110,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  doctorSubtitle: {
    color: "#6B7280",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  timeSlotSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  timeSlotText: {
    color: "#000",
  },
  timeSlotTextSelected: {
    color: "#fff",
  },
  confirmButton: {
    alignSelf: "center",
    backgroundColor: "#70C1E3",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  confirmButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  errorText: {
    marginTop: 20,
    color: "red",
    textAlign: "center",
  },
});

export default styles;

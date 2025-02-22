import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { EmploymentType, Position as PositionType, WorkMode } from "@prisma/client";

interface PositionProps {
  position: PositionType;
}

const employmentTypeMap = {
  [EmploymentType.PERMANENT_FULL_TIME]: "Permanent Full-time",
  [EmploymentType.PERMANENT_PART_TIME]: "Permanent Part-time",
  [EmploymentType.CONTRACT_FULL_TIME]: "Contract Full-time",
  [EmploymentType.CONTRACT_PART_TIME]: "Contract Part-time",
  [EmploymentType.FREELANCE]: "Freelance",
  [EmploymentType.INTERNSHIP]: "Internship",
  [EmploymentType.CO_OP]: "Co-op",
  [EmploymentType.SEASONAL]: "Seasonal",
  [EmploymentType.APPRENTICESHIP]: "Apprenticeship",
  [EmploymentType.SELF_EMPLOYED]: "Self Employed",
  [EmploymentType.CASUAL]: "Casual",
  [EmploymentType.ON_CALL]: "On Call",
}

const workModeMap = {
  [WorkMode.ON_SITE]: "On Site",
  [WorkMode.REMOTE]: "Remote",
  [WorkMode.HYBRID]: "Hybrid",
}

export default function Position({ position }: PositionProps) {
  const {
    title,
    employmentType,
    workMode,
    startDate,
    endDate,
    isCurrent,
    bullets
  } = position;

  const employmentTypeString = employmentTypeMap[employmentType];
  const workModeString = workModeMap[workMode];

  const startDateString = new Date(startDate).toLocaleDateString("en-CA", { month: "long", year: "numeric" });
  const endDateString = isCurrent
    ? "Present"
    : new Date(endDate!).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  return (
    <View
      key={position.id}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.positionTitle}>
          <Text>{title}</Text>
          <Text>•</Text>
          <Text>{employmentTypeString}</Text>
          <Text>•</Text>
          <Text>{workModeString}</Text>
        </View>
        <Text>{startDateString} - {endDateString}</Text>
      </View>
      <View style={styles.bulletsContainer}>
        {bullets.map((bullet, index) => (
          <Text key={index}>
            • {bullet}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  positionTitle: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  bulletsContainer: {
    display: "flex",
    flexDirection: "column"
  },
});

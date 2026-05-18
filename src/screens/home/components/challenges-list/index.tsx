import { StyleSheet, View } from "react-native";

import { ChallengeCard } from "@/screens/home/components/challenges-list/components/challenge-card";

import { AppText } from "@/shared/components/app-text";
import { challengeTheme } from "@/shared/utils/challenge";

import { colors } from "@/constants/colors";

interface ChallengesListProps {
  handleSelectChallenge: (themeId: string) => void;
}

export function ChallengesList({ handleSelectChallenge }: ChallengesListProps) {
  return (
    <View>
      <AppText style={styles.sectionTitle}>Desafios disponíveis</AppText>

      {challengeTheme.map((challenge) => (
        <ChallengeCard
          key={`challenge-${challenge.id}`}
          handleSelectChallenge={handleSelectChallenge}
          {...challenge}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    marginBottom: 16,
  },
});

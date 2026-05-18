import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { scorePlayer, themeAtom } from '../../../../AppState/Atoms';
import { useScreenDimensions } from '../../../../Hooks/useScreenDimensions';
import { useAtom } from 'jotai';
import { StackActions, useNavigation } from '@react-navigation/native';

export default function ListPlayer() {
  const [randomPlayers] = useAtom(scorePlayer);
  const { width } = useScreenDimensions();
  const [theme] = useAtom(themeAtom);
  const nav = useNavigation();
  const styles = makeStyles(theme);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Players</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{randomPlayers.length}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.headerDivider} />

      {/* List */}
      <ScrollView
        contentContainerStyle={[
          styles.container,
          width < 400 && styles.containerSmall,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {randomPlayers.map((item, index) => (
          <View
            style={[
              styles.playerRow,
              width < 400 && styles.playerRowSmall,
              width >= 400 && width < 600 && styles.playerRowMedium,
            ]}
            key={index}
          >
            {/* Index Circle */}
            <View
              style={[
                styles.indexCircle,
                width < 400 && styles.indexCircleSmall,
              ]}
            >
              <Text
                style={[styles.indexText, width < 400 && styles.indexTextSmall]}
              >
                {index + 1}
              </Text>
            </View>

            {/* Player Name */}
            <Text
              style={[
                styles.playerName,
                width < 400 && styles.playerNameSmall,
                width >= 400 && width < 600 && styles.playerNameMedium,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item}
            </Text>

            {/* Rank tag */}
            {index === 0 && (
              <View style={styles.rankBadge}>
                <Text style={styles.rankBadgeText}>👑</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Divider */}
      <View style={styles.headerDivider} />

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.okayButton}
          onPress={() => {
            nav.dispatch(StackActions.popToTop());
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.okayButtonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = theme =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
      width: '80%',
      height: '80%',
      margin: 'auto',
      borderRadius: 16,
      backgroundColor: theme.colors.transparentBackground,
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      overflow: 'hidden',
      ...(Platform.OS === 'web' && {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }),
      ...(Platform.OS !== 'web' && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
      }),
    },

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 14,
      gap: 10,
    },
    headerTitle: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: '700',
      fontFamily: theme.fonts.heading,
      letterSpacing: 0.5,
    },
    headerBadge: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 2,
      minWidth: 24,
      alignItems: 'center',
    },
    headerBadgeText: {
      color: theme.colors.background,
      fontSize: 12,
      fontWeight: '700',
      fontFamily: theme.fonts.heading,
    },
    headerDivider: {
      width: '100%',
      height: 1,
      backgroundColor: theme.colors.inputBorder,
    },

    // Scroll container
    container: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      width: '100%',
    },
    containerSmall: {
      paddingVertical: 8,
      paddingHorizontal: 10,
    },

    // Player Row
    playerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginVertical: 5,
      borderRadius: 12,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      ...(Platform.OS !== 'web' && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      }),
      ...(Platform.OS === 'web' && {
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }),
      elevation: 2,
    },
    playerRowSmall: {
      paddingHorizontal: 10,
      paddingVertical: 9,
      marginVertical: 4,
    },
    playerRowMedium: {
      paddingHorizontal: 14,
      paddingVertical: 11,
    },

    // Index Circle
    indexCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
      borderWidth: 2,
      borderColor: theme.colors.inputBorder,
    },
    indexCircleSmall: {
      width: 28,
      height: 28,
      borderRadius: 14,
      marginRight: 10,
      borderWidth: 1.5,
    },
    indexText: {
      color: theme.colors.background,
      fontWeight: '700',
      fontSize: 16,
      fontFamily: theme.fonts.heading,
    },
    indexTextSmall: {
      fontSize: 13,
    },

    // Player Name
    playerName: {
      fontSize: 16,
      color: theme.colors.textPrimary,
      fontWeight: '600',
      flex: 1,
      fontFamily: theme.fonts.body,
    },
    playerNameSmall: {
      fontSize: 13,
    },
    playerNameMedium: {
      fontSize: 15,
    },

    // Rank badge
    rankBadge: {
      marginLeft: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    rankBadgeText: {
      fontSize: 14,
    },

    // Footer
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 14,
      alignItems: 'center',
    },
    okayButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 48,
      borderRadius: 12,
      alignItems: 'center',
      width: '100%',
      ...(Platform.OS === 'web' && {
        boxShadow: `0 4px 12px ${theme.colors.primary}55`,
      }),
      ...(Platform.OS !== 'web' && {
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      }),
      elevation: 4,
    },
    okayButtonText: {
      color: theme.colors.background,
      fontSize: 16,
      fontWeight: '700',
      fontFamily: theme.fonts.heading,
      letterSpacing: 0.5,
    },
  });

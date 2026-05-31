import { useAtom } from 'jotai';
import {
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { backendUrlAtom, themeAtom } from '../../AppState/Atoms';
import { useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { compareVersions } from '../../Functions/compareVersion';
export const UpdateWarning = ({}) => {
  const [theme] = useAtom(themeAtom);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [updateUrl, setUpdateUrl] = useState('');
  const [url] = useAtom(backendUrlAtom);
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch(`${url}/version-check`);
        const data = await res.json();

        const current = DeviceInfo.getVersion();

        if (compareVersions(current, data.minRequiredVersion) < 0) {
          const url =
            Platform.OS === 'ios' ? data.updateUrl.ios : data.updateUrl.android;
          setUpdateUrl(url);
          setForceUpdate(true); // 🔴 block the app
        }
      } catch (e) {
        console.log('Hiello', e);
      }
    };

    checkVersion();
  }, []);
  return (
    <Modal visible={forceUpdate} transparent animationType="fade">
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: theme.colors.transparentBackground,
          },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              borderRadius: 10,
              borderColor: 'white',
              borderWidth: 1,
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          {/* Icon */}
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.colors.primary + '22' },
            ]}
          >
            <Text style={styles.icon}>🚨</Text>
          </View>

          {/* Title */}
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.heading,
              },
            ]}
          >
            Update Required
          </Text>

          {/* Subtitle */}
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.body,
              },
            ]}
          >
            A new version of BluffArena is available. Please update to continue
            playing.
          </Text>

          {/* Divider */}
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.colors.inputBorder },
            ]}
          />

          {/* Button */}
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              if (updateUrl) Linking.openURL(updateUrl);
            }}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnText, { fontFamily: theme.fonts.heading }]}>
              Update Now
            </Text>
          </TouchableOpacity>

          {/* Version note */}
          <Text
            style={[
              styles.versionNote,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.body,
              },
            ]}
          >
            Current version is no longer supported
          </Text>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor comes from theme
  },
  card: {
    width: '85%',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    // backgroundColor comes from theme
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 20,
  },
  btn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  versionNote: {
    fontSize: 11,
  },
});

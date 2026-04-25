import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useScreenDimensions } from '../../../../../../../../Hooks/useScreenDimensions';

export default function DropDownSelector({
  text,
  options,
  heightOfDropDown,
  zIndex,
  onChangeFunction,
}) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const data = options;
  const { width } = useScreenDimensions();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const isSmall = width < 824;
  const isTiny = width < 644;
  const isNarrow = width < 552;

  return (
    <View
      style={[
        styles.container,
        isSmall && { paddingHorizontal: 8 },
        isNarrow && { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      {/* Label — mirrors TopBar label style */}
      <Text
        style={[
          styles.label,
          isSmall && { fontSize: 14 },
          isTiny && { fontSize: 13 },
          isNarrow && { fontSize: 12 },
        ]}
      >
        {text}
      </Text>

      <View
        style={[
          styles.dropDownContainer,
          isNarrow && { width: '100%', alignItems: 'center' },
        ]}
      >
        {/* Trigger button — glass pill matching TopBar scoreBoard */}
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            isDropdownOpen && styles.dropdownButtonOpen,
            isSmall && { height: 45, width: '92%' },
            isTiny && { height: 40, width: '90%' },
            isNarrow && { width: '100%', maxWidth: 250, height: 40 },
          ]}
          onPress={toggleDropdown}
          activeOpacity={0.75}
        >
          <Text
            style={[
              styles.dropdownButtonText,
              !selectedCategory && styles.dropdownPlaceholder,
              isSmall && { fontSize: 14 },
              isTiny && { fontSize: 13 },
              isNarrow && { fontSize: 12 },
            ]}
          >
            {selectedCategory || 'Select a category'}
          </Text>

          {/* Chevron indicator */}
          <Text style={[styles.chevron, isDropdownOpen && styles.chevronOpen]}>
            ›
          </Text>
        </TouchableOpacity>

        {/* Dropdown list — glass panel matching TopBar scoreBoard depth */}
        {isDropdownOpen && (
          <FlatList
            data={data}
            keyExtractor={item => item}
            style={[
              styles.dropdownList,
              isSmall && { width: '92%' },
              isTiny && { width: '90%' },
              isNarrow && { width: '100%', maxWidth: 250 },
              heightOfDropDown
                ? { height: heightOfDropDown, bottom: 10 }
                : null,
              zIndex ? { zIndex: zIndex } : null,
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                activeOpacity={0.65}
                onPress={() => {
                  onChangeFunction(item);
                  setSelectedCategory(item);
                  setIsDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    item === selectedCategory && styles.dropdownItemTextActive,
                    isSmall && { fontSize: 14 },
                    isTiny && { fontSize: 13 },
                    isNarrow && { fontSize: 12 },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Container ───────────────────────────────────────────────────────────────
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 1)', // matches TopBar container
    width: '100%',
    position: 'relative',
  },

  // ── Label — mirrors TopBar label ────────────────────────────────────────────
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)', // matches TopBar label color
    marginBottom: 8,
  },

  dropDownContainer: {
    position: 'relative',
    width: '100%',
  },

  // ── Trigger button — mirrors TopBar scoreBoard glass pill ───────────────────
  dropdownButton: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // matches TopBar scoreBoard bg
    borderRadius: 12, // matches TopBar scoreBoard
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // matches TopBar scoreBoard border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3, // matches TopBar scoreBoard
  },
  dropdownButtonOpen: {
    borderColor: 'rgba(255, 255, 255, 0.35)', // brightens when open
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },

  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '700', // matches TopBar value weight
    color: '#FFFFFF', // matches TopBar value color
    flex: 1,
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.4)', // dimmed, like TopBar 0-count value
    fontWeight: '600',
  },

  chevron: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.5)',
    transform: [{ rotate: '90deg' }],
    marginLeft: 8,
  },
  chevronOpen: {
    color: '#FFFFFF',
    transform: [{ rotate: '-90deg' }],
  },

  // ── Dropdown list — glass panel, deeper than button ─────────────────────────
  dropdownList: {
    width: '90%',
    backgroundColor: 'rgba(10, 10, 10, 0.97)', // near-opaque dark, sits above content
    borderRadius: 12, // matches TopBar scoreBoard
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // matches TopBar scoreBoard border
    marginTop: 4,
    maxHeight: 200,
    position: 'absolute',
    top: 54, // clears the button
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  // ── Items — mirror TopBar divider + ScoreItem row ───────────────────────────
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)', // matches TopBar divider color
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '600', // matches TopBar label weight
    color: 'rgba(255, 255, 255, 0.7)', // matches TopBar label color
  },
  dropdownItemTextActive: {
    color: '#FFFFFF', // full white for selected, matches TopBar value
    fontWeight: '700',
  },
});

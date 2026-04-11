import { useState } from "react";
import { useScreenDimensions } from "../../../../../../../../Hooks/useScreenDimensions";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DropDownSelector({
  text,
  options,
  heightOfDropDown,
  zIndex,
  onChangeFunction,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const data = options;
  const { width } = useScreenDimensions();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <View
      style={[
        styles.container,

        width < 824 ? { paddingHorizontal: 5 } : {},

        width < 552
          ? {
              alignItems: "center",
              justifyContent: "center",
            }
          : {},
      ]}
    >
      <Text
        style={[
          styles.label,
          width < 824 ? { fontSize: 14 } : {},
          width < 644 ? { fontSize: 13 } : {},
          width < 552 ? { fontSize: 11 } : {},
        ]}
      >
        {text}
      </Text>
      <View
        style={[
          styles.dropDownContainer,
          width < 552 ? { width: "100%", alignItems: "center" } : {},
        ]}
      >
        <TouchableOpacity
          style={[
            styles.dropdownButton,

            width < 824 ? { height: 45, width: "92%" } : {},
            width < 644 ? { height: 40, width: "90%" } : {},
            width < 552 ? { width: "100%", maxWidth: 250, height: 40 } : {},
          ]}
          onPress={toggleDropdown}
        >
          <Text
            style={[
              styles.dropdownButtonText,
              width < 824 ? { fontSize: 15 } : {},
              width < 644 ? { fontSize: 14 } : {},
              width < 552 ? { fontSize: 11 } : {},
            ]}
          >
            {selectedCategory || "Select a category"}
          </Text>
        </TouchableOpacity>

        {isDropdownOpen && (
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            style={[
              styles.dropdownList,

              width < 824 ? { width: "92%" } : {},
              width < 644 ? { width: "90%" } : {},
              width < 552 ? { width: "100%", maxWidth: 250 } : {},

              heightOfDropDown
                ? { height: heightOfDropDown, bottom: 10 }
                : null,
              zIndex ? { zIndex: zIndex } : null,
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onChangeFunction(item);
                  setSelectedCategory(item);
                  setIsDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    width < 824 ? { fontSize: 15 } : {},
                    width < 644 ? { fontSize: 14 } : {},
                    width < 552 ? { fontSize: 11 } : {},
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
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 0,
    backgroundColor: "black",
    width: "100%",
    position: "relative",
    marginTop: 0,
  },

  label: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },

  dropDownContainer: {
    position: "relative",
    width: "100%",
  },

  dropdownButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#222",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },

  dropdownButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#EEE",
  },

  dropdownList: {
    width: "90%",
    backgroundColor: "#333",
    borderRadius: 8,
    marginTop: 0,
    maxHeight: 200,
    position: "absolute",
    top: 0,
    zIndex: 10,
    left: 10,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },

  dropdownItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#EEE",
  },
});

//         {isDropdownOpen && (
//           <FlatList
//             data={data}
//             keyExtractor={(item) => item}

//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={[
//                   styles.dropdownItem,

//                   width < 824 ? { paddingVertical: 10 } : {},
//                   width < 644 ? { paddingVertical: 8 } : {},
//                 ]}
//                 onPress={() => {
//                   onChangeFunction(item);
//                   setSelectedCategory(item);
//                   setIsDropdownOpen(false);
//                 }}
//               >
//                 <Text
//                   style={[
//                     styles.dropdownItemText,
//                     width < 824 ? { fontSize: 15 } : {},
//                     width < 644 ? { fontSize: 14 } : {},
//                     width < 552 ? { fontSize: 14 } : {},
//                   ]}
//                 >
//                   {item}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

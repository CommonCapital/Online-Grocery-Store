import { I18nManager, Pressable, Text, View } from "react-native";
import i18n from "../i18n";

function LanguageSwitcher() {
  const switchLang = (lang) => {
    i18n.changeLanguage(lang);
    I18nManager.forceRTL(false); // RTL not needed for en/ru/kz
  };

  return (
 <View className="flex-row gap-3">
      <Pressable onPress={() => switchLang("en")}>
        <Text>🇬🇧 EN</Text>
      </Pressable>
      <Pressable onPress={() => switchLang("ru")}>
        <Text>🇷🇺 RU</Text>
      </Pressable>
      <Pressable onPress={() => switchLang("kz")}>
        <Text>🇰🇿 KZ</Text>
      </Pressable>
    </View>
  );
}

export default LanguageSwitcher;
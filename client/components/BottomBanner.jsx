import { Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
const BottomBanner = () => {
    const {t} = useTranslation();
  return (
  <View>
      <View className="bg-gradient-to-t bg-blue-100 rounded-t-3xl shadow-2xl p-25 mt-10" width={"100%"}>
        <Text className="text-center text-xl font-bold text-green-800 mb-4">
          {t("why_best")}
        </Text>

        <View className="space-y-20 gap-y-5">
          <Feature
            icon={<Ionicons name="rocket-outline" size={24} color="#16a34a" />}
            title={t("fastest_delivery")}
            subtitle={t("fastest_delivery_desc")}
          />
          <Feature
            icon={<MaterialIcons name="eco" size={24} color="#16a34a" />}
            title={t("freshness")}
            subtitle={t("freshness_desc")}
          />
          <Feature
            icon={<FontAwesome5 name="tags" size={22} color="#16a34a" />}
            title={t("affordable")}
            subtitle={t("affordable_desc")}
          />
          <Feature
            icon={<Ionicons name="people-circle" size={24} color="#16a34a" />}
            title={t("trusted")}
            subtitle={t("trusted_desc")}
          />
        </View>
      </View>
    </View>
  )
}
function Feature({ icon, title, subtitle }) {
  return (
    <View className="flex-row items-start gap-3">
      <View className="mt-1">{icon}</View>
      <View className="flex-1">
        <Text className="text-md font-semibold text-green-900">{title}</Text>
        <Text className="text-sm text-green-700">{subtitle}</Text>
      </View>
    </View>
  );
}

export default BottomBanner


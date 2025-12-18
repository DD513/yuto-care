import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/contexts/AuthProvider";
import { UnderlineInput } from "@/components/ui/UnderlineInput";

const ILLUSTRATION_SOURCE = require("../../../../assets/images/yuto-mascot4.png"); // TODO: 換成你的插圖/吉祥物

export default function LoginScreen() {
  const { login } = useAuth();
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secure, setSecure] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await login(account.trim(), password);
      Keyboard.dismiss();
    } catch {
      setError("登入失敗，請確認帳密或網路狀態");
    } finally {
      setLoading(false);
    }
  };

  const onOtherLogin = () => {
    // TODO: 之後你要做 Apple/Google/醫院 SSO，都可以先導去一個選擇頁
    // router.push("/(auth)/login-methods")
  };

  const isDisabled = loading || !account.trim() || !password;

  return (
    <SafeAreaView className="flex-1 bg-bg-light dark:bg-bg-dark">
      {/* ✅ 用 Pressable 當背景點擊收鍵盤，但不包住輸入框的事件 */}
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: undefined })}
          className="flex-1"
        >
          {/* ✅ 內容區：用 pointerEvents box-none 讓內部可點 */}
          <View className="flex-1 px-6 pt-6" pointerEvents="box-none">
            {/* 上方插圖 */}
            <View className="items-center mt-2">
              <Image
                source={ILLUSTRATION_SOURCE}
                style={{ width: 280, height: 240, resizeMode: "contain" }}
              />
            </View>

            {/* 標題 */}
            <Text className="mt-6 text-center text-4xl font-englishTitle text-text-light dark:text-text-dark">
              Yuto
            </Text>

            {/* 表單 */}
            <View className="mt-8">
              <UnderlineInput
                label="電子郵件或手機號碼"
                value={account}
                onChangeText={setAccount}
                autoCapitalize="none"
                keyboardType="default"
                placeholder="example@gmail.com"
                returnKeyType="next"
              />

              <View className="mt-7">
                <UnderlineInput
                  label="密碼"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secure}
                  placeholder="************"
                  returnKeyType="done"
                  onSubmitEditing={onSubmit}
                  rightIconName={secure ? "eye-off-outline" : "eye-outline"}
                  onPressRightIcon={() => setSecure((v) => !v)}
                />
              </View>

              {/* Forgot password */}
              <Pressable
                onPress={() => {}}
                className="mt-4 self-end"
                hitSlop={10}
              >
                <Text className="text-xs font-chineseRegular text-black/45">
                  忘記密碼?
                </Text>
              </Pressable>

              {/* error */}
              {error ? (
                <Text className="mt-3 font-chineseRegular text-sm text-red-500">
                  {error}
                </Text>
              ) : null}

              {/* Login button */}
              <Pressable
                onPress={onSubmit}
                disabled={isDisabled}
                className={`mt-6 h-14 items-center justify-center rounded-2xl ${
                  isDisabled ? "bg-primary/60" : "bg-primary"
                }`}
              >
                {loading ? (
                  <View className="flex-row items-center">
                    <ActivityIndicator color="#fff" />
                    <Text className="ml-2 font-EnglishBold text-base text-text-light dark:text-text-dark">
                      Logging in...
                    </Text>
                  </View>
                ) : (
                  <Text className="font-chineseRegular text-xl text-text-dark">
                    登入
                  </Text>
                )}
              </Pressable>

              {/* ✅ 新增：其他登入方式 */}
              <Pressable
                onPress={onOtherLogin}
                className="mt-4 h-14 items-center justify-center rounded-2xl border border-border-light bg-border-light/30 dark:bg-border-dark/30"
              >
                <Text className="font-chineseRegular text-lg text-text-light dark:text-text-dark">
                  使用其他方式登入
                </Text>
              </Pressable>

              {/* Bottom text */}
              <View className="mt-5 flex-row items-center justify-center">
                <Text className="text-base font-chineseRegular text-text-subtle-light dark:text-text-subtle-dark">
                  還沒有帳號嗎?{" "}
                </Text>
                <Pressable onPress={() => {}} hitSlop={10}>
                  <Text className="text-base font-EnglishBold text-primary">
                    註冊
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="flex-1" />
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
}

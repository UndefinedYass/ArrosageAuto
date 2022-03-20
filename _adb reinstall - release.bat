adb shell pm uninstall -k com.arrosageautoapp || (pause && exit)
adb install  ./android/app/build/outputs/apk/release/app-release.apk && exit
pause
adb shell pm uninstall -k com.arrosageautoapp || (pause && exit)
adb install  ./android/app/build/outputs/apk/debug/app-debug.apk && exit
pause
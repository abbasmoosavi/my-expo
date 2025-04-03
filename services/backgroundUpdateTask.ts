import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

const BACKGROUND_UPDATE_TASK = "background-update-task";

TaskManager.defineTask(BACKGROUND_UPDATE_TASK, async () => {
    try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            await Notifications.scheduleNotificationAsync({
                content: { title: "New Update!", body: "Open the app to update." },
                trigger: null,
            });
        }
        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        Alert.alert('Error checking update in background:', JSON.stringify(error))
        console.error("Error checking update in background:", error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

export async function registerBackgroundUpdateTask() {
    const status = await BackgroundFetch.getStatusAsync();
    if (status === BackgroundFetch.BackgroundFetchStatus.Available) {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_UPDATE_TASK, {
            //   minimumInterval: 60 * 60 * 4, // Every 4 hours
            minimumInterval: 60 * 5,
            stopOnTerminate: false,
            startOnBoot: true,
        });
        Alert.alert('registerBackgroundUpdateTask', "Background update task registered")
        console.log("Background update task registered");
    }
}

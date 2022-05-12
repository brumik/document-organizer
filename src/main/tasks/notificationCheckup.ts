import expiryNotification from "../utility/expiryNotification"

const notificationCheckup = () => {
  if (global.preferencesStore.notificationEnabled) {
    const notif = expiryNotification(
      global.documentStore.all,
      global.projectStore.all,
      global.preferencesStore.notificationBeforeDays
    );

    if (notif) {
      notif.show();
    }
  }
}

export default notificationCheckup;

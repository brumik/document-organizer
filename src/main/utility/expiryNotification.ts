import { Project, Document } from "../../types"
import { nativeImage, Notification } from "electron";
import logo from "../../render/logo_256x256.png";

const countBeforeExpiry = (
  items: Document[] | Project[],
  daysBefore: number,
): number => {
  const now = new Date();
  now.setDate(now.getDate() + daysBefore);

  const expiringItems = items.filter((item) => 
    item.expirationDate && now > new Date(item.expirationDate)
  );

  return expiringItems.length;
}

const expiryNotification = (
  documents: Document[],
  projects: Project[],
  daysBefore: number,
): Notification | undefined => {
  if (Notification.isSupported()) {
    const noOfExpiringProjects = countBeforeExpiry(projects, daysBefore);
    const noOfExpiringDocuments = countBeforeExpiry(documents, daysBefore);

    if (noOfExpiringDocuments <= 0 && noOfExpiringProjects <= 0) {
      return undefined;
    }

    let title = '';
    if (noOfExpiringDocuments > 0 && noOfExpiringProjects > 0) {
      title = `${noOfExpiringDocuments} documents and ${noOfExpiringProjects} projects are going to expire.`
    } else if (noOfExpiringDocuments > 0) {
      title = `${noOfExpiringDocuments} documents are going to expire.`
    } else if (noOfExpiringProjects > 0) {
      title = `${noOfExpiringProjects} projects are going to expire.`
    }

    const notif = new Notification({
      title,
      icon: nativeImage.createFromDataURL(logo),
      /* TODO: Add action to open the app with the filters */
      /* TODO: body: 'Clic here to open the app.', */
    });

    return notif;
  }

  return undefined;
}

export default expiryNotification;
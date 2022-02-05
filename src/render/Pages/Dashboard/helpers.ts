import { RootState } from "../../store";

export const dateSmaller = (date: string, than: 'now' | '7d' | '1m' = 'now') => {
  const now = new Date();
  const then = new Date(date);
  switch (than) {
    case 'now':
      break;
    case '7d':
      now.setDate(now.getDate() + 7);
      break;
    case '1m':
      now.setMonth(now.getMonth() + 1);
      break;
  }

  return now > then;
}

export const documentExpirationFilter = (state: RootState) => {
  const expiredItems = state.database.documents.filter(
    el => el.expirationDate && dateSmaller(el.expirationDate)
  );
  const expiringInWeek = state.database.documents.filter(
    el => el.expirationDate && dateSmaller(el.expirationDate, '7d')
  );
  const expiringInMonth = state.database.documents.filter(
    el => el.expirationDate && dateSmaller(el.expirationDate, '1m')
  );

  return {
    expiringInMonth: expiringInMonth.filter(el => !expiringInWeek.includes(el)),
    expiringInWeek: expiringInWeek.filter(el => !expiredItems.includes(el)),
    expiredItems,
  };
};

export const projectExpirationFilter = (state: RootState) => {
  const expiredItems = state.database.projects.filter(
    el => el.expirationDate && dateSmaller(el.expirationDate)
  );
  const expiringInWeek = state.database.projects.filter(
    el => el.expirationDate && dateSmaller(el.expirationDate, '7d')
  );
  const expiringInMonth = state.database.projects.filter(
    el => el.expirationDate && dateSmaller(el.expirationDate, '1m')
  );

  return {
    expiringInMonth: expiringInMonth.filter(el => !expiringInWeek.includes(el)),
    expiringInWeek: expiringInWeek.filter(el => !expiredItems.includes(el)),
    expiredItems,
  };
};
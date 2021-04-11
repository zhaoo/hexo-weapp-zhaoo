interface IFormateDate {
  (rawDate: string): string;
}

export const formateDate: IFormateDate = (rawDate) => {
  const arr = new Date(rawDate).toString().split(' ');
  const m = arr[1];
  const d = arr[2];
  const y = arr[3];
  return `${m} ${d}, ${y}`;
};

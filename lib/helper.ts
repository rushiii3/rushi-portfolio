export function formatDisplayDate(dateInput: string): string {
  const isoDateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateInput.match(isoDateOnlyPattern);

  if (match) {
    const [, year, month, day] = match;
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  const parsed = Date.parse(dateInput);
  if (Number.isNaN(parsed)) {
    return dateInput;
  }

  return new Date(parsed).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}
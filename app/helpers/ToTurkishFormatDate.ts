export const ToTurkishFormatDate = (timestamp: number, format: string = "dd.MM.yyyy"): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const weekDay = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const dayNames = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month - 1]); // Adjusted for zero-based index

  if (format.includes("yyyy")) {
    format = format.replace("yyyy", year.toString());
  } else if (format.includes("yy")) {
    format = format.replace("yy", year.toString().substr(2, 2));
  }

  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.includes("HH")) {
    format = format.replace("HH", hours.toString().padStart(2, "0"));
  }

  if (format.includes("hh")) {
    let hours12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    format = format.replace("hh", hours12.toString().padStart(2, "0"));
  }

  if (format.includes("ii")) {
    format = format.replace("ii", minutes.toString().padStart(2, "0"));
  }

  if (format.includes("ss")) {
    format = format.replace("ss", seconds.toString().padStart(2, "0"));
  }

  return format;
};

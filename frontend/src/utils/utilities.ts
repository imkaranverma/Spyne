import { DateTime } from "luxon";
import { environment } from "../global_config";

export const isObjectEmpty = (obj?: object): boolean => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

export const timeAgo = (date: number) => {
  const units: any = ["year", "month", "week", "day", "hour", "minute", "second"];
  const dateTime = DateTime.fromMillis(date);
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit_item: any) => diff.get(unit_item) !== 0) || "second";

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto"
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};

export const keyExist = (object: any, key: string): boolean => Object.keys(object).indexOf(key) !== -1;

export const getCurrentYear = () => DateTime.now().year;

export const getCurrentYearPeriod = () => `${DateTime.now().year - 1} - ${DateTime.now().year}`;

/// Capitalize each word inside string
/// Example: your name => Your Name, your name => Your name
export const capitalize = (value: String) => {
  if (!value) return null;
  if (value?.length === 0) return value;
  return value.split(" ").map(capitalizeFirst).join(" ");
};

/// Uppercase first letter inside string and let the others lowercase
/// Example: your name => Your name
export const capitalizeFirst = (s?: String) => {
  if (!s) return null;
  if (s?.length === 0) return s;
  return s[0].toUpperCase() + s.substring(1).toLowerCase();
};

export const fDateTime = ({ locale = "en", format = "y-LL-dd t", value }: { value?: number | Date | string | null | undefined; locale?: string; format?: string }) => {
  /// locale='en' format='D' 07/20/2023

  /// locale='en' format='t' 2:32 PM

  if (!value) {
    return 0;
  }

  if (typeof value == null) {
    return 0;
  }
  //   console.log("value ciming: ", value);
  //   console.log("type  ciming: ", typeof value);
  // console.log(Object.prototype.toString.call(value) === "[object Date]" ||  typeof value == "string")
  if (Object.prototype.toString.call(value) === "[object Date]") {
    const year = (value as Date)?.getFullYear();
    const month = String(((value as Date)?.getMonth() ?? 0) + 1).padStart(2, "0");
    const day = String((value as Date)?.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  if (typeof value == "string") {
    return value;
  }
  if (typeof value === "number") {
    return DateTime.fromMillis(value).setLocale(locale).toFormat(format);
  }
  return "";
};

export function fCurrency(number: number | string, minimumFractionDigits = 1) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "inr",
    maximumFractionDigits: 1,
    minimumFractionDigits: minimumFractionDigits
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const formattedValue = number ? formatter.format(typeof number === "string" ? parseFloat(number) : number) : "0";

  return formattedValue;
}
export function fNumber(number?: number | string, maximumFractionDigits?: number, minimumFractionDigits?: number, removeSign?: boolean) {
  if (!number) return "0";
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maximumFractionDigits ?? 2,

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: minimumFractionDigits ?? 1 // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const formattedValue = number ? formatter.format(typeof number === "string" ? parseFloat(number) : number) : "0";
  console.log(formattedValue);
  return removeSign && formattedValue.split("-").length > 1 ? formattedValue.split("-")[1] : formattedValue;
}

export const fileTypeMapping: { [key in string]: string[] } = {
  "image/jpeg": [".jpeg", ".png", ".jpg"],
  "image/png": [".png"],
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "text/csv": [".csv"],
  "application/vnd.ms-excel": [".xls"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
};

export function fAbbrev(number?: number, decPlaces: number = 2, prefix: string = "$") {
  if (!number) return "0";

  if (number === 0) return "0";
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = 10 ** decPlaces;

  // Enumerate number abbreviations
  const abbrev = ["K", "M", "B", "T"];
  let formattedValue: string = "";

  // Go through the array backwards, so we do the largest first
  // eslint-disable-next-line no-plusplus
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = 10 ** ((i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Add the letter for the abbreviation
      formattedValue = prefix + number + abbrev[i];

      // We are done... stop
      break;
    } else {
      formattedValue = prefix + number;
    }
  }

  return formattedValue;
}

export const isLiveEnv = environment?.toLowerCase() === "live";
export const isDevEnv = environment?.toLowerCase() === "dev";

export const isNegative = (value: number) => {
  if (value == 0) {
    return false;
  }

  return Math.sign(value) === -1 ? true : false;
};

export const downloadFile = (data: any, file_name: string, blobType: "application/pdf" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" = "application/pdf") => {
  const pdfBlob = new Blob([data], { type: blobType });
  console.log(pdfBlob);
  // Create a temporary URL for the Blob
  const url = window.URL.createObjectURL(pdfBlob);

  // Create a temporary <a> element to trigger the download
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", file_name); // Set the desired filename for the downloaded file

  // Append the <a> element to the body and click it to trigger the download
  document.body.appendChild(tempLink);
  tempLink.click();

  // Clean up the temporary elements and URL
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(url);
};

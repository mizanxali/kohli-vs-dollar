// Virat Kohli's international centuries (Test, ODI, T20I).
// Source: Wikipedia "List of international cricket centuries by Virat Kohli",
// verified July 2026. Count: 30 Test + 54 ODI + 1 T20I = 85 international tons,
// second only to Sachin Tendulkar's 100. He retired from Tests (May 2025) and
// T20Is (2024), so only the ODI tally can still grow toward 100.

export type Format = "Test" | "ODI" | "T20I";

export interface Century {
  /** ISO date (YYYY-MM-DD) the century was scored. */
  date: string;
  format: Format;
  score: number;
  opponent: string;
}

// Kept in chronological order so the cumulative line can be derived by index.
export const CENTURIES: Century[] = [
  { date: "2009-12-24", format: "ODI", score: 107, opponent: "Sri Lanka" },
  { date: "2010-01-11", format: "ODI", score: 102, opponent: "Bangladesh" },
  { date: "2010-10-20", format: "ODI", score: 118, opponent: "Australia" },
  { date: "2010-11-28", format: "ODI", score: 105, opponent: "New Zealand" },
  { date: "2011-02-19", format: "ODI", score: 100, opponent: "Bangladesh" },
  { date: "2011-09-16", format: "ODI", score: 107, opponent: "England" },
  { date: "2011-10-17", format: "ODI", score: 112, opponent: "England" },
  { date: "2011-12-02", format: "ODI", score: 117, opponent: "West Indies" },
  { date: "2012-01-24", format: "Test", score: 116, opponent: "Australia" },
  { date: "2012-02-28", format: "ODI", score: 133, opponent: "Sri Lanka" },
  { date: "2012-03-13", format: "ODI", score: 108, opponent: "Sri Lanka" },
  { date: "2012-03-18", format: "ODI", score: 183, opponent: "Pakistan" },
  { date: "2012-07-21", format: "ODI", score: 106, opponent: "Sri Lanka" },
  { date: "2012-07-31", format: "ODI", score: 128, opponent: "Sri Lanka" },
  { date: "2012-08-31", format: "Test", score: 103, opponent: "New Zealand" },
  { date: "2012-12-13", format: "Test", score: 103, opponent: "England" },
  { date: "2013-02-22", format: "Test", score: 107, opponent: "Australia" },
  { date: "2013-07-05", format: "ODI", score: 102, opponent: "West Indies" },
  { date: "2013-07-24", format: "ODI", score: 115, opponent: "Zimbabwe" },
  { date: "2013-10-16", format: "ODI", score: 100, opponent: "Australia" },
  { date: "2013-10-30", format: "ODI", score: 115, opponent: "Australia" },
  { date: "2013-12-18", format: "Test", score: 119, opponent: "South Africa" },
  { date: "2014-01-19", format: "ODI", score: 123, opponent: "New Zealand" },
  { date: "2014-02-14", format: "Test", score: 105, opponent: "New Zealand" },
  { date: "2014-02-26", format: "ODI", score: 136, opponent: "Bangladesh" },
  { date: "2014-10-17", format: "ODI", score: 127, opponent: "West Indies" },
  { date: "2014-11-16", format: "ODI", score: 139, opponent: "Sri Lanka" },
  { date: "2014-12-09", format: "Test", score: 115, opponent: "Australia" },
  { date: "2014-12-09", format: "Test", score: 141, opponent: "Australia" },
  { date: "2014-12-26", format: "Test", score: 169, opponent: "Australia" },
  { date: "2015-01-06", format: "Test", score: 147, opponent: "Australia" },
  { date: "2015-02-15", format: "ODI", score: 107, opponent: "Pakistan" },
  { date: "2015-08-12", format: "Test", score: 103, opponent: "Sri Lanka" },
  { date: "2015-10-22", format: "ODI", score: 138, opponent: "South Africa" },
  { date: "2016-01-17", format: "ODI", score: 117, opponent: "Australia" },
  { date: "2016-01-20", format: "ODI", score: 106, opponent: "Australia" },
  { date: "2016-07-21", format: "Test", score: 200, opponent: "West Indies" },
  { date: "2016-10-08", format: "Test", score: 211, opponent: "New Zealand" },
  { date: "2016-10-23", format: "ODI", score: 154, opponent: "New Zealand" },
  { date: "2016-11-17", format: "Test", score: 167, opponent: "England" },
  { date: "2016-12-08", format: "Test", score: 235, opponent: "England" },
  { date: "2017-01-15", format: "ODI", score: 122, opponent: "England" },
  { date: "2017-02-09", format: "Test", score: 204, opponent: "Bangladesh" },
  { date: "2017-07-06", format: "ODI", score: 111, opponent: "West Indies" },
  { date: "2017-07-26", format: "Test", score: 103, opponent: "Sri Lanka" },
  { date: "2017-08-31", format: "ODI", score: 131, opponent: "Sri Lanka" },
  { date: "2017-09-03", format: "ODI", score: 110, opponent: "Sri Lanka" },
  { date: "2017-10-22", format: "ODI", score: 121, opponent: "New Zealand" },
  { date: "2017-10-29", format: "ODI", score: 113, opponent: "New Zealand" },
  { date: "2017-11-16", format: "Test", score: 104, opponent: "Sri Lanka" },
  { date: "2017-11-24", format: "Test", score: 213, opponent: "Sri Lanka" },
  { date: "2017-12-02", format: "Test", score: 243, opponent: "Sri Lanka" },
  { date: "2018-01-13", format: "Test", score: 153, opponent: "South Africa" },
  { date: "2018-02-01", format: "ODI", score: 112, opponent: "South Africa" },
  { date: "2018-02-07", format: "ODI", score: 160, opponent: "South Africa" },
  { date: "2018-02-16", format: "ODI", score: 129, opponent: "South Africa" },
  { date: "2018-08-01", format: "Test", score: 149, opponent: "England" },
  { date: "2018-08-18", format: "Test", score: 103, opponent: "England" },
  { date: "2018-10-04", format: "Test", score: 139, opponent: "West Indies" },
  { date: "2018-10-21", format: "ODI", score: 140, opponent: "West Indies" },
  { date: "2018-10-24", format: "ODI", score: 157, opponent: "West Indies" },
  { date: "2018-10-27", format: "ODI", score: 107, opponent: "West Indies" },
  { date: "2018-12-14", format: "Test", score: 123, opponent: "Australia" },
  { date: "2019-01-15", format: "ODI", score: 104, opponent: "Australia" },
  { date: "2019-03-05", format: "ODI", score: 116, opponent: "Australia" },
  { date: "2019-03-08", format: "ODI", score: 123, opponent: "Australia" },
  { date: "2019-08-11", format: "ODI", score: 120, opponent: "West Indies" },
  { date: "2019-08-14", format: "ODI", score: 114, opponent: "West Indies" },
  { date: "2019-10-10", format: "Test", score: 254, opponent: "South Africa" },
  { date: "2019-11-22", format: "Test", score: 136, opponent: "Bangladesh" },
  { date: "2022-09-08", format: "T20I", score: 122, opponent: "Afghanistan" },
  { date: "2022-12-10", format: "ODI", score: 113, opponent: "Bangladesh" },
  { date: "2023-01-10", format: "ODI", score: 113, opponent: "Sri Lanka" },
  { date: "2023-01-15", format: "ODI", score: 166, opponent: "Sri Lanka" },
  { date: "2023-03-09", format: "Test", score: 186, opponent: "Australia" },
  { date: "2023-07-20", format: "Test", score: 121, opponent: "West Indies" },
  { date: "2023-09-10", format: "ODI", score: 122, opponent: "Pakistan" },
  { date: "2023-10-19", format: "ODI", score: 103, opponent: "Bangladesh" },
  { date: "2023-11-05", format: "ODI", score: 101, opponent: "South Africa" },
  { date: "2023-11-15", format: "ODI", score: 117, opponent: "New Zealand" },
  { date: "2024-11-22", format: "Test", score: 100, opponent: "Australia" },
  { date: "2025-02-23", format: "ODI", score: 100, opponent: "Pakistan" },
  { date: "2025-11-30", format: "ODI", score: 135, opponent: "South Africa" },
  { date: "2025-12-03", format: "ODI", score: 102, opponent: "South Africa" },
  { date: "2026-01-18", format: "ODI", score: 124, opponent: "New Zealand" },
];

export const CENTURY_COUNT = CENTURIES.length;

/** Kohli's international debut - the natural left edge of the "ALL" time range. */
export const KOHLI_DEBUT = "2008-08-18";

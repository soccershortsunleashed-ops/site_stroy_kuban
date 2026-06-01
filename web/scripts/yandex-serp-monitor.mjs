import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API_URL = "https://searchapi.api.cloud.yandex.net/v2/web/search";
const ROOT_DIR = process.cwd();
const QUERIES_PATH = path.join(ROOT_DIR, "data", "seo", "queries.txt");
const OUTPUT_DIR = path.join(ROOT_DIR, "data", "seo", "reports");

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function parseQueries(input) {
  return input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function decodeRawData(rawData) {
  return Buffer.from(rawData, "base64").toString("utf-8");
}

function extractError(xml) {
  const match = xml.match(/<error code="(\d+)">([\s\S]*?)<\/error>/i);
  if (!match) return null;
  return { code: match[1], message: match[2].trim() };
}

function extractUrls(xml) {
  const urls = [];
  const regex = /<url>([\s\S]*?)<\/url>/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

function rankOfDomain(urls, targetDomain) {
  const normalized = targetDomain.replace(/^www\./i, "").toLowerCase();
  for (let i = 0; i < urls.length; i += 1) {
    const host = domainFromUrl(urls[i]);
    if (host === normalized || host.endsWith(`.${normalized}`)) {
      return i + 1;
    }
  }
  return null;
}

async function searchQuery({
  apiKey,
  folderId,
  queryText,
  targetDomain,
}) {
  const body = {
    folderId,
    query: {
      searchType: "SEARCH_TYPE_RU",
      queryText,
      page: "0",
    },
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const xml = decodeRawData(data.rawData);
  const error = extractError(xml);
  const urls = extractUrls(xml);
  const rank = rankOfDomain(urls, targetDomain);
  return { rank, urls, error };
}

function toCsv(rows) {
  const header = [
    "date",
    "query",
    "domain",
    "rank",
    "found_url",
    "top10_urls",
    "error_code",
    "error_message",
  ];
  const escapeCell = (value) => {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };
  const lines = [header.map(escapeCell).join(",")];
  for (const row of rows) {
    lines.push(
      [
        row.date,
        row.query,
        row.domain,
        row.rank ?? "",
        row.foundUrl ?? "",
        row.top10Urls.join(" | "),
        row.errorCode ?? "",
        row.errorMessage ?? "",
      ]
        .map(escapeCell)
        .join(","),
    );
  }
  return `${lines.join("\n")}\n`;
}

async function main() {
  const apiKey = requiredEnv("YANDEX_SEARCH_API_KEY");
  const folderId = requiredEnv("YANDEX_FOLDER_ID");
  const targetDomain = process.env.SERP_TARGET_DOMAIN ?? "stroytrest-23.ru";
  const runDate = new Date().toISOString().slice(0, 10);

  const queriesRaw = await readFile(QUERIES_PATH, "utf-8");
  const queries = parseQueries(queriesRaw);
  if (!queries.length) {
    throw new Error(`No queries found in ${QUERIES_PATH}`);
  }

  const rows = [];
  for (const query of queries) {
    const result = await searchQuery({
      apiKey,
      folderId,
      queryText: query,
      targetDomain,
    });

    const foundUrl =
      result.rank && result.urls[result.rank - 1] ? result.urls[result.rank - 1] : "";

    rows.push({
      date: runDate,
      query,
      domain: targetDomain,
      rank: result.rank,
      foundUrl,
      top10Urls: result.urls.slice(0, 10),
      errorCode: result.error?.code ?? "",
      errorMessage: result.error?.message ?? "",
    });
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  const outputPath = path.join(OUTPUT_DIR, `${runDate}.csv`);
  await writeFile(outputPath, `\uFEFF${toCsv(rows)}`, "utf-8");

  const ranked = rows.filter((r) => r.rank !== null).length;
  console.log(
    `Done. Queries: ${rows.length}, found in top10: ${ranked}, report: ${outputPath}`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

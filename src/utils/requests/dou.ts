import axios from "axios";
import { load, CheerioAPI, Cheerio, Element } from "cheerio";
import { LEVEL_VALUES, ROLE_VALUES } from "../constants";
import { HTTP } from "../http";

const adoptRole = (role: string) => {
  if (role === ROLE_VALUES.devops) return "DevOps";
  if (role === ROLE_VALUES.frontend) return "Front End";
  if (role === ROLE_VALUES.backend) return "Node.js";
  return "";
};

const adoptLevel = (level: string) => {
  if (level === LEVEL_VALUES.junior) return "&exp=1-3";
  if (level === LEVEL_VALUES.middle) return "&exp=3-5";
  if (level === LEVEL_VALUES.senior) return "&exp=5plus";
};

// const createDouSearchQuery = (role, level) => {};y

const searchDou = async (role: string, level: string): Promise<string> => {
  const encodedRole = encodeURIComponent(adoptRole(role));
  const searchQuery = role !== "devops" ? `&search=TypeScript` : "";
  const encodedLevel = adoptLevel(level);

  const url = `https://jobs.dou.ua/vacancies/?remote&category=${encodedRole}${searchQuery}${encodedLevel}`;

  try {
    const response = await axios.get(url, {
      headers: HTTP.headers,
    });
    const $: CheerioAPI = load(response.data);
    const vacancies = $("li.l-vacancy").slice(0, 5);

    let results = vacancies
      .map((_, vacancy) => {
        const titleElement = $(vacancy).find("a.vt");
        const title = titleElement.text().trim();
        const link = titleElement.attr("href");
        const companyElement = $(vacancy).find("a.company");
        const company = companyElement.text().trim() || "Unknown Company";
        return `[${title} at ${company}](${link})`;
      })
      .get()
      .join("\n");

    // Append the "More vacancies" link if there are any results
    if (results.length > 0) {
      results += `\n[Show more..](${url})`;
    } else {
      results = "No vacancies found.";
    }

    return results;
  } catch (error) {
    console.error(`Error during fetching DOU vacancies: ${error as string}`);
    return "Failed to get vacancies.";
  }
};

export { searchDou };

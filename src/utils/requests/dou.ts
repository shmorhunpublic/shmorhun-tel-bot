import axios from "axios";
import { load, CheerioAPI, Cheerio, Element } from "cheerio";

// type Vacancy = {
//   title: string;
//   link: string;
//   company: string;
// };

const searchDou = async (category: string = "Python"): Promise<string> => {
  const url: string = `https://jobs.dou.ua/vacancies/?category=${encodeURIComponent(
    category
  )}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    const $: CheerioAPI = load(response.data);
    const vacancies: Cheerio<Element> = $("li.l-vacancy").slice(0, 5);

    const results: string[] = [];
    vacancies.each((_, vacancy) => {
      const titleElement: Cheerio<Element> = $(vacancy).find("a.vt");
      const title: string = titleElement.text().trim();
      const link: string | undefined = titleElement.attr("href");
      const companyElement: Cheerio<Element> = $(vacancy).find("a.company");
      const company: string = companyElement.text().trim() || "Unknown Company";

      if (link) {
        results.push(`${title} at ${company} - ${link}`);
      }
    });

    return results.join("\n");
  } catch (error) {
    console.error(`Error during fetching DOU vacancies: ${error as string}`);
    return "Failed to get vacancies.";
  }
};

export { searchDou };

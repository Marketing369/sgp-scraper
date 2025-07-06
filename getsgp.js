import puppeteer from "puppeteer";
import { executablePath } from "puppeteer";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/sgp4d", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});
    const page = await browser.newPage();
    await page.goto("https://www.singaporepools.com.sg/en/product/Pages/4d_results.aspx", {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(".result-4d");

    const data = await page.evaluate(() => {
      const results = [];
      const table = document.querySelectorAll(".result-4d tbody tr");
      table.forEach((row) => {
        const cols = row.querySelectorAll("td");
        if (cols.length >= 2) {
          const date = cols[0].innerText.trim();
          const result = cols[1].innerText.trim();
          results.push({ date, result });
        }
      });
      return results;
    });

    await browser.close();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}/api/sgp4d`));

import { useEffect, useState } from "react";

export default function useMenuData(sheetId) {
  const [groupedMenu, setGroupedMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);

       const endpoint =
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
        // https://docs.google.com/spreadsheets/d/1VvMkr62epqgHuuq_NNYHyPDpHRcjBEKN5srz0JPZ9Tc/edit?usp=sharing

        const response = await fetch(endpoint);
        const text = await response.text();

        // تنظيف JSON القادم من Google
        const json = JSON.parse(text.substring(47).slice(0, -2));

        const rows = json.table.rows;

        const data = rows.map((row) => ({
          category: row.c[0]?.v || "",
          item_name: row.c[1]?.v || "",
          price: row.c[2]?.v || "",
          description: row.c[3]?.v || "",
          image_url: row.c[4]?.v || "",
        }));

        // تجميع العناصر حسب الفئة
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }

          acc[item.category].push(item);

          return acc;
        }, {});

        setGroupedMenu(grouped);
      } catch (err) {
        setError("Failed to load menu data.");
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [sheetId]);

  return {
    groupedMenu,
    loading,
    error,
  };
}
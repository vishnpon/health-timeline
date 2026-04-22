import { useState, useEffect } from "react";

function ResearchPanel({ drugName }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setArticles([]);
      try {
        const searchRes = await fetch(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${drugName}+adverse+events&retmax=5&sort=date&retmode=json`
        );
        const searchData = await searchRes.json();
        const ids = searchData.esearchresult.idlist;

        if (!ids.length) {
          setLoading(false);
          return;
        }

        const summaryRes = await fetch(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`
        );
        const summaryData = await summaryRes.json();

        const parsed = ids.map((id) => {
          const article = summaryData.result[id];
          return {
            id,
            title: article.title,
            authors:
              article.authors?.slice(0, 3).map((a) => a.name).join(", ") +
              (article.authors?.length > 3 ? " et al." : ""),
            journal: article.fulljournalname,
            date: article.pubdate,
            url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
          };
        });

        setArticles(parsed);
      } catch (e) {
        console.error("PubMed fetch failed", e);
      }
      setLoading(false);
    }

    if (drugName) fetchArticles();
  }, [drugName]);

  if (loading) {
    return (
      <div style={{ padding: "1rem", color: "#64748b", fontSize: "0.9rem" }}>
        Fetching research articles...
      </div>
    );
  }

  if (!articles.length) return null;

  return (
    <div>
      <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#003b6f", marginBottom: "1.25rem" }}>
        Related Research
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "1rem",
              backgroundColor: "#f8fafc",
            }}
          >
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#0077cc",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              {article.title}
            </a>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "0.4rem",
                fontSize: "0.78rem",
                color: "#64748b",
                flexWrap: "wrap",
              }}
            >
              <span>{article.authors}</span>
              <span>{article.journal}</span>
              <span>{article.date}</span>
            </div>
            <button
              onClick={() =>
                setExpanded(expanded === article.id ? null : article.id)
              }
              style={{
                marginTop: "0.5rem",
                fontSize: "0.78rem",
                color: "#0077cc",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {expanded === article.id ? "Hide abstract" : "Show abstract"}
            </button>
            {expanded === article.id && (
              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.82rem",
                  color: "#334155",
                  lineHeight: 1.6,
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "0.5rem",
                }}
              >
                Abstract not available in this view — click the title to read
                the full article on PubMed.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResearchPanel;
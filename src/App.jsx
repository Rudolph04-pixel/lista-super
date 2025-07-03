// App mejorada con carrito inteligente, localStorage, historial, modo oscuro y dashboard

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const groceryList = {
  necesarias: [
    { item: "Arroz preparado", price: 2420 },
    { item: "FETUCCINI", price: 2120 },
    { item: "SALMON", price: 12000 },
    { item: "BAGUETTE", price: 1500 },
    { item: "Alambra", price: 7000 },
  ],
  Desayuno_gustos: [
    { item: "cereal", price: 3990 },
    { item: "GALLETAS CLUB SOCIAL", price: 1789 },
    { item: "AGUA TONICA", price: 1300 },
    { item: "Vino", price: 10000 },
    { item: "panpita", price: 1650 },
    { item: "empanada hojaldre", price: 3990 },
    { item: "infusion jenjibre", price: 3340 },
    { item: "café", price: 9350 },
    { item: "rucula", price: 1050 }
  ]
};

function App() {
  const [filter, setFilter] = useState("");
  const [user, setUser] = useState("Usuario");
  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem("selectedItems");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("purchaseHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem("purchaseHistory", JSON.stringify(history));
  }, [history]);

  const toggleItem = (category, item) => {
    const id = `${category}-${item.item}`;
    setSelectedItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.filter((i) => i.id !== id)
        : [...prev, { id, category, item: item.item, price: item.price }]
    );
  };

  const handleFinalize = () => {
    const date = new Date().toISOString();
    const record = { date, items: selectedItems };
    setHistory((prev) => [...prev, record]);
    setSelectedItems([]);
  };

  const totalByCategory = selectedItems.reduce((acc, i) => {
    acc[i.category] = (acc[i.category] || 0) + i.price;
    return acc;
  }, {});

  const chartData = Object.entries(totalByCategory).map(([cat, val]) => ({ name: cat, total: val }));

  const filteredItems = (category) =>
    (groceryList[category] || []).filter((item) =>
      item.item.toLowerCase().includes(filter.toLowerCase())
    );

  const themeStyles = darkMode
    ? { background: "#111", color: "#fff" }
    : { background: "#fff", color: "#111" };

  return (
    <div style={{ ...themeStyles, minHeight: "100vh", padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🛒 Lista de Supermercado</h1>

      <label>
        Modo {darkMode ? "Oscuro" : "Claro"}
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode((prev) => !prev)}
          style={{ marginLeft: 10 }}
        />
      </label>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: "100%", margin: "10px 0", padding: 8 }}
      />

      <input
        type="text"
        placeholder="Tu nombre"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        style={{ width: "100%", marginBottom: 20, padding: 8 }}
      />

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {Object.keys(groceryList).map((category) => (
          <div key={category} style={{ flex: 1, minWidth: 280 }}>
            <h2>
              {category === "Desayuno_gustos"
                ? "Desayuno & Gustos"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {filteredItems(category).map((item, i) => {
                const selected = selectedItems.some((x) => x.id === `${category}-${item.item}`);
                return (
                  <div
                    key={i}
                    onClick={() => toggleItem(category, item)}
                    style={{
                      border: selected ? "2px solid green" : "1px solid #ccc",
                      padding: 10,
                      marginBottom: 8,
                      borderRadius: 8,
                      cursor: "pointer",
                      background: darkMode ? "#222" : "#eee"
                    }}
                  >
                    <strong>{item.item}</strong>: ${item.price.toLocaleString()}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 20 }}>Total por categoría:</h3>
      <ul>
        {Object.entries(totalByCategory).map(([cat, val]) => (
          <li key={cat}><strong>{cat}</strong>: ${val.toLocaleString()}</li>
        ))}
      </ul>

      <button
        onClick={handleFinalize}
        style={{ marginTop: 10, padding: 12, background: "#4CAF50", color: "white", border: "none", borderRadius: 8 }}
      >
        Lista de Compras Finalizada
      </button>

      <div style={{ marginTop: 40 }}>
        <h2>Resumen visual</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Historial de compras</h2>
        <ul>
          {history.map((record, i) => (
            <li key={i}>
              <strong>{new Date(record.date).toLocaleString()}</strong>: {record.items.length} productos
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

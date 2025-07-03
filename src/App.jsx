import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const groceryList = {
  necesarias: [
    { item: "Arroz preparado", price: 2420 },
    { item: "FETUCCINI", price: 2120 },
    { item: "Ranas pasta", price: 5780 },
    { item: "BISTEC PAVO", price: 8790 },
    { item: "HIERBA JENJIBRE", price: 2478 },
    { item: "MANZANILLA", price: 2178 },
    { item: "LIMON", price: 1100 },
    { item: "ARROZ", price: 2790 },
    { item: "MENTA", price: 1089 },
    { item: "BURRO INTEGRAL", price: 2790 },
    { item: "ATUN", price: 9300 },
    { item: "GELATINA", price: 1328 },
    { item: "PECHGA POLLO", price: 5390 },
    { item: "PECHIGA AHUMADA", price: 4980 },
    { item: "CREMA CHAMPINGON", price: 1350 },
    { item: "tomate cherrry", price: 1990 },
    { item: "DIENTE DRAGON", price: 790 },
    { item: "SAL", price: 540 },
    { item: "CIBOULLETE", price: 750 },
    { item: "LECHUGA", price: 1300 },
    { item: "LENTEJA", price: 3990 },
    { item: "PLATANO", price: 2042 },
    { item: "MERMELADA2", price: 1100 },
    { item: "MERMELADA", price: 1100 },
    { item: "CHAMPINGON", price: 1690 },
    { item: "ZANAHORIA", price: 1000 },
    { item: "Papas fritas", price: 3190 },
    { item: "pavo", price: 10380 },
    { item: "carne roja", price: 8000 },
    { item: "PALTAS", price: 2000 },
    { item: "MANZANA", price: 2500 },
    { item: "PERAS", price: 1000 },
    { item: "FRUTILLAS", price: 3500 },
    { item: "GUINDAS", price: 3000 },
    { item: "Agua", price: 2010 },
    { item: "FIDEOS ESPIRALES DE COLORES", price: 3000 },
    { item: "uva", price: 2500 },
    { item: "Cubitos salmon", price: 10000 },
    { item: "Kiwi", price: 2000 },
    { item: "ACEITUNA", price: 3000 },
    { item: "PEPINO", price: 600 },
    { item: "jenjibre", price: 1000 },
    { item: "SALMON", price: 12000 },
    { item: "mandarina", price: 2500 },
    { item: "Aceite", price: 7000 },
    { item: "PERAS", price: 1800 },
    { item: "té", price: 3000 },
    { item: "ciboulletee", price: 700 },
    { item: "Queso azul", price: 3200 },
    { item: "Queso Brie", price: 3700 },
    { item: "Schweppes", price: 2100 },
    { item: "Pizza", price: 7100 },
    { item: "BAGUETTE", price: 1500 },
    { item: "Alambra", price: 7000 }
  ],
  Desayuno_gustos: [
    { item: "cereal", price: 3990 },
    { item: "GALLETAS CLUB SOCIAL", price: 1789 },
    { item: "AGUA TONICA", price: 1300 },
    { item: "GALLETAS VIVO", price: 2879 },
    { item: "GUINESS", price: 10990 },
    { item: "ÑOQUI", price: 4990 },
    { item: "PAN molde", price: 2949 },
    { item: "PIZA", price: 5590 },
    { item: "papas rústicas", price: 2800 },
    { item: "YOGUR", price: 2400 },
    { item: "PASTA QUESO CIBOULLETEE", price: 2950 },
    { item: "NATUR", price: 2190 },
    { item: "ARANDANO", price: 3590 },
    { item: "YOGURT COLUN", price: 1799 },
    { item: "MATE", price: 3390 },
    { item: "ALBACA", price: 990 },
    { item: "HUEVOS 24", price: 3490 },
    { item: "HIERBA BUENA", price: 990 },
    { item: "FRUTOS SECOS", price: 6990 },
    { item: "QUESILLO", price: 2639 },
    { item: "YOG GRIEGO 4", price: 1760 },
    { item: "Vino", price: 10000 },
    { item: "panpita", price: 1650 },
    { item: "empanada hojaldre", price: 3990 },
    
    { item: "infusion jenjibre", price: 3340 },
    { item: "café", price: 9350 },
    { item: "rucula", price: 1050 },
    { item: "espumante", price: 7400 }
  ]
};


function downloadCSV(data, user = "Usuario") {
  const date = new Date().toLocaleDateString();
  const header = "Categoria,Producto,Precio,Usuario,Fecha\n";
  const rows = data.map(({ category, item, price }) =>
    `${category},${item},${price},${user},${date}`
  ).join("\n");
  const csvContent = "data:text/csv;charset=utf-8," + header + rows;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `lista_compras_${date.replace(/\//g, "-")}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function App() {
  const [filter, setFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [user, setUser] = useState("Usuario");

  const toggleItem = (category, item) => {
    const id = `${category}-${item.item}`;
    setSelectedItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.filter((i) => i.id !== id)
        : [...prev, { id, category, item: item.item, price: item.price }]
    );
  };

  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);

  const filteredItems = (category) =>
    groceryList[category].filter((item) =>
      item.item.toLowerCase().includes(filter.toLowerCase())
    );

  const chartData = Object.values(selectedItems.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || { name: item.category, total: 0 };
    acc[item.category].total += item.price;
    return acc;
  }, {}));

return (
  <div style={{ padding: 20, fontFamily: "sans-serif", background: "#111", color: "#fff", minHeight: "100vh" }}>
    <h1 style={{ textAlign: "center" }}>🛒 Lista de Supermercado</h1>

    <input
      type="text"
      placeholder="Buscar producto..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      style={{
        padding: 10,
        width: "100%",
        marginBottom: 10,
        borderRadius: 8,
        border: "none"
      }}
    />

    <input
      type="text"
      placeholder="Tu nombre"
      value={user}
      onChange={(e) => setUser(e.target.value)}
      style={{
        padding: 10,
        width: "100%",
        marginBottom: 20,
        borderRadius: 8,
        border: "none"
      }}
    />

    <div style={{ display: "flex", flexDirection: "row", gap: 20, overflowX: "auto" }}>
      {["necesarias", "gustos"].map((category) => (
        <div key={category} style={{ flex: 1, minWidth: "50%" }}>
          <h2 style={{ textAlign: "center" }}>{category.toUpperCase()}</h2>
          <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: 10 }}>
            {filteredItems(category).map((item, i) => {
              const selected = selectedItems.some((x) => x.id === `${category}-${item.item}`);
              return (
                <div
                  key={i}
                  onClick={() => toggleItem(category, item)}
                  style={{
                    cursor: "pointer",
                    border: selected ? "2px solid green" : "1px solid #555",
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 8,
                    background: "#222"
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

    <div style={{ marginTop: 20, textAlign: "center" }}>
      <h3>Total: ${total.toLocaleString()}</h3>
      <button
        onClick={() => downloadCSV(selectedItems, user)}
        style={{
          marginTop: 10,
          padding: "12px 24px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Lista de Compras Finalizada (CSV)
      </button>
    </div>
  </div>
);

}



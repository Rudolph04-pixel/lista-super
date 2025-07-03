// App mejorada con carrito inteligente, localStorage, historial, modo oscuro y dashboard

// App mejorada con carrito inteligente, localStorage, historial, modo oscuro y dashboard

// App completa con carrito inteligente, CSV, localStorage, gráficos y modo oscuro/claro

// App completa con carrito inteligente, CSV, localStorage, gráficos y modo oscuro/claro
// App.jsx – Lista supermercado con carrito, historial, exportación CSV y diseño Fintual

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Reemplaza esto con tu lista completa:
const groceryList = {
  necesarias: [
    { item: "Arroz preparado", price: 2420 },
    { item: "Pastas (cualquiera)", price: 2120 },
    { item: "Ranas pasta", price: 5780 },
    { item: "Bistec pavo", price: 8790 },
    { item: "Hierba jenjibre", price: 2478 },
    { item: "Manzanilla", price: 2178 },
    { item: "Limón 1 kg", price: 1100 },
    { item: "Arroz 1 Kg", price: 2790 },
    { item: "Menta", price: 1089 },
    { item: "Fajita integral", price: 2790 },
    { item: "Atun (4x)", price: 9300 },
    { item: "Gelatina", price: 1328 },
    { item: "Pechuga Pollo", price: 5390 },
    { item: "Pechuga ahumada", price: 4980 },
    { item: "Crema Champiñon", price: 1350 },
    { item: "Tomate Cherry", price: 2500 },
    { item: "Diente Dragon", price: 790 },
    { item: "Sal (1 Kg)", price: 540 },
    { item: "Ciboullete", price: 750 },
    { item: "Lechuga", price: 1300 },
    { item: "Lentejas (1 Kg)", price: 3990 },
    { item: "Platano", price: 2042 },
    { item: "Mermelada", price: 1100 },
    { item: "Champiñon", price: 1690 },
    { item: "Zanahoria", price: 1000 },
    { item: "Papas fritas", price: 3190 },
    { item: "Pavo carne", price: 10380 },
    { item: "Carne roja molida", price: 8000 },
    { item: "Paltas", price: 2000 },
    { item: "Manzana", price: 2500 },
    { item: "Peras", price: 1000 },
    { item: "Frutillas", price: 3500 },
    { item: "Guindas", price: 3000 },
    { item: "Agua", price: 2010 },
    { item: "Fideos espirales", price: 2400 },
    { item: "Uva", price: 2500 },
    { item: "Cubitos salmon", price: 10000 },
    { item: "Salmon", price: 12000 },
    { item: "Kiwi", price: 2000 },
    { item: "Aceituna (1/4)", price: 3000 },
    { item: "Pepino", price: 600 },
    { item: "Jenjibre", price: 650 },
    { item: "Mandarina", price: 2500 },
    { item: "Aceite", price: 7000 },
    { item: "Peras", price: 1800 },
    { item: "Té", price: 3000 },
    { item: "Hamburguesas vacuno light", price: 11500 },
    { item: "Hielo", price: 900 },
    { item: "Piña", price: 3500 },
    { item: "Miniberries", price: 3600 },
    { item: "Salteado thai", price: 2600 },
    { item: "Zofrito", price: 900 },
    { item: "Aliños", price: 3000 },
    { item: "Endulzante polvo", price: 5500 },
    { item: "Extras", price: 20000 }
  ],
  Desayuno_gustos: [
    { item: "Cereal", price: 3990 },
    { item: "Galletas Club Social", price: 1789 },
    { item: "Agua tónica", price: 1300 },
    { item: "Galletas vivo", price: 2879 },
    { item: "Guiness", price: 10990 },
    { item: "Ñoqui", price: 4990 },
    { item: "Pan Molde", price: 2949 },
    { item: "Pizza", price: 7100 },
    { item: "Papas rústicas", price: 2800 },
    { item: "YOGUR", price: 2400 },
    { item: "Pasta queso ciboullet", price: 4000 },
    { item: "Natur", price: 2190 },
    { item: "Arándano", price: 3590 },
    { item: "Mate", price: 3600 },
    { item: "Albaca", price: 990 },
    { item: "Huevos (12)", price: 4000 },
    { item: "Hierba buena", price: 990 },
    { item: "Frutos secos", price: 8000 },
    { item: "Quesillo", price: 2639 },
    { item: "Yogurt griego (4)", price: 1760 },
    { item: "Vino (1)", price: 10000 },
    { item: "Panpita", price: 1650 },
    { item: "Empanada hojaldre", price: 3990 },
    { item: "Café", price: 9350 },
    { item: "Rúcula", price: 1050 },
    { item: "Espumante", price: 7400 },
    { item: "Queso azul", price: 3200 },
    { item: "Queso Brie", price: 3700 },
    { item: "Schweppes", price: 2100 },
    { item: "BAGUETTE", price: 1500 },
    { item: "Alambra", price: 7000 },
    { item: "Chocolate", price: 8000 },
    { item: "Helado", price: 6000 }
  ]
};

const App = () => {
  const [selectedItems, setSelectedItems] = useState(() => JSON.parse(localStorage.getItem("selectedItems")) || []);
  const [username, setUsername] = useState("Usuario");
  const [showHistory, setShowHistory] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState(() => JSON.parse(localStorage.getItem("purchaseHistory") || "[]"));

  const handleSelect = (item, category) => {
    const exists = selectedItems.find(sel => sel.item === item.item && sel.category === category);
    if (exists) {
      setSelectedItems(selectedItems.filter(sel => !(sel.item === item.item && sel.category === category)));
    } else {
      setSelectedItems([...selectedItems, { ...item, category, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (index, delta) => {
    const updated = [...selectedItems];
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);
    setSelectedItems(updated);
  };

  const handleRemove = (index) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
  };

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const totalByCategory = Object.keys(groceryList).map(cat => {
    const filtered = selectedItems.filter(sel => sel.category === cat);
    const total = filtered.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    return { categoria: cat, total };
  });

  const totalGeneral = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinish = () => {
    const date = new Date().toLocaleDateString();
    const headers = ["Usuario", "Fecha", "Categoría", "Producto", "Precio", "Cantidad"];
    const csvRows = [
      headers.join(","),
      ...selectedItems.map(({ item, price, category, quantity }) =>
        `${username},${date},${category},${item},${price},${quantity}`
      ),
      ",,,,,",
      `TOTAL GENERAL,,,,$,${totalGeneral}`
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `compras_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const updatedHistory = [...purchaseHistory, { date, user: username, items: selectedItems, total: totalGeneral }];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const colors = {
    bg: prefersDark ? "#12161C" : "#F4F6F8",
    card: prefersDark ? "#1F252D" : "#FFFFFF",
    text: prefersDark ? "#FFFFFF" : "#1A1A1A",
    border: prefersDark ? "#2C3440" : "#DDE3E9",
    accent: "#5B72F2"
  };

  return (
    <div style={{ padding: 20, fontFamily: "'Helvetica Neue', sans-serif", background: colors.bg, color: colors.text }}>
      <h1 style={{ color: colors.accent }}>🛒 Lista de Supermercado</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre del usuario"
        style={{
          padding: 10, borderRadius: 8, border: `1px solid ${colors.border}`,
          width: "100%", marginBottom: 20, background: colors.card, color: colors.text
        }}
      />

      <button
        onClick={() => setShowHistory(!showHistory)}
        style={{
          marginBottom: 20, padding: "8px 16px", background: "transparent",
          border: `1px solid ${colors.accent}`, color: colors.accent,
          borderRadius: 6, cursor: "pointer"
        }}
      >
        {showHistory ? "Ocultar Historial" : "📜 Ver Compras Anteriores"}
      </button>

      {showHistory && (
        <div style={{ marginBottom: 20 }}>
          {purchaseHistory.length === 0 ? <p>No hay historial de compras.</p> : (
            purchaseHistory.map((record, i) => (
              <div key={i} style={{ marginBottom: 10, padding: 10, background: colors.card, borderRadius: 6 }}>
                <strong>{record.date} – {record.user}</strong>
                <ul style={{ paddingLeft: 20 }}>
                  {record.items.map((item, j) => (
                    <li key={j}>{item.item} ({item.category}) – ${item.price} x {item.quantity}</li>
                  ))}
                </ul>
                <p><strong>Total: ${record.total.toLocaleString()}</strong></p>
              </div>
            ))
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: 20, overflowX: "auto" }}>
        {Object.keys(groceryList).map(cat => (
          <div key={cat} style={{
            minWidth: 260, maxHeight: 400, overflowY: "auto",
            borderRadius: 12, background: colors.card, padding: 16,
            border: `1px solid ${colors.border}`
          }}>
            <h2>{cat.toUpperCase()}</h2>
            {groceryList[cat].map((item, i) => {
              const isSelected = selectedItems.find(sel => sel.item === item.item && sel.category === cat);
              return (
                <button key={i} onClick={() => handleSelect(item, cat)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  margin: "6px 0", background: "none", border: "none",
                  color: isSelected ? colors.accent : colors.text, fontWeight: isSelected ? "bold" : "normal"
                }}>
                  {isSelected ? "✅" : "⬜"} {item.item} - ${item.price.toLocaleString()}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 40 }}>🛍️ Carrito</h3>
      <div style={{ background: colors.card, padding: 16, borderRadius: 8, border: `1px solid ${colors.border}` }}>
        {selectedItems.length === 0 ? <p>No hay productos seleccionados.</p> : (
          selectedItems.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>{item.item} – ${item.price} x {item.quantity}</span>
              <span>
                <button onClick={() => handleQuantityChange(i, -1)}>➖</button>
                <button onClick={() => handleQuantityChange(i, 1)}>➕</button>
                <button onClick={() => handleRemove(i)} style={{ color: "red" }}>❌</button>
              </span>
            </div>
          ))
        )}
        <hr />
        <p><strong>Total: ${totalGeneral.toLocaleString()}</strong></p>
      </div>

      <button onClick={handleFinish} style={{
        marginTop: 20, padding: "12px 20px", background: colors.accent,
        color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold"
      }}>
        Lista de Compras Finalizada
      </button>

      <h3 style={{ marginTop: 40 }}>📊 Totales por Categoría:</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={totalByCategory}>
          <XAxis dataKey="categoria" stroke={colors.text} />
          <YAxis stroke={colors.text} />
          <Tooltip />
          <Bar dataKey="total" fill={colors.accent} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;

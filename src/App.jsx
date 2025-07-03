// App mejorada con carrito inteligente, localStorage, historial, modo oscuro y dashboard

// App mejorada con carrito inteligente, localStorage, historial, modo oscuro y dashboard

// App completa con carrito inteligente, CSV, localStorage, gráficos y modo oscuro/claro

// App completa con carrito inteligente, CSV, localStorage, gráficos y modo oscuro/claro
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const groceryList = {
  necesarias: [{ item: "Arroz preparado", price: 2420 },
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
  Desayuno_gustos: [{ item: "Cereal", price: 3990 },
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

  const handleSelect = (item, category) => {
    const newSelection = [...selectedItems, { ...item, category }];
    setSelectedItems(newSelection);
  };

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const totalByCategory = Object.keys(groceryList).map(cat => ({
    categoria: cat,
    total: groceryList[cat]
      .filter(item => selectedItems.some(sel => sel.item === item.item))
      .reduce((acc, curr) => acc + curr.price, 0)
  }));

  const totalGeneral = totalByCategory.reduce((sum, cat) => sum + cat.total, 0);

  const handleFinish = () => {
    const headers = ["Usuario", "Fecha", "Categoría", "Producto", "Precio"];
    const date = new Date().toLocaleDateString();
    const csvRows = [
      headers.join(","),
      ...selectedItems.map(({ item, price, category }) => `${username},${date},${category},${item},${price}`),
      `,,,,`,
      `TOTAL GENERAL,,,$,${totalGeneral}`
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `compras_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
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
          padding: 10,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          width: "100%",
          marginBottom: 20,
          background: colors.card,
          color: colors.text
        }}
      />

      <div style={{ display: "flex", gap: 20, overflowX: "auto" }}>
        {Object.keys(groceryList).map(cat => (
          <div
            key={cat}
            style={{
              minWidth: 260,
              maxHeight: 420,
              overflowY: "auto",
              borderRadius: 12,
              background: colors.card,
              padding: 16,
              border: `1px solid ${colors.border}`
            }}
          >
            <h2 style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: 8 }}>{cat.toUpperCase()}</h2>
            {groceryList[cat].map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelect(item, cat)}
                style={{
                  display: "block",
                  margin: "5px 0",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "6px 0",
                  color: colors.text,
                  cursor: "pointer"
                }}
              >
                ✅ {item.item}: ${item.price.toLocaleString()}
              </button>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={handleFinish}
        style={{
          marginTop: 30,
          padding: "12px 20px",
          background: colors.accent,
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
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

      <h2 style={{ marginTop: 20 }}>💵 Total General: ${totalGeneral.toLocaleString()}</h2>
    </div>
  );
};

export default App;

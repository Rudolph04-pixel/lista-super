import React, { useState, useEffect } from "react";

const groceryList = {
  Necesarias: [
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
    { item: "Cebollín", price: 1500 },
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

export default function App() {
  const [selectedItems, setSelectedItems] = useState(() => JSON.parse(localStorage.getItem("selectedItems")) || []);
  const [username, setUsername] = useState("Usuario");
  const [purchaseHistory, setPurchaseHistory] = useState(() => JSON.parse(localStorage.getItem("purchaseHistory") || "[]"));
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleSelect = (item, category) => {
    const exists = selectedItems.find(sel => sel.item === item.item && sel.category === category);
    if (exists) {
      setSelectedItems(prev => prev.filter(sel => !(sel.item === item.item && sel.category === category)));
    } else {
      setSelectedItems(prev => [...prev, { ...item, category, quantity: 1 }]);
    }
  };

  const totalGeneral = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinish = () => {
    const date = new Date().toLocaleDateString();
    const csvRows = [
      "Usuario,Fecha,Categoría,Producto,Precio,Cantidad",
      ...selectedItems.map(({ item, price, category, quantity }) => `${username},${date},${category},${item},${price},${quantity}`),
      `,,,,,`,
      `TOTAL GENERAL,,,,$,${totalGeneral}`
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `compras_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const newRecord = { date, user: username, items: selectedItems, total: totalGeneral };
    const history = [...purchaseHistory, newRecord];
    localStorage.setItem("purchaseHistory", JSON.stringify(history));
    setPurchaseHistory(history);
  };

  const exportHistoryToCSV = () => {
    if (purchaseHistory.length === 0) return;
    const headers = ["Usuario", "Fecha", "Categoría", "Producto", "Precio", "Cantidad"];
    const rows = [headers.join(",")];

    purchaseHistory.forEach(record => {
      record.items.forEach(({ item, price, category, quantity }) => {
        rows.push(`${record.user},${record.date},${category},${item},${price},${quantity}`);
      });
    });

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `historial_compras.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const colors = {
    bg: prefersDark ? "#12161C" : "#F4F6F8",
    text: prefersDark ? "#FFFFFF" : "#1A1A1A"
  };

  return (
    <div style={{ padding: 20, background: colors.bg, color: colors.text, fontFamily: "'Helvetica Neue', sans-serif" }}>
      <h1>Lista de supermercado</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Nombre de usuario" style={{ marginBottom: 10 }} />
      {Object.entries(groceryList).map(([category, items]) => (
        <div key={category}>
          <h2>{category}</h2>
          <div style={{ maxHeight: 200, overflowY: "auto", border: "1px solid #ccc", padding: 10, marginBottom: 20 }}>
            {items.map((item, idx) => (
              <div key={idx}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedItems.some(sel => sel.item === item.item && sel.category === category)}
                    onChange={() => handleSelect(item, category)}
                  />
                  {item.item} - ${item.price.toLocaleString()}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <h2>Total: ${totalGeneral.toLocaleString()}</h2>
      <button onClick={handleFinish}>Finalizar compra y exportar CSV</button>
      <button onClick={() => setShowHistory(!showHistory)} style={{ marginLeft: 10 }}>Ver compras anteriores</button>
      {showHistory && (
        <div style={{ marginTop: 20 }}>
          <h3>Historial de compras</h3>
          {purchaseHistory.map((entry, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <strong>{entry.date} - {entry.user}</strong>
              <ul>
                {entry.items.map((it, i) => (
                  <li key={i}>{it.item} ({it.category}) - {it.quantity} x ${it.price}</li>
                ))}
              </ul>
              <em>Total: ${entry.total}</em>
            </div>
          ))}
          <button onClick={exportHistoryToCSV} style={{ marginTop: 10 }}>Exportar historial CSV</button>
        </div>
      )}
    </div>
  );
}

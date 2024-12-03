import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/paginaboleto.module.css";
import Image from "next/image";

export default function BoletosPage() {
  const [boleto, setBoleto] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [valor, setValor] = useState("");
  const [boletos, setBoletos] = useState([]);
  const router = useRouter();

  const adicionarBoleto = () => {
    if (!boleto || !dataVencimento || !valor) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novoBoleto = {
      id: boletos.length + 1,
      boleto,
      dataVencimento,
      valor,
    };

    setBoletos([...boletos, novoBoleto]);
    setBoleto("");
    setDataVencimento("");
    setValor("");
  };

  const voltarParaDashboard = () => {
    router.push("/dashboard");
  };

 
  useEffect(() => {
    document.title = "Gerenciamento de Boletos";
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoTopLeft}>
        <Image
          src="/images/MEUCRALOGO.jpg"
          alt="MEUCRALOGO"
          width={50}
          height={50}
        />
      </div>

      <header>
        <h1>Gerenciamento de Boletos</h1>
      </header>
      <main className={styles.app}>
        <div>
          <input
            type="text"
            placeholder="Nome do Boleto"
            value={boleto}
            onChange={(e) => setBoleto(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.dataLabel}>Selecione a data de vencimento</div>

        <div className={styles.data}>
          <input
            type="date"
            value={dataVencimento}
            onChange={(e) => setDataVencimento(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.valor}>
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className={styles.input}
          />
        </div>

        <button onClick={adicionarBoleto} className={styles.btnAzul}>
          Adicionar Boleto
        </button>

        <button onClick={voltarParaDashboard} className={styles.btnLaranja}>
          Voltar
        </button>

        <div className={styles.resultado}>
          <h2>Boletos</h2>
          <ul>
            {boletos.map((boleto) => (
              <li key={boleto.id}>
                {boleto.boleto} - {boleto.dataVencimento} - R$ {boleto.valor}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
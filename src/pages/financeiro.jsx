import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/financeiro.module.css";
import Image from "next/image";

export default function TelaFinanceira() {
  const [boletoOutput, setBoletoOutput] = useState("");
  const [craOutput, setCraOutput] = useState("");
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [craCode, setCraCode] = useState("");
  const [craAmount, setCraAmount] = useState("");

  const router = useRouter();

  const handleGenerateBoleto = (e) => {
    e.preventDefault();
    const boletoCode = `BOLETO-${Math.random().toString(36).substring(7).toUpperCase()}-${Date.now()}`;
    setBoletoOutput(`
      <p>Boleto gerado com sucesso!</p>
      <p><strong>Cliente:</strong> ${clientName}</p>
      <p><strong>Valor:</strong> R$ ${parseFloat(amount).toFixed(2)}</p>
      <p><strong>Código do Boleto:</strong> ${boletoCode}</p>
    `);
  };

  const handlePayCra = (e) => {
    e.preventDefault();
    setCraOutput(`
      <p>Pagamento realizado com sucesso!</p>
      <p><strong>Código:</strong> ${craCode}</p>
      <p><strong>Valor:</strong> R$ ${parseFloat(craAmount).toFixed(2)}</p>
    `);
  };

  const voltarParaDashboard = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    document.title = "Financeiro";
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/images/MEUCRALOGO.jpg" alt="Logo meuCRA" width={120} height={120} />
        </div>
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>Gestão Financeira</h1>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Gerar Boleto</h2>
          <form onSubmit={handleGenerateBoleto}>
            <label htmlFor="name" className={styles.label}>Nome do Cliente:</label>
            <input
              type="text"
              id="name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              className={styles.input}
            />
            <label htmlFor="amount" className={styles.label}>Valor (R$):</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Gerar Boleto</button>
          </form>
          <div
            id="boleto-output"
            className={styles.output}
            dangerouslySetInnerHTML={{ __html: boletoOutput }}
          />
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Pagamento de CRA</h2>
          <form onSubmit={handlePayCra}>
            <label htmlFor="cra-code" className={styles.label}>Código CRA:</label>
            <input
              type="text"
              id="cra-code"
              value={craCode}
              onChange={(e) => setCraCode(e.target.value)}
              required
              className={styles.input}
            />
            <label htmlFor="cra-amount" className={styles.label}>Valor do Pagamento (R$):</label>
            <input
              type="number"
              id="cra-amount"
              value={craAmount}
              onChange={(e) => setCraAmount(e.target.value)}
              required
              step="0.01"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Realizar Pagamento</button>
          </form>
          <div
            id="cra-output"
            className={styles.output}
            dangerouslySetInnerHTML={{ __html: craOutput }}
          />
        </div>

        <button onClick={voltarParaDashboard} className={styles.btnVoltar}>
          Voltar
        </button>
      </div>
    </div>
  );
}

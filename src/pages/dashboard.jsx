import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/dashboard.module.css";
import Image from "next/image";

export default function Dashboard() {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const [matricula, setMatricula] = useState(""); 

  useEffect(() => {
    
    document.title = "Tela Inicial";

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    
    if (usuario) {
      setMatricula(usuario.matricula); 
    }
  }, []);

  const toggleDropdown = () => {
    setShowOptions(!showOptions);
  };

  const handleAgendamentoFinanceiroClick = () => {
    router.push("/agendamentofinanceiro");
  };

  const handleAgendamentoAcademicoClick = () => {
    router.push("/agendamentoacademico");
  };

  const handleAgendamentoClick = () => {
    router.push("/agendamento");
  };

  const handleAcademicoClick = () => {
    router.push("/media");
  };

  const handleBoletosClick = () => {
    router.push("/paginaboleto");
  };

  const handleFinanceiroClick = () => {
    router.push("/financeiro");
  };

  const handleMeusAgendamentosClick = () => {
    router.push("/meusagendamentos");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/images/MEUCRALOGO.jpg" alt="Logo" width={120} height={120} />
        </div>

        <div className={styles.navBar}>
          <button className={styles.navButton} onClick={handleBoletosClick}>
            Boletos
          </button>
          <button className={styles.navButton} onClick={handleAgendamentoClick}>
            Agendamento
          </button>
          <button className={styles.navButton} onClick={handleFinanceiroClick}>
            Financeiro
          </button>
          <button className={styles.navButton} onClick={handleAcademicoClick}>
            Acadêmico
          </button>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.profileImage}>
            <Image src="/images/user.png" alt="User" width={40} height={40} />
          </div>
          <div className={styles.profileText}>
            <div className={styles.profileLabel}>Matrícula:</div>
            <div className={styles.profileMatricula}>{matricula}</div>
          </div>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="O que está procurando?"
            className={styles.searchInput}
          />
        </div>
      </header>

      <div className={styles.dropdown}>
        <div className={styles.dropdownHeader} onClick={toggleDropdown}>
          Escolha uma opção:
        </div>
        {showOptions && (
          <div
            className={`${styles.dropdownOptions} ${
              showOptions ? styles.show : ""
            }`}
          >
            <div
              className={styles.dropdownItem}
              onClick={handleAgendamentoFinanceiroClick}
            >
              Agendamento Financeiro
            </div>
            <div
              className={styles.dropdownItem}
              onClick={handleAgendamentoAcademicoClick}
            >
              Agendamento Acadêmico
            </div>
            <div
              className={styles.dropdownItem}
              onClick={handleMeusAgendamentosClick}
            >
              Meus Agendamentos
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
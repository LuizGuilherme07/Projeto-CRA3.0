import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/meusagendamentos.module.css';

export default function MeusAgendamentosPage() {
    const [agendamentos, setAgendamentos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        setAgendamentos(agendamentosSalvos);
    }, []);

    useEffect(() => {
        document.title = "Agendamentos";
    }, []);

    const voltarParaDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <div className={styles.container}>
            <div className={styles.topLeft}>
                <img src="/images/MEUCRALOGO.jpg" alt="MEUCRALOGO" className={styles.logoTopLeft} />
            </div>

            <div id="app" className={styles.app}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Meus Agendamentos</h1>
                </header>
                <main>
                    {agendamentos.length === 0 ? (
                        <p className={styles.noAgendamentos}>Nenhum agendamento encontrado.</p>
                    ) : (
                        <ul className={styles.listaAgendamentos}>
                            {agendamentos.map((item, index) => (
                                <li key={index} className={styles.itemAgendamento}>
                                    <p>
                                        <strong>Tipo:</strong> {item.tipo}
                                    </p>
                                    <p>
                                        <strong>Data:</strong> {item.data}
                                    </p>
                                    <p>
                                        <strong>Hora:</strong> {item.hora}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={voltarParaDashboard} className={styles.btnVoltar}>
                        Voltar
                    </button>
                </main>
            </div>
        </div>
    );
}